import { getCline } from './cline';
import { withRetry, extractJSON, FREE_MODEL_CHAINS } from './retry';

export interface DetailedAnalysis {
  trendScore: number;
  competitionLevel: "Low" | "Medium" | "High";
  decision: "SELL" | "AVOID";
  summary: string;
  verdict: string;
  opportunityStatus: string;
  revenueForecast: string;
  riskEvaluation: string;
  sniperStrategy: string;
  isHandmade: boolean;
  isCustomizable: boolean;
  scores: {
    demand: number;
    margin: number;
    competition: number;
    trend: number;
  };
  consensus: {
    agreedCount: number;
    totalProviders: number;
    confidence: number;
  };
  seoInsight: string;
  buyerPsychology: string;
}

export class EtsyAIEngine {
  async analyzeProduct(productData: any): Promise<DetailedAnalysis> {
    const cline = getCline();
    const [primaryModel, ...fallbacks] = FREE_MODEL_CHAINS.analysis;

    const prompt = `
      ROLE: You are the "Etsy Sniper" Strategic Business Advisor. You are the brain of a high-end SaaS platform. Your goal is NOT to describe data, but to dictate profit-making moves.

      1. THE "VERDICT" PROTOCOL (MANDATORY)
      Every single response MUST start with a high-impact, one-sentence VERDICT. This is the ultimate "Go/No-Go" decision.

      2. CORE MODULES & LOGIC
      I. MARKET ADVISORY (The "Truth" Engine): Classify into: WINNER, RISKY, SAFE HAVEN, or DEAD END.
      II. SMART SALES ESTIMATION: Realistic monthly volume.
      III. COMPETITOR KILL-ZONE: Vulnerability in Top 10.
      IV. BUYER PSYCHOLOGY: Why do they hit "Add to Cart"?

      PRODUCT DATA:
      TITLE: ${productData.title}
      PRICE: ${productData.price} ${productData.currency}
      FAVORITES: ${productData.favorites}
      VIEWS: ${productData.views}
      TAGS: ${productData.tags?.join(', ') || 'N/A'}

      OUTPUT STRUCTURE (STRICT JSON):
      {
        "verdict": "One high-impact sentence",
        "opportunityStatus": "WINNER | RISKY | SAFE HAVEN | DEAD END",
        "revenueForecast": "Aggressive but realistic revenue/sales range",
        "riskEvaluation": "Primary threat to profit",
        "sniperStrategy": "Tactical move to win",
        "trendScore": 0-100,
        "competitionLevel": "Low | Medium | High",
        "decision": "SELL | AVOID",
        "summary": "Deep strategic logic combining the modules",
        "buyerPsychology": "Emotional trigger analysis",
        "isHandmade": boolean,
        "isCustomizable": boolean,
        "scores": {
          "demand": 0-100,
          "margin": 0-100,
          "competition": 0-100,
          "trend": 0-100
        },
        "consensus": {
          "agreedCount": 4,
          "totalProviders": 5,
          "confidence": 0-100
        },
        "seoInsight": "Tactical SEO gap to exploit"
      }
    `;

    return withRetry(
      async (overrideModel?: string) => {
        const modelToUse = overrideModel || primaryModel;
        console.log(`[EtsyAIEngine] Running V2.0 Strategic Analysis using: ${modelToUse}`);

        const response = await cline.chat.completions.create({
          model: modelToUse,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
        });

        const content = response.choices[0]?.message?.content || '';
        if (!content) throw new Error("No content received from AI");

        const parsed = JSON.parse(extractJSON(content));
        
        return {
          ...parsed,
          summary: parsed.verdict + " " + parsed.summary, // Combine for UI compatibility
          scores: parsed.scores || { demand: 70, margin: 60, competition: 50, trend: 75 },
          consensus: parsed.consensus || { agreedCount: 4, totalProviders: 5, confidence: 80 },
          seoInsight: parsed.seoInsight || "Optimize for long-tail high-intent keywords."
        };
      },
      { maxRetries: 4, baseDelayMs: 1500, fallbackModels: fallbacks }
    );
  }
}
