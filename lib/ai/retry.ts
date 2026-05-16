/**
 * Absolute Stability Retry Utility (v4.1 - Compatible)
 */
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

  // 1. Try with Primary (Gemini)
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn(RESEARCH_MODELS.PRIMARY.id);
    } catch (err) {
      console.warn(`[Retry] Primary attempt ${i + 1} failed, retrying...`);
      lastError = err;
      if (i < maxRetries) await new Promise(r => setTimeout(r, 1000));
    }
  }

  // 2. Try with Secondary (MiMo)
  try {
    console.log("[Retry] Switching to Secondary...");
    return await fn(ETSY_MODELS.MIMO.id);
  } catch (err) {
    console.warn("[Retry] Secondary failed, trying ultimate fallback...");
    lastError = err;
  }

  // 3. Ultimate Fallback (Gemini Exp)
  try {
    return await fn("google/gemini-2.0-flash-exp:free");
  } catch (err) {
    throw lastError || err;
  }
}

export const FREE_MODEL_CHAINS = {
  analysis: [RESEARCH_MODELS.PRIMARY.id],
  creative: [ETSY_MODELS.MIMO.id],
  extraction: [RESEARCH_MODELS.PRIMARY.id],
};

export function extractJSON(content: string): string {
  if (!content) return '{}';
  const startIndex = content.indexOf('{');
  const lastIndex = content.lastIndexOf('}');
  if (startIndex !== -1 && lastIndex !== -1) {
    return content.substring(startIndex, lastIndex + 1);
  }
  return content;
}
