/**
 * AI Retry, Fallback & Smart Rotation Utility
 * 
 * Features:
 * - Exponential backoff with jitter for rate limits (429)
 * - Automatic model rotation when a model is rate-limited
 * - Per-model cooldown tracking (rate-limited models are skipped for 60s)
 * - Round-robin rotation across providers to distribute load
 * - Ultimate failover chain across all available free models
 */

import { RESEARCH_MODELS, ETSY_MODELS } from './models';

// ═══════════════════════════════════════════════════════════════
// 🔄 SMART MODEL ROTATION — Per-model rate limit cooldown
// ═══════════════════════════════════════════════════════════════

/** Track which models are currently rate-limited and when they can be retried */
const rateLimitedModels = new Map<string, number>(); // modelId -> cooldownExpiresAt (timestamp)

const MODEL_COOLDOWN_MS = 60_000; // 60 seconds cooldown after a 429

/** Mark a model as rate-limited */
function markRateLimited(modelId: string): void {
  const expiresAt = Date.now() + MODEL_COOLDOWN_MS;
  rateLimitedModels.set(modelId, expiresAt);
  console.warn(`[AI Rotation] 🚫 Model ${modelId} rate-limited, cooling down until ${new Date(expiresAt).toISOString()}`);
}

/** Check if a model is currently on cooldown */
function isOnCooldown(modelId: string): boolean {
  const expiresAt = rateLimitedModels.get(modelId);
  if (!expiresAt) return false;
  if (Date.now() >= expiresAt) {
    rateLimitedModels.delete(modelId); // Cooldown expired
    return false;
  }
  return true;
}

/** Get all available (non-cooldown) models from a list */
function getAvailableModels(modelIds: string[]): string[] {
  return modelIds.filter(id => !isOnCooldown(id));
}

// ═══════════════════════════════════════════════════════════════
// 🔁 ROUND-ROBIN ROTATION — Distribute load across models
// ═══════════════════════════════════════════════════════════════

const roundRobinCounters = new Map<string, number>(); // chainKey -> counter

/** Pick the next model in a round-robin fashion, skipping cooldown models */
export function pickNextModel(chainKey: string, modelIds: string[]): string | null {
  const available = getAvailableModels(modelIds);
  if (available.length === 0) return null;

  const counter = roundRobinCounters.get(chainKey) || 0;
  const index = counter % available.length;
  roundRobinCounters.set(chainKey, counter + 1);

  return available[index];
}

// ═══════════════════════════════════════════════════════════════
// 🛡️ RETRY ENGINE — Exponential backoff + jitter + failover
// ═══════════════════════════════════════════════════════════════

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  fallbackModels?: string[];
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelayMs: 2000,
  fallbackModels: [],
};

/** Add random jitter to prevent thundering herd */
function addJitter(delayMs: number): number {
  const jitter = Math.random() * 0.3 * delayMs; // ±30% jitter
  return Math.floor(delayMs + jitter);
}

/**
 * Wraps an async function with retry logic, smart rotation, and model failover.
 * 
 * Flow:
 * 1. Try with primary model up to maxRetries times (exponential backoff + jitter)
 * 2. If primary is rate-limited, mark it on cooldown and immediately try failover
 * 3. Failover chain: try each available model once, skipping cooldown models
 * 4. If all fail, throw the last error
 */
export async function withRetry<T>(
  fn: (model?: string) => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  // 1. Try with primary model (and retries with exponential backoff)
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      const isRateLimit = error.message?.includes('429') || error.status === 429;
      
      console.warn(
        `[AI Retry] Attempt ${attempt + 1}/${opts.maxRetries + 1} failed` +
        ` (${isRateLimit ? '⚡ Rate Limit' : '❌ Error'}): ${error.message?.substring(0, 120)}`
      );

      // If rate-limited, mark model on cooldown and break to failover immediately
      if (isRateLimit) {
        // Try to extract model ID from error context
        const modelMatch = error.message?.match(/model[:\s]+([^\s,]+)/i);
        if (modelMatch) markRateLimited(modelMatch[1]);
        break; // Go straight to failover, no point retrying same model
      }
      
      if (attempt < opts.maxRetries) {
        const baseDelay = opts.baseDelayMs * Math.pow(2, attempt);
        const delay = addJitter(baseDelay);
        console.log(`[AI Retry] Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // 2. SMART FAILOVER CHAIN — Skip models that are on cooldown
  const failoverChain = [
    RESEARCH_MODELS.RING.id,
    RESEARCH_MODELS.GPT_OSS.id,
    RESEARCH_MODELS.NEMOTRON.id,
    RESEARCH_MODELS.MINIMAX.id,
    RESEARCH_MODELS.QWEN_NEXT.id,
    ETSY_MODELS.LLAMA.id,
    ETSY_MODELS.GEMMA.id,
    ETSY_MODELS.DEEPSEEK.id,
  ];

  const availableFailovers = getAvailableModels(failoverChain);
  
  if (availableFailovers.length === 0) {
    console.error('[AI Failover] ⛔ ALL models are on cooldown! Waiting 10s before final attempt...');
    await new Promise(r => setTimeout(r, 10_000));
    // Clear all cooldowns and try one last time
    rateLimitedModels.clear();
  }

  const modelsToTry = availableFailovers.length > 0 ? availableFailovers : failoverChain;

  for (const fallbackModel of modelsToTry) {
    try {
      console.log(`[AI Failover] 🔄 Rotating to: ${fallbackModel}`);
      const result = await fn(fallbackModel);
      console.log(`[AI Failover] ✅ ${fallbackModel} succeeded!`);
      return result;
    } catch (error: any) {
      lastError = error;
      
      const isRateLimit = error.message?.includes('429') || error.status === 429;
      if (isRateLimit) markRateLimited(fallbackModel);
      
      console.warn(`[AI Failover] ${fallbackModel} failed: ${error.message?.substring(0, 100)}`);
      
      // Small delay between failover attempts to be nice to OpenRouter
      await new Promise(r => setTimeout(r, addJitter(2000)));
    }
  }

  throw lastError || new Error("All AI attempts and failbacks failed after full rotation");
}

// ═══════════════════════════════════════════════════════════════
// 📋 MODEL CHAIN PRESETS — For different use cases
// ═══════════════════════════════════════════════════════════════

export const FREE_MODEL_CHAINS = {
  /** Market research, trend analysis, product scoring */
  analysis: [
    RESEARCH_MODELS.RING.id,
    RESEARCH_MODELS.GPT_OSS.id,
    RESEARCH_MODELS.NEMOTRON.id,
  ],
  /** SEO content, product descriptions, listing copy */
  creative: [
    ETSY_MODELS.LLAMA.id,
    ETSY_MODELS.GEMMA.id,
    ETSY_MODELS.DEEPSEEK.id,
  ],
  /** Data extraction, JSON parsing, structured output */
  extraction: [
    RESEARCH_MODELS.NEMOTRON.id,
    RESEARCH_MODELS.MINIMAX.id,
    RESEARCH_MODELS.QWEN_NEXT.id,
  ],
};

// ═══════════════════════════════════════════════════════════════
// 🔍 JSON EXTRACTION — Ultra-robust parser
// ═══════════════════════════════════════════════════════════════

/**
 * ULTRA-ROBUST JSON EXTRACTION
 * Handles thinking tags, markdown, and stray text before/after/BETWEEN JSON blocks.
 */
export function extractJSON(content: string): string {
  if (!content) return '{}';
  
  // 1. Remove thinking tags
  let cleaned = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  
  // 2. Try to find the LARGEST valid JSON block using a stack-based approach
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
