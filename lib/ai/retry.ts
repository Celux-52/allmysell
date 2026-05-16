/**
 * Absolute Stability Retry Utility
 */
import { RESEARCH_MODELS, ETSY_MODELS } from './models';

export async function withRetry<T>(
  fn: (modelId?: string) => Promise<T>,
  maxRetries = 1
): Promise<T> {
  let lastError: any;
  
  // 1. Try with Primary (Gemini)
  try {
    return await fn(RESEARCH_MODELS.PRIMARY.id);
  } catch (err) {
    console.warn("[Retry] Primary failed, trying secondary...");
    lastError = err;
  }

  // 2. Try with Secondary (MiMo)
  try {
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
