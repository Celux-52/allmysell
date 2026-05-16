/**
 * AllMySell AI Model Registry (v4.0 - Absolute Stability Edition)
 */

export const RESEARCH_MODELS = {
  // NVIDIA Nemotron 3 Super — En stabil ve zeki ücretsiz model
  PRIMARY: {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    name: 'Nemotron 3 Super',
    provider: 'NVIDIA',
    strength: 'intelligence-data'
  },
  // OpenAI GPT-OSS 120B — Yüksek kapasiteli yedek
  GPT_OSS: {
    id: 'openai/gpt-oss-120b:free',
    name: 'GPT-OSS 120B',
    provider: 'OpenAI',
    strength: 'reasoning'
  },
};

export const ETSY_MODELS = {
  FLASH: RESEARCH_MODELS.PRIMARY,
};

export const AI_MODELS = {
  REASONING: RESEARCH_MODELS.GPT_OSS,
  CREATIVE: RESEARCH_MODELS.PRIMARY,
  SPEED: RESEARCH_MODELS.PRIMARY,
  GENERAL: RESEARCH_MODELS.PRIMARY,
};
