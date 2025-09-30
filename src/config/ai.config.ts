import { registerAs } from '@nestjs/config';

export default registerAs('ai', () => ({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 2000,
  },
  langchain: {
    temperature: parseFloat(process.env.LANGCHAIN_TEMPERATURE) || 0.7,
    maxRetries: parseInt(process.env.LANGCHAIN_MAX_RETRIES) || 3,
  },
}));
