import { OpenAI } from 'openai';

let openaiInstance: OpenAI | null = null;

export function initializeOpenAI(apiKey: string) {
  try {
    openaiInstance = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  } catch (error) {
    console.warn('Failed to initialize OpenAI client:', error);
  }
}

export function getOpenAIClient(): OpenAI | null {
  if (!openaiInstance) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      initializeOpenAI(apiKey);
    } else {
      console.warn('OpenAI API key not configured. AI features will be disabled.');
    }
  }
  return openaiInstance;
}