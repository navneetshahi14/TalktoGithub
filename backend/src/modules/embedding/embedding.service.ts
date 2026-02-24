import OpenAI from "openai";
import ENV from "../../config/ENV";
const client = new OpenAI({
  apiKey: ENV.OpenAI_API_KEY,
});

export class EmbeddingService {
  async generateEmbedding(text: string): Promise<number[]> {
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  }
}
