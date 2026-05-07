import { getCline } from './cline';

export class EtsyAIEngine {
  async analyzeProduct(productData: any) {
    const cline = getCline();

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

    try {
      const response = await cline.chat.completions.create({
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      let content = response.choices[0].message.content;
      if (!content) throw new Error("No content received from AI");

      // Clean markdown if AI wrapped it
      content = content.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
      
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
      }

      return JSON.parse(content);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      throw error;
    }
  }
}
