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

  // 2. ULTIMATE FAILOVER CHAIN
  const failoverChain = [
    'meta-llama/llama-3.3-70b-instruct:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'qwen/qwen3-coder:free',
    'openrouter/free'
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
  analysis: ['openrouter/free'],
  creative: ['meta-llama/llama-3.3-70b-instruct:free'],
  extraction: ['openrouter/free'],
};

/**
 * ULTRA-ROBUST JSON EXTRACTION
 * Handles thinking tags, markdown, and stray text before/after/BETWEEN JSON blocks.
 */
export function extractJSON(content: string): string {
  if (!content) return '{}';
  
  // 1. Remove thinking tags
  let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  
  // 2. Try to find the LARGEST valid JSON block using a stack-based approach
  // or at least find the first/last character boundaries correctly
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  
  // Determine if we are looking for an object or an array
  const isArray = firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace);
  const startChar = isArray ? '[' : '{';
  const endChar = isArray ? ']' : '}';
  
  const startIndex = cleaned.indexOf(startChar);
  if (startIndex === -1) return cleaned; // Fallback
  
  // Count braces to find the matching closing brace
  let count = 0;
  let endIndex = -1;
  
  for (let i = startIndex; i < cleaned.length; i++) {
    if (cleaned[i] === startChar) count++;
    else if (cleaned[i] === endChar) {
      count--;
      if (count === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (startIndex !== -1 && endIndex !== -1) {
    return cleaned.substring(startIndex, endIndex + 1);
  }
  
  // Fallback to simple lastIndexOf if stack method fails
  const lastIndex = cleaned.lastIndexOf(endChar);
  if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
    return cleaned.substring(startIndex, lastIndex + 1);
  }
  
  return cleaned;
}
