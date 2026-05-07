import { getCline } from './cline';
import { withRetry, extractJSON, FREE_MODEL_CHAINS } from './retry';

export class EtsyAIEngine {
  async analyzeProduct(productData: any) {
    const cline = getCline();
    const [primaryModel, ...fallbacks] = FREE_MODEL_CHAINS.analysis;

    const prompt = `
      You are an expert Etsy product analyst and e-commerce strategist.
      Analyze the following Etsy product listing and provide a data-driven assessment:
      
      TITLE: ${productData.title}
      PRICE: ${productData.price} ${productData.currency}
      FAVORITES: ${productData.favorites}
      VIEWS: ${productData.views}
      TAGS: ${productData.tags.join(', ')}

      Evaluate:
      1. Is this product customizable/personalizable?
      2. Does it have a handmade aesthetic?
      3. What is the competition level?
      4. Is there real demand? (Analyze favorites-to-views ratio)
      5. Is there profit margin potential?

      Return ONLY the following JSON format, no extra text:
      {
        "trendScore": (0-100 number),
        "competitionLevel": "Low" | "Medium" | "High",
        "decision": "SELL" | "AVOID",
        "summary": "Brief, clear analysis in English",
        "isHandmade": boolean,
        "isCustomizable": boolean
      }
    `;

    return withRetry(
      async (overrideModel?: string) => {
        const response = await cline.chat.completions.create({
          model: overrideModel || primaryModel,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No content received from AI");

        return JSON.parse(extractJSON(content));
      },
      { maxRetries: 2, baseDelayMs: 1000, fallbackModels: fallbacks }
    );
  }
}
