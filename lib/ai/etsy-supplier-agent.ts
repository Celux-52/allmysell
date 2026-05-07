import { getCline } from './cline';

export class EtsySupplierAgent {
  async findSupplier(productTitle: string, tags: string[] = [], price: number = 0) {
    const cline = getCline();

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

    try {
      const response = await cline.chat.completions.create({
        model: "qwen/qwen-2.5-72b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      let content = response.choices[0].message.content;
      if (!content) throw new Error("No content received from AI");

      content = content.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
      }

      return JSON.parse(content);
    } catch (error) {
      console.error("Supplier Agent failed:", error);
      throw error;
    }
  }
}
