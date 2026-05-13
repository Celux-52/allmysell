/**
 * AllMySell AI Model Registry
 * Centralized configuration for multi-model orchestration.
 * Using free tier models via OpenRouter to maximize performance while minimizing cost.
 */

export const AI_MODELS = {
  // Reasoning & Deep Analysis (Best for logic, math, and strategy)
  REASONING: {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B',
    provider: 'OpenRouter',
    strength: 'reasoning'
  },

  // Creative & High-Quality Prose (Best for SEO, blog posts, and listings)
  CREATIVE: {
    id: 'nousresearch/hermes-3-llama-3.1-405b:free',
    name: 'Hermes 3 405B',
    provider: 'OpenRouter',
    strength: 'creative'
  },

  // Ultra-Fast & Real-Time (Best for quick scans and summarization)
  SPEED: {
    id: 'openrouter/free',
    name: 'OpenRouter Free Auto',
    provider: 'OpenRouter',
    strength: 'speed'
  },

  // General Purpose & Structured Data (Best for categorization and JSON)
  GENERAL: {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama 3.2 3B',
    provider: 'OpenRouter',
    strength: 'general'
  },

  // Balanced Performance (Dense knowledge & technical tasks)
  BALANCED: {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B',
    provider: 'OpenRouter',
    strength: 'balanced'
  },

  // Efficient & Robust (Great for data cleaning and verification)
  EFFICIENT: {
    id: 'qwen/qwen3-coder:free',
    name: 'Qwen 3 Coder',
    provider: 'OpenRouter',
    strength: 'efficient'
  },

  // Lightweight & Edge (Best for simple lookups)
  LIGHTWEIGHT: {
    id: 'openrouter/free',
    name: 'OpenRouter Free Auto',
    provider: 'OpenRouter',
    strength: 'lightweight'
  }
};

export type ModelType = keyof typeof AI_MODELS;

export const getModelById = (id: string) => {
  return Object.values(AI_MODELS).find(m => m.id === id);
};
