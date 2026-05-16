/**
 * AllMySell AI Model Registry (v4.0 - Absolute Stability Edition)
 */

export const RESEARCH_MODELS = {
  // Google Gemini 2.0 Flash — En hızlı ve en güncel model
  PRIMARY: {
    id: 'google/gemini-2.0-flash-001',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    strength: 'speed-intelligence'
  },
  // Meta Llama 3.3 70B — Derin analiz için
  LLAMA: {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    strength: 'deep-analysis'
  },
};

export const ETSY_MODELS = {
  FLASH: RESEARCH_MODELS.PRIMARY,
};

export const AI_MODELS = {
  REASONING: RESEARCH_MODELS.LLAMA,
  CREATIVE: RESEARCH_MODELS.PRIMARY,
  SPEED: RESEARCH_MODELS.PRIMARY,
  GENERAL: RESEARCH_MODELS.PRIMARY,
};
