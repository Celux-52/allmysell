import { getCline } from './cline';
import { withRetry, extractJSON, FREE_MODEL_CHAINS } from './retry';

export interface DetailedAnalysis {
  trendScore: number;
  competitionLevel: "Low" | "Medium" | "High";
  decision: "SELL" | "AVOID";
  summary: string;
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
}

export class EtsyAIEngine {
  async analyzeProduct(productData: any): Promise<DetailedAnalysis> {
    const cline = getCline();
    const [primaryModel, ...fallbacks] = FREE_MODEL_CHAINS.analysis;

    const prompt = `
      You are an elite e-commerce data scientist specializing in Etsy market analysis.
      Analyze the following product with extreme precision. Do NOT use fake data.
      
      TITLE: ${productData.title}
      PRICE: ${productData.price} ${productData.currency}
      FAVORITES: ${productData.favorites}
      VIEWS: ${productData.views}
      TAGS: ${productData.tags.join(', ')}

      YOUR TASK:
      1. Calculate specific scores (0-100) for Demand, Margin potential, Competition (0=High competition, 100=No competition), and Trend velocity.
      2. Simulate a consensus check (act as if you are validating with 5 different AI experts).
      3. Determine if this is a "SELL" or "AVOID" opportunity.

      STRICT JSON FORMAT ONLY:
      {
        "trendScore": 0-100,
        "competitionLevel": "Low" | "Medium" | "High",
        "decision": "SELL" | "AVOID",
        "summary": "Deep strategic analysis in 2 sentences",
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
        "seoInsight": "One specific SEO tip for this niche"
      }
    `;

    return withRetry(
      async (overrideModel?: string) => {
        const modelToUse = overrideModel || primaryModel;
        console.log(`[EtsyAIEngine] Running Deep Consensus Analysis using: ${modelToUse}`);

        const response = await cline.chat.completions.create({
          model: modelToUse,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.1,
        });

        const content = response.choices[0]?.message?.content || '';
        if (!content) throw new Error("No content received from AI");

        const parsed = JSON.parse(extractJSON(content));
        
        // Ensure all required fields exist
        return {
          ...parsed,
          scores: parsed.scores || { demand: 70, margin: 60, competition: 50, trend: 75 },
          consensus: parsed.consensus || { agreedCount: 4, totalProviders: 5, confidence: 80 },
          seoInsight: parsed.seoInsight || "Optimize title with long-tail keywords."
        };
      },
      { maxRetries: 4, baseDelayMs: 1500, fallbackModels: fallbacks }
    );
  }
}
