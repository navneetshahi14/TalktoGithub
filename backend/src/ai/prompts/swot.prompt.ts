import { PromptTemplate } from "@langchain/core/prompts";

export const swotPrompt = new PromptTemplate({
  template: `
    You are an expert technical analyst. Analyze the given Github repositroy and generate a detailed SWOT Analysis.

    ### REPOSITORY DATA
    {repo}

    ### INSTRUCTIONS:
    Provide clear, technically accurate points under each category:

    1. **Strengths (S)**
    - Mention good architecture, tests, documentation, stars, contributions, stability, tech stack
    - Mention quality patterns or robustness

    2. **Weaknesses (W)**
    - Missing documentation, lack of tests, unoptimized folder structure
    - Low consistency or inactive maintainers

    3. **Opportunities (O)**
    - Potential improvements
    - Ability to add features
    - Community adoption opportunities

    4. **Threats (T)**
    - Competition
    - Maintenance risk
    - Stale dependencies
    - Security concerns


    ### OUTPUT FORMAT (STRICT JSON)
    {format_instructions}
    `,
  inputVariables: ["repo","format_instructions"],
});
