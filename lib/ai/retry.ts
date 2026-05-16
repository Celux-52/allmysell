import { RESEARCH_MODELS, ETSY_MODELS } from './models';

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
}

export async function withRetry<T>(
  fn: (modelId?: string) => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  let lastError: any;
  const maxRetries = typeof options === 'number' ? options : (options?.maxRetries || 1);
  
  const models = [
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "google/gemini-2.0-pro-exp-02-05:free",
    "nousresearch/hermes-3-llama-3.1-405b:free"
  ];

  for (const modelId of models) {
    for (let i = 0; i <= maxRetries; i++) {
      try {
        console.log(`[AI] Attempting ${modelId} (Try ${i+1})...`);
        return await fn(modelId);
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI] ${modelId} failed: ${err.message}`);
        if (err.status === 401) throw new Error("API Key Invalid");
        if (i < maxRetries) await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  throw lastError || new Error("AI Providers Failed");
}

export function extractJSON(content: string): string {
  if (!content) return '{}';
  let cleaned = content
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim();
    
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  const lastBrace = cleaned.lastIndexOf('}');
  const lastBracket = cleaned.lastIndexOf(']');

  // Determine the outermost JSON structure (either Object or Array)
  let startIndex = -1;
  let lastIndex = -1;

  if (firstBrace !== -1 && firstBracket !== -1) {
    startIndex = Math.min(firstBrace, firstBracket);
  } else if (firstBrace !== -1) {
    startIndex = firstBrace;
  } else {
    startIndex = firstBracket;
  }

  if (lastBrace !== -1 && lastBracket !== -1) {
    lastIndex = Math.max(lastBrace, lastBracket);
  } else if (lastBrace !== -1) {
    lastIndex = lastBrace;
  } else {
    lastIndex = lastBracket;
  }
  
  if (startIndex !== -1 && lastIndex !== -1 && lastIndex >= startIndex) {
    return cleaned.substring(startIndex, lastIndex + 1);
  }
  return cleaned;
}

export const FREE_MODEL_CHAINS = {
  analysis: [RESEARCH_MODELS.PRIMARY.id],
  creative: ["anthropic/claude-3-haiku"],
  extraction: [RESEARCH_MODELS.PRIMARY.id],
};