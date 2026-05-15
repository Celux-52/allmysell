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
  maxRetries: 2,
  baseDelayMs: 2000,
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

  // 1. Primary Attempt
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error.message?.includes('429') || error.status === 429;
      
      if (isRateLimit) break; // Go to failover
      
      if (attempt < opts.maxRetries) {
        const delay = addJitter(opts.baseDelayMs * Math.pow(2, attempt));
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // 2. Simple Failover Chain (Using our 2 primary models as backups for each other if needed)
  const failoverChain = [
    RESEARCH_MODELS.NEMOTRON.id,
    ETSY_MODELS.MIMO.id
  ];

  for (const fallbackModel of failoverChain) {
    try {
      console.log(`[AI Failover] 🔄 Trying fallback: ${fallbackModel}`);
      return await fn(fallbackModel);
    } catch (error: any) {
      lastError = error;
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  throw lastError || new Error("All AI attempts failed");
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
