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
  
  // Zincir: Önce Gemini Flash, sonra MiMo, en son Gemini Experimental
  const models = [
    RESEARCH_MODELS.PRIMARY.id,
    ETSY_MODELS.MIMO.id,
    "google/gemini-2.0-flash-exp:free"
  ];

  for (const modelId of models) {
    for (let i = 0; i <= maxRetries; i++) {
      try {
        console.log(`[AI] Trying ${modelId} (Attempt ${i+1})...`);
        return await fn(modelId);
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI] ${modelId} failed: ${err.message}`);
        // If it's a 401 (Auth error), don't retry, just move to next model or throw
        if (err.status === 401) break; 
        if (i < maxRetries) await new Promise(r => setTimeout(r, 800));
      }
    }
  }

  throw lastError || new Error("All AI models are currently unavailable.");
}

export function extractJSON(content: string): string {
  if (!content) return '{}';
  // Remove markdown, think tags, and anything before/after the JSON object
  let cleaned = content
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim();
    
  const startIndex = cleaned.indexOf('{');
  const lastIndex = cleaned.lastIndexOf('}');
  
  if (startIndex !== -1 && lastIndex !== -1) {
    return cleaned.substring(startIndex, lastIndex + 1);
  }
  return cleaned;
}

export const FREE_MODEL_CHAINS = {
  analysis: [RESEARCH_MODELS.PRIMARY.id],
  creative: [ETSY_MODELS.MIMO.id],
  extraction: [RESEARCH_MODELS.PRIMARY.id],
};
