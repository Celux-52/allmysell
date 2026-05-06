import { getCline } from './cline';

export class EtsyAIEngine {
  async analyzeProduct(productData: any) {
    const cline = getCline();

    const prompt = `
      Sen bir Etsy ürün analisti ve e-ticaret uzmanısın.
      Kullanıcı Etsy için şu ürünü analiz etmeni istiyor:
      
      BAŞLIK: ${productData.title}
      FİYAT: ${productData.price} ${productData.currency}
      FAVORİLER: ${productData.favorites}
      GÖRÜNTÜLENME: ${productData.views}
      ETİKETLER: ${productData.tags.join(', ')}

      Analiz et:
      1. Bu ürün kişiselleştirilebilir mi?
      2. Handmade (el yapımı) hissi var mı?
      3. Rekabet ne durumda?
      4. Talep var mı? (Favori/görüntülenme oranına bak)
      5. Kar bırakır mı?

      Sonuçları kesinlikle aşağıdaki JSON formatında ver, ekstra metin ekleme:
      {
        "trendScore": (0-100 arası sayı),
        "competitionLevel": "Low" | "Medium" | "High",
        "decision": "SELL" | "AVOID",
        "summary": "Kısa ve net açıklama",
        "isHandmade": boolean,
        "isCustomizable": boolean
      }
    `;

    try {
      const response = await cline.chat.completions.create({
        model: "deepseek/deepseek-r1", // Kullanıcının tercih ettiği DeepSeek R1 modeli
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      let content = response.choices[0].message.content;
      if (!content) throw new Error("No content received from AI");

      // Clean markdown if AI wrapped it
      content = content.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

      return JSON.parse(content);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      throw error;
    }
  }
}
