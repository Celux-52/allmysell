import { getCline } from './cline';
import { withRetry, extractJSON, FREE_MODEL_CHAINS } from './retry';

export class EtsySupplierAgent {
  async findSupplier(productTitle: string, tags: string[] = [], price: number = 0) {
    const cline = getCline();
    const [primaryModel, ...fallbacks] = FREE_MODEL_CHAINS.extraction;

    const prompt = `
      You are a global sourcing expert specializing in e-commerce supply chain strategy.
      Analyze this Etsy product and recommend the best sourcing/production approach:

      PRODUCT: ${productTitle}
      TAGS: ${tags.join(', ')}
      RETAIL PRICE: $${price}

      Consider:
      1. Is this best sourced from China (Alibaba/1688), made locally, or print-on-demand?
      2. What is the estimated production/sourcing cost?
      3. What is the risk level for a new seller?
      4. Which specific supplier type or platform is best?

      Return ONLY the following JSON format:
      {
        "sourceType": "Alibaba" | "1688" | "Print-on-Demand" | "Local Handmade" | "Wholesale",
        "supplierName": "Specific platform or supplier recommendation",
        "estimatedCost": number (in USD),
        "riskLevel": "Low" | "Medium" | "High",
        "notes": "Detailed sourcing strategy and recommendations in English"
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
