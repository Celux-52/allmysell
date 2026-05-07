/**
 * AI Retry & Fallback Utility
 * Provides resilient AI API calls with automatic retry.
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  fallbackModels?: string[];
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelayMs: 1500,
  fallbackModels: [],
};

/**
 * Wraps an async function with retry logic and exponential backoff.
 */
export async function withRetry<T>(
  fn: (model?: string) => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  // Try primary call with retries
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      console.warn(`[AI Retry] Attempt ${attempt + 1}/${opts.maxRetries + 1} failed:`, error.message);
      
      // If it's a 404 or 400, don't just fail, try the next attempt or throw
      if (attempt < opts.maxRetries) {
        const delay = opts.baseDelayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // Final fallback to the ONLY verified free model if all else fails
  try {
    console.log(`[AI Fallback] Trying final stable model: meta-llama/llama-3.2-3b-instruct:free`);
    return await fn('meta-llama/llama-3.2-3b-instruct:free');
  } catch (error: any) {
    throw lastError || error;
  }
}

/**
 * Free model fallback chains.
 * Standardized on Llama 3.2 3B as it is currently the most stable FREE model on OpenRouter.
 */
export const FREE_MODEL_CHAINS = {
  analysis: ['meta-llama/llama-3.2-3b-instruct:free'],
  creative: ['meta-llama/llama-3.2-3b-instruct:free'],
  extraction: ['meta-llama/llama-3.2-3b-instruct:free'],
};

/**
 * Cleans AI response content to extract valid JSON.
 */
export function extractJSON(content: string): string {
  let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
  cleaned = cleaned.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
  
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return cleaned.substring(firstBrace, lastBrace + 1);
  }
  
  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    return cleaned.substring(firstBracket, lastBracket + 1);
  }
  
  return cleaned;
}
