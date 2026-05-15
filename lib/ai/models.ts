/**
 * AllMySell AI Model Registry
 * Centralized configuration for AI model orchestration.
 * 
 * TWO DEDICATED AI MODELS:
 * 1. RESEARCH_MODELS → Akıllı Araştırma Motoru (Smart Research Engine)
 *    - NVIDIA Nemotron 3 Super 120B
 * 2. ETSY_MODELS → Etsy SEO & İçerik Üretimi (Etsy Sniper Engine)
 *    - Xiaomi MiMo-V2-Flash
 * 
 * Using free tier models via OpenRouter to maximize performance while minimizing cost.
 */

// ═══════════════════════════════════════════════════════════════
// 🧠 SMART RESEARCH ENGINE MODEL (Pazar Araştırma + Tedarikçi Bulma)
// ═══════════════════════════════════════════════════════════════
export const RESEARCH_MODELS = {
  // NVIDIA Nemotron 3 Super — 120B MoE, veri işleme ve analiz
  NEMOTRON: {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    name: 'Nemotron 3 Super',
    provider: 'NVIDIA',
    strength: 'data-processing',
    description: 'Pazar araştırması, SEO analizi, tedarikçi bulma ve satış analizi'
  },
};

// ═══════════════════════════════════════════════════════════════
// 🎯 ETSY SNIPER ENGINE MODEL (SEO + İçerik Üretimi)
// ═══════════════════════════════════════════════════════════════
export const ETSY_MODELS = {
  // Xiaomi MiMo-V2-Flash — Hızlı ve güçlü analiz modeli
  MIMO: {
    id: 'xiaomi/mimo-v2-flash:free',
    name: 'MiMo-V2-Flash',
    provider: 'Xiaomi',
    strength: 'seo-optimization',
    description: 'Etsy ürün analizi, SEO optimizasyonu ve pazar istihbaratı'
  },
};

// ═══════════════════════════════════════════════════════════════
// 🔄 LEGACY COMPATIBILITY (Eski kodlarla uyumluluk)
// ═══════════════════════════════════════════════════════════════
export const AI_MODELS = {
  REASONING: RESEARCH_MODELS.NEMOTRON,
  CREATIVE: ETSY_MODELS.MIMO,
  SPEED: RESEARCH_MODELS.NEMOTRON,
  GENERAL: RESEARCH_MODELS.NEMOTRON,
  BALANCED: RESEARCH_MODELS.NEMOTRON,
  EFFICIENT: RESEARCH_MODELS.NEMOTRON,
  LIGHTWEIGHT: ETSY_MODELS.MIMO,
};

export type ModelType = keyof typeof AI_MODELS;
export type ResearchModelType = keyof typeof RESEARCH_MODELS;
export type EtsyModelType = keyof typeof ETSY_MODELS;

export const getModelById = (id: string) => {
  const allModels = { ...RESEARCH_MODELS, ...ETSY_MODELS };
  return Object.values(allModels).find(m => m.id === id);
};
