import { AiProviderModels } from '@smartcv/types';

export const AI_MODELS_DATA: AiProviderModels = {
  google: [
    //2.0
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',

    //2.5
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.5-pro',
  ],
  openai: [
    'gpt-4o',
    'gpt-4-turbo',
    'gpt-4.5',
    'gpt-4.1',
    'gpt-4.1-mini',
    'gpt-5',
    'gpt-5-mini',
    'gpt-5-nano',

    // open-weight de OpenAI models
    'gpt-oss-120b',
    'gpt-oss-20b',
  ],

  anthropic: [
    'claude-opus-4-1-20250805',
    'claude-opus-4-20250514',
    'claude-sonnet-4-20250514',
    'claude-3-7-sonnet-20250219',
    'claude-3-5-sonnet-20241022',
    'claude-3-5-haiku-20241022',
  ],

  groq: [
    'llama3-70b-8192',
    'llama3-8b-8192',
    'llama3-groq-70b-8192-tool-use-preview',
    'llama3-groq-8b-8192-tool-use-preview',
    'mixtral-8x7b-32768',
    'gemma-7b-it',
  ],
};
