import { RESEARCH_MODELS, ETSY_MODELS } from './models';

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  timeoutMs?: number;
}

export async function withRetry<T>(
  fn: (modelId?: string) => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  let lastError: any;
  const maxRetries = typeof options === 'number' ? options : (options?.maxRetries || 0);
  const perCallTimeout = typeof options === 'object' ? options.timeoutMs || 6000 : 6000;
  
  // ✅ Absolute Stability Model List (Optimized for May 2026)
  const models = [
    RESEARCH_MODELS.PRIMARY.id,
    RESEARCH_MODELS.GPT_OSS.id,
    "poolside/laguna-m.1:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "google/gemini-flash-1.5-8b:free"
  ];

  for (const modelId of models) {
    for (let i = 0; i <= maxRetries; i++) {
      let timeoutId: NodeJS.Timeout | null = null;
      try {
        console.log(`[AI] Attempting ${modelId} (Try ${i+1})...`);
        
        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error(`Timeout on ${modelId}`)), perCallTimeout);
        });

        const result = await Promise.race([
          fn(modelId),
          timeoutPromise
        ]);
        
        if (timeoutId) clearTimeout(timeoutId);
        return result;
      } catch (err: any) {
        if (timeoutId) clearTimeout(timeoutId);
        
        lastError = err;
        console.warn(`[AI] ${modelId} failed: ${err.message}`);
        
        if (err.status === 401) throw new Error("API Key Invalid");
        
        // If it's a timeout, don't bother retrying the same model, move to next model immediately
        if (err.message?.includes('Timeout')) break;
        
        if (i < maxRetries) {
          const delay = typeof options === 'object' ? options.baseDelayMs || 1000 : 1000;
          await new Promise(r => setTimeout(r, delay));
        }
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