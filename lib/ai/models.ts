/**
 * AllMySell AI Model Registry (v4.0 - Absolute Stability Edition)
 */

export const RESEARCH_MODELS = {
  // Google Gemini 2.0 Flash — En hızlı ve en stabil model (Birincil)
  PRIMARY: {
    id: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    strength: 'speed-stability'
  },
  // NVIDIA Nemotron 3 Super — Derin analiz için (Yedek)
  NEMOTRON: {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    name: 'Nemotron 3 Super',
    provider: 'NVIDIA',
    strength: 'deep-analysis'
  },
};

export const ETSY_MODELS = {
  MIMO: {
    id: 'xiaomi/mimo-v2-flash:free',
    name: 'MiMo-V2-Flash',
    provider: 'Xiaomi',
    strength: 'seo-optimization'
  },
};

export const AI_MODELS = {
  REASONING: RESEARCH_MODELS.PRIMARY,
  CREATIVE: ETSY_MODELS.MIMO,
  SPEED: RESEARCH_MODELS.PRIMARY,
  GENERAL: RESEARCH_MODELS.PRIMARY,
};
