import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { SWOTSchema } from "./schema/swot.schema";
import { swotPrompt } from "./prompts/swot.prompt";
import { gemini, openai } from "./models";

export const generateSWOTFallback = async (repoData: any) => {
  const parser = StructuredOutputParser.fromZodSchema(SWOTSchema);

  const formatInstructions = parser.getFormatInstructions();

  const prompt = await swotPrompt.format({
    repo: JSON.stringify(repoData, null, 2),
    format_instructions: formatInstructions,
  });

  const providers = [
    { name: "OpenAI (GPT-4o)", model: openai },
    { name: "Gemini (1.5 Pro)", model: gemini },
  ];

  for (const provider of providers) {
    try {
      console.log(`Trying: ${provider.name}`);

      const result = await provider.model.invoke(prompt);
      const parsed = await parser.parse(result.content as string);

      console.log(`Success using: ${provider.name}`);

      return {
        provider: provider.name,
        swot: parsed,
      };
    } catch (err: any) {
      console.log(`Failed: ${provider.name} -> ${err.message}`);
    }
  }

  console.log("All LLM providers failed, returning empty SWOT");

  return {
    provider: null,
    swot: {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
    },
  };
};
