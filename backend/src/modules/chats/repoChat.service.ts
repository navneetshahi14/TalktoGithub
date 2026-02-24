import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { CodeChunkModel } from "../embedding/CodeChunk.schema";
import { ChatMessageModel } from "./chatMessage.schema";
import { ChatConversationalModel } from "./chatConversion.schema";
import { RepoSummaryModel } from "../repositories/repoSummary.schema";
import { RepoSwotModel } from "../repositories/repoSwot.schema";
import { urlToHttpOptions } from "url";

export class RepoChatService {
  private llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    streaming: true,
  });

  private embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  private cosine = (a: number[], b: number[]) => {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
    return dot / (magA * magB);
  };

  private async retrieveRelevantChunks(repoId: string, question: string) {
    const questionEmbedding = await this.embeddings.embedQuery(question);

    const chunks = await CodeChunkModel.find({ repoId }).limit(200);

    const ranked = chunks
      .map((c) => ({
        ...c.toObject(),
        score: this.cosine(questionEmbedding, c.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return ranked;
  }

  private async generateTitle(question: string): Promise<string> {
    const response = await this.llm.invoke(
      `
        Generate a short 4-6 words title for the Github repository chat question.

        Question:
        "${question}"

        Only return the title
      `,
    );
    return response.content.toString().trim().replace(/["']/g, "");
  }

  async askRepo(
    conversationId: string,
    repoId: string,
    question: string,
    onToken: (token: string) => void,
  ) {
    await ChatMessageModel.create({
      conversationId,
      role: "user",
      content: question,
    });

    const topChunks = await this.retrieveRelevantChunks(repoId, question);
    const context = topChunks.map((c) => c.content).join("\n\n");

    const prompt = PromptTemplate.fromTemplate(`
        You are an AI assistant that explains Github repositories.

        Answer the user's question using Only the context below.
        If answer not found, say "Not found in repository"

        Context:
        {context}

        Question:
        {question}
    `);

    const formatted = await prompt.format({
      context,
      question,
    });

    // const response = await this.llm.invoke(formatted)
    const stream = await this.llm.stream(formatted);

    let fullAnswer = "";

    for await (const chunks of stream) {
      const token = chunks.content?.toString() || "";
      fullAnswer += token;
      onToken(token);
    }

    await ChatMessageModel.create({
      conversationId: conversationId,
      role: "assistant",
      content: fullAnswer,
      soruces: topChunks.map((c) => c.filePath) || [],
    });

    const conversation = await ChatConversationalModel.findById(conversationId);

    if (conversation && conversation.title === "New Chat") {
      const title = await this.generateTitle(question);

      conversation.title = title;
      await conversation.save();
    }
  }

  async generateRepoSummary(repoId: string) {
    const exisiting = await RepoSummaryModel.findOne({ repoId });

    if (exisiting) return exisiting.summary;

    const chunks = await CodeChunkModel.find({ repoId }).limit(20);

    const context = chunks.map((c) => c.content).join("\n\n");

    const prompt = `
    You are an expert software architect.

    Based on the repository code context below, generate:

    1. Project overview (short paragraph)
    2. Main tech stack
    3. Core architecture pattern
    4. Key features
    5. Ideal use case

    Keep response structured and clean.

    Context:
    ${context}
    `;

    const response = await this.llm.invoke(prompt);

    const summary = response.content.toString();

    await RepoSummaryModel.create({
      repoId,
      summary,
    });

    return summary;
  }

  async generateSwot(repoId: string) {
    const existing = await RepoSwotModel.findOne({ repoId });
    if (existing) return existing;

    const chunks = await CodeChunkModel.find({ repoId }).limit(25);

    const context = chunks.map((c) => c.content).join("\n\n");

    const prompt = `
      You are a senior software architect.

      Based on the repository code context below, generate a SWOT analysis.

      Return STRICT JSON format:

      {
        "strengths":[],
        "weaknesses":[],
        "opportunities":[],
        "threats":[]
      }

      Context:
      ${context}
    `;

    const response = await this.llm.invoke(prompt);

    const jsonText = response.content.toString();

    const parsed = JSON.parse(jsonText);

    const saved = await RepoSwotModel.create({
      repoId,
      ...parsed,
    });

    return saved;
  }

  
}
