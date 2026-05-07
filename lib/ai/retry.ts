/**
 * AI Retry & Fallback Utility
 * Provides resilient AI API calls with automatic retry and model fallback.
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  fallbackModels?: string[];
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 2,
  baseDelayMs: 1000,
  fallbackModels: [],
};

/**
 * Wraps an async function with retry logic and exponential backoff.
 * If all retries fail and fallbackModels are provided, tries each fallback in order.
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
      
      if (attempt < opts.maxRetries) {
        const delay = opts.baseDelayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // Try fallback models
  for (const fallbackModel of opts.fallbackModels) {
    try {
      console.log(`[AI Fallback] Trying fallback model: ${fallbackModel}`);
      return await fn(fallbackModel);
    } catch (error: any) {
      lastError = error;
      console.warn(`[AI Fallback] ${fallbackModel} also failed:`, error.message);
    }
  }

  throw lastError || new Error("All AI attempts and fallbacks failed");
}

/**
 * Free model fallback chains for different use cases.
 * Order: primary preference → backup → last resort
 */
export const FREE_MODEL_CHAINS = {
  analysis: [
    'meta-llama/llama-3.1-8b-instant:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'google/gemma-2-9b-it:free',
  ],
  creative: [
    'meta-llama/llama-3.1-8b-instant:free',
    'google/gemma-2-9b-it:free',
  ],
  extraction: [
    'google/gemma-2-9b-it:free',
    'meta-llama/llama-3.1-8b-instant:free',
  ],
};

/**
 * Cleans AI response content to extract valid JSON.
 * Handles markdown code blocks, think tags, and stray text.
 */
export function extractJSON(content: string): string {
  // Remove think tags (DeepSeek, etc.)
  let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
  
  // Remove markdown code fences
  cleaned = cleaned.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
  
  // Extract JSON object
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return cleaned.substring(firstBrace, lastBrace + 1);
  }
  
  // Try array
  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    return cleaned.substring(firstBracket, lastBracket + 1);
  }
  
  return cleaned;
}
