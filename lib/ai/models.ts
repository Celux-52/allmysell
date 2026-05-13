/**
 * AllMySell AI Model Registry
 * Centralized configuration for multi-model orchestration.
 * 
 * TWO DISTINCT MODEL GROUPS:
 * 1. RESEARCH_MODELS → Akıllı Araştırma Motoru (Smart Research Engine)
 *    - Ring-2.6-1T, GPT-OSS-120B, Nemotron 3 Super, MiniMax M2.5, Qwen 3 Next 80B
 * 2. ETSY_MODELS → Etsy SEO & İçerik Üretimi (Etsy Sniper Engine)
 *    - Llama 3.3 70B, Gemma 4 31B, DeepSeek R1
 * 
 * Using free tier models via OpenRouter to maximize performance while minimizing cost.
 */

// ═══════════════════════════════════════════════════════════════
// 🧠 SMART RESEARCH ENGINE MODELS (Pazar Araştırma + Tedarikçi Bulma)
// ═══════════════════════════════════════════════════════════════
export const RESEARCH_MODELS = {
  // 1. Ring-2.6-1T — 1T parametre, ajan iş akışları için üretilmiş
  RING: {
    id: 'inclusionai/ring-2.6-1t:free',
    name: 'Ring 2.6 1T',
    provider: 'InclusionAI',
    strength: 'agent-workflows',
    description: 'eBay/Amazon ürün analizi ve mantıksal çıkarım'
  },

  // 2. GPT-OSS-120B — OpenAI kökenli yüksek muhakeme
  GPT_OSS: {
    id: 'openai/gpt-oss-120b:free',
    name: 'GPT-OSS 120B',
    provider: 'OpenAI',
    strength: 'reasoning',
    description: 'Çok adımlı pazar araştırması ve tedarikçi bulma'
  },

  // 3. Nemotron 3 Super — NVIDIA 120B MoE
  NEMOTRON: {
    id: 'nvidia/nemotron-3-super-120b-a12b:free',
    name: 'Nemotron 3 Super',
    provider: 'NVIDIA',
    strength: 'data-processing',
    description: 'SEO ve pazarlama verilerini işleme, satış analizi'
  },

  // 4. MiniMax M2.5 — Verimlilik odaklı agentic model
  MINIMAX: {
    id: 'minimax/minimax-m2.5:free',
    name: 'MiniMax M2.5',
    provider: 'MiniMax',
    strength: 'browsing-comprehension',
    description: 'Web verileri ve pazar dosyalarını anlama'
  },

  // 5. Qwen 3 Next 80B — Teknik doğruluk ve lojistik hesap
  QWEN_NEXT: {
    id: 'qwen/qwen3-next-80b-a3b-instruct:free',
    name: 'Qwen 3 Next 80B',
    provider: 'Qwen',
    strength: 'technical-analysis',
    description: 'Tedarikçi karşılaştırma ve maliyet/lojistik hesaplama'
  },
};

// ═══════════════════════════════════════════════════════════════
// 🎯 ETSY SNIPER ENGINE MODELS (SEO + İçerik Üretimi)
// ═══════════════════════════════════════════════════════════════
export const ETSY_MODELS = {
  // 1. Llama 3.3 70B — Ürün başlığı ve 13 etiket optimizasyonu
  LLAMA: {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    strength: 'seo-optimization',
    description: 'Etsy ürün başlığı ve etiket anahtar kelime yoğunluğu'
  },

  // 2. Gemma 4 31B — Hassas talimat takibi, açıklama yazma
  GEMMA: {
    id: 'google/gemma-4-31b-it:free',
    name: 'Gemma 4 31B',
    provider: 'Google',
    strength: 'instruction-following',
    description: 'Karakter sınırlı, ton ayarlı ürün açıklaması yazma'
  },

  // 3. DeepSeek R1 — Rakip analizi ve USP belirleme
  DEEPSEEK: {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    strength: 'competitor-analysis',
    description: 'Rakip analizi sonrası öne çıkan özellikleri açıklamaya yedirme'
  },
};

// ═══════════════════════════════════════════════════════════════
// 🔄 LEGACY COMPATIBILITY (Eski kodlarla uyumluluk)
// ═══════════════════════════════════════════════════════════════
export const AI_MODELS = {
  REASONING: RESEARCH_MODELS.GPT_OSS,
  CREATIVE: ETSY_MODELS.GEMMA,
  SPEED: RESEARCH_MODELS.NEMOTRON,
  GENERAL: RESEARCH_MODELS.RING,
  BALANCED: RESEARCH_MODELS.MINIMAX,
  EFFICIENT: RESEARCH_MODELS.QWEN_NEXT,
  LIGHTWEIGHT: ETSY_MODELS.LLAMA,
};

export type ModelType = keyof typeof AI_MODELS;
export type ResearchModelType = keyof typeof RESEARCH_MODELS;
export type EtsyModelType = keyof typeof ETSY_MODELS;

export const getModelById = (id: string) => {
  const allModels = { ...RESEARCH_MODELS, ...ETSY_MODELS };
  return Object.values(allModels).find(m => m.id === id);
};
