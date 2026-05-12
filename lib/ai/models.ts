/**
 * AllMySell AI Model Registry
 * Centralized configuration for multi-model orchestration.
 * Using free tier models via OpenRouter to maximize performance while minimizing cost.
 */

export const AI_MODELS = {
  // Reasoning & Deep Analysis (Best for logic, math, and strategy)
  REASONING: {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1 (Reasoning)',
    provider: 'OpenRouter',
    strength: 'reasoning'
  },

  // Creative & High-Quality Prose (Best for SEO, blog posts, and listings)
  CREATIVE: {
    id: 'deepseek/deepseek-chat:free',
    name: 'DeepSeek V3',
    provider: 'OpenRouter',
    strength: 'creative'
  },

  // Ultra-Fast & Real-Time (Best for quick scans and summarization)
  SPEED: {
    id: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    name: 'Gemini 2.0 Flash Lite',
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
    id: 'mistralai/mistral-small-24b-instruct-2501:free',
    name: 'Mistral Small 24B',
    provider: 'OpenRouter',
    strength: 'balanced'
  },

  // Efficient & Robust (Great for data cleaning and verification)
  EFFICIENT: {
    id: 'qwen/qwen-2.5-7b-instruct:free',
    name: 'Qwen 2.5 7B',
    provider: 'OpenRouter',
    strength: 'efficient'
  },

  // Lightweight & Edge (Best for simple lookups)
  LIGHTWEIGHT: {
    id: 'microsoft/phi-3-mini-128k-instruct:free',
    name: 'Phi-3 Mini',
    provider: 'OpenRouter',
    strength: 'lightweight'
  }
};

export type ModelType = keyof typeof AI_MODELS;

export const getModelById = (id: string) => {
  return Object.values(AI_MODELS).find(m => m.id === id);
};
