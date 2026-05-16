/**
 * AI Retry, Fallback & Smart Rotation Utility (v2.0 - Optimized for 2 Models)
 */

import { RESEARCH_MODELS, ETSY_MODELS } from './models';

const rateLimitedModels = new Map<string, number>();
const MODEL_COOLDOWN_MS = 60_000;

function markRateLimited(modelId: string): void {
  const expiresAt = Date.now() + MODEL_COOLDOWN_MS;
  rateLimitedModels.set(modelId, expiresAt);
  console.warn(`[AI Rotation] 🚫 Model ${modelId} rate-limited, cooling down...`);
}

function isOnCooldown(modelId: string): boolean {
  const expiresAt = rateLimitedModels.get(modelId);
  if (!expiresAt) return false;
  if (Date.now() >= expiresAt) {
    rateLimitedModels.delete(modelId);
    return false;
  }
  return true;
}

function getAvailableModels(modelIds: string[]): string[] {
  return modelIds.filter(id => !isOnCooldown(id));
}

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 1, // Only 1 retry before switching model
  baseDelayMs: 1000, // Wait only 1s before retry
};

function addJitter(delayMs: number): number {
  return Math.floor(delayMs + (Math.random() * 0.3 * delayMs));
}

export async function withRetry<T>(
  fn: (model?: string) => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  // 1. Primary Attempt Loop
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      console.log(`[AI Retry] Attempt ${attempt + 1} starting...`);
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRecoverable = error.status === 429 || error.status === 503 || error.status === 502;
      
      console.warn(`[AI Retry] Attempt ${attempt + 1} failed: ${error.message}`);

      if (attempt < opts.maxRetries && isRecoverable) {
        const delay = addJitter(opts.baseDelayMs * Math.pow(2, attempt));
        console.log(`[AI Retry] Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else if (!isRecoverable) {
        break; // Don't retry non-recoverable errors (like 401/404)
      }
    }
  }

  // 2. Failover Chain - If primary model keeps failing, switch to the other one
  const failoverChain = [
    ETSY_MODELS.MIMO.id,
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "google/gemini-2.0-flash-exp:free"
  ];

  console.log(`[AI Failover] 🛡️ Primary failed. Starting failover chain...`);
  for (const fallbackModel of failoverChain) {
    try {
      console.log(`[AI Failover] 🔄 Trying: ${fallbackModel}`);
      const result = await fn(fallbackModel);
      console.log(`[AI Failover] ✅ Success with ${fallbackModel}`);
      return result;
    } catch (error: any) {
      console.error(`[AI Failover] ❌ ${fallbackModel} also failed: ${error.message}`);
      lastError = error;
    }
  }

  throw lastError || new Error("All AI models and fallbacks are currently unavailable (503).");
}

export const FREE_MODEL_CHAINS = {
  analysis: [RESEARCH_MODELS.NEMOTRON.id],
  creative: [ETSY_MODELS.MIMO.id],
  extraction: [RESEARCH_MODELS.NEMOTRON.id],
};

export function extractJSON(content: string): string {
  if (!content) return '{}';
  let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  const startIndex = cleaned.indexOf('{');
  const lastIndex = cleaned.lastIndexOf('}');
  if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
    return cleaned.substring(startIndex, lastIndex + 1);
  }
  return cleaned;
}
