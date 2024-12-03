import { OpenAI } from 'openai';

let openaiInstance: OpenAI | null = null;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export function initializeOpenAI(apiKey: string) {
  try {
    if (!apiKey) {
      console.warn('OpenAI API key not provided');
      return;
    }

    openaiInstance = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
  } catch (error) {
    console.warn('Failed to initialize OpenAI client:', error);
  }
}

export function getOpenAIClient(): OpenAI | null {
  if (!openaiInstance) {
    if (OPENAI_API_KEY) {
      initializeOpenAI(OPENAI_API_KEY);
    } else {
      console.warn('OpenAI API key not found. Please set VITE_OPENAI_API_KEY environment variable.');
    }
  }
  return openaiInstance;
}