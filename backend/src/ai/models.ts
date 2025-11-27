import { ChatOpenAI} from '@langchain/openai'
import { ChatGoogleGenerativeAI} from '@langchain/google-genai';
// import { CHatHuggingFaceInference } from '@langchain/community/'
import {ENV} from '../config/ENV'

export const openai = new ChatOpenAI({
    apiKey: ENV.OPENAI_API_KEY,
    model: "gpt-4o-mini",
    temperature: 0.3
})

export const gemini = new ChatGoogleGenerativeAI({
    apiKey: ENV.GEMINI_API_KEY,
    model:"gemini-1.5-pro",
    temperature:0.2
})
