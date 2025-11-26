// Note: dotenv is loaded in main.ts before this file is imported
// This ensures .env variables are available and have priority

export const config = {
  port: process.env['PORT'] || 3000,
  nodeEnv: process.env['NODE_ENV'] || 'development',
  geminiApiKey: process.env['GEMINI_API_KEY'] || undefined,
  openaiApiKey: process.env['OPENAI_API_KEY'] || undefined,
  claudeApiKey: process.env['CLAUDE_API_KEY'] || undefined,
  anthropicApiKey: process.env['ANTHROPIC_API_KEY'] || undefined,
  mistralApiKey: process.env['MISTRAL_API_KEY'] || undefined,
};

const missingKeys: string[] = [];
if (!config.geminiApiKey) missingKeys.push('GEMINI_API_KEY');
if (!config.openaiApiKey) missingKeys.push('OPENAI_API_KEY');
if (!config.claudeApiKey) missingKeys.push('CLAUDE_API_KEY');
if (!config.anthropicApiKey) missingKeys.push('ANTHROPIC_API_KEY');
if (!config.mistralApiKey) missingKeys.push('MISTRAL_API_KEY');

if (missingKeys.length > 0) {
  console.warn(`Faltan las siguientes variables de entorno: ${missingKeys.join(', ')}`);
  console.warn(
    'Algunos proveedores de IA no estarán disponibles hasta que se configuren las keys.',
  );
}
