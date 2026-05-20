/**
 * AllMySell AI Model Registry (v4.0 - Absolute Stability Edition)
 * Now with Personal Google AI Pro Token Support!
 */

// Google Personal Models (Using user's own API key - FASTEST & FREE tier)
export const GOOGLE_PERSONAL_MODELS = {
  FLASH_35: {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    provider: 'Google Personal',
    strength: 'speed-intelligence',
    type: 'personal'
  },
  FLASH_35_8B: {
    id: 'gemini-3.5-flash-8b',
    name: 'Gemini 3.5 Flash 8B',
    provider: 'Google Personal',
    strength: 'speed',
    type: 'personal'
  },
  PRO_31: {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google Personal',
    strength: 'reasoning',
    type: 'personal'
  },
  FLASH_31: {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google Personal',
    strength: 'balanced',
    type: 'personal'
  },
};

export const RESEARCH_MODELS = {
  // Google Gemini 2.0 Flash — En hızlı ve en güncel model (OpenRouter)
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
  GOOGLE_FLASH: GOOGLE_PERSONAL_MODELS.FLASH_35, // Tercih edilen: kişisel token
};

export const AI_MODELS = {
  REASONING: GOOGLE_PERSONAL_MODELS.PRO_31, // Pro model reasoning için
  CREATIVE: GOOGLE_PERSONAL_MODELS.FLASH_35,
  SPEED: GOOGLE_PERSONAL_MODELS.FLASH_35, // En hızlı
  GENERAL: GOOGLE_PERSONAL_MODELS.FLASH_35,
  RESEARCH: GOOGLE_PERSONAL_MODELS.PRO_31,
};
