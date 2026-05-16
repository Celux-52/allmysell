import { getCline } from './cline';
import { withRetry, extractJSON } from './retry';
import { RESEARCH_MODELS } from './models';

export class EtsySupplierAgent {
  async findSupplier(productTitle: string, tags: string[] = [], price: number = 0) {
    const cline = getCline();
    const primaryModel = RESEARCH_MODELS.PRIMARY.id;

    const prompt = `
      You are a global sourcing expert and supply chain architect for top-tier e-commerce brands.
      Analyze this Etsy product and build a professional sourcing strategy.
      
      PRODUCT: ${productTitle}
      TAGS: ${tags.join(', ')}
      ESTIMATED RETAIL: $${price}

      TASK:
      Provide exactly 3 distinct, high-quality sourcing options. 
      One MUST be a global wholesale option (Alibaba), one a dropshipping/POD option, and one a tactical alternative (1688 or local).

      For each option, you MUST generate a PRECISE search URL that will actually work.
      Example Alibaba URL: https://www.alibaba.com/trade/search?SearchText=...
      Example AliExpress URL: https://www.aliexpress.com/wholesale?SearchText=...

      Return ONLY a JSON object in this format:
      {
        "suppliers": [
          {
            "sourceType": "Alibaba" | "AliExpress" | "Print-on-Demand" | "1688" | "Global Wholesale",
            "name": "Professional name for this sourcing channel",
            "estimatedCost": number (wholesale price range),
            "riskLevel": "Low" | "Medium" | "High",
            "notes": "Brutal strategic advice on how to source this specific item safely.",
            "leadTime": "e.g. 5-12 Days",
            "reliabilityScore": 90-99,
            "url": "THE WORKING SEARCH URL"
          }
        ]
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
      { maxRetries: 2, baseDelayMs: 1000 }
    );
  }
}
