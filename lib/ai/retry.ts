/**
 * AI Retry & Fallback Utility
 * Provides resilient AI API calls with automatic retry and model rotation.
 */

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  fallbackModels?: string[];
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 4,
  baseDelayMs: 2000,
  fallbackModels: [],
};

/**
 * Wraps an async function with retry logic and model rotation.
 */
export async function withRetry<T>(
  fn: (model?: string) => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  // 1. Try with primary model (and retries)
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      const isRateLimit = error.message?.includes('429') || error.status === 429;
      const delayMultiplier = isRateLimit ? 3 : 1;
      
      console.warn(`[AI Retry] Attempt ${attempt + 1}/${opts.maxRetries + 1} failed (${isRateLimit ? 'Rate Limit' : 'Error'}):`, error.message);
      
      if (attempt < opts.maxRetries) {
        const delay = opts.baseDelayMs * Math.pow(2, attempt) * delayMultiplier;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // 2. ULTIMATE FAILOVER CHAIN (The Great Wall)
  const failoverChain = [
    'meta-llama/llama-3.2-3b-instruct:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'deepseek/deepseek-v3:free',
    'mistralai/mistral-7b-instruct:free',
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'microsoft/phi-3-mini-128k-instruct:free',
    'openrouter/auto:free' // The absolute final resort
  ];

  for (const fallbackModel of failoverChain) {
    try {
      console.log(`[AI Fallback] Attempting failover to: ${fallbackModel}`);
      return await fn(fallbackModel);
    } catch (error: any) {
      lastError = error;
      console.warn(`[AI Fallback] ${fallbackModel} also failed:`, error.message);
    }
  }

  throw lastError || new Error("All AI attempts and fallbacks failed after massive rotation");
}

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
