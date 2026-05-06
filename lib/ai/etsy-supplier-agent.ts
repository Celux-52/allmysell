import { getCline } from './cline';

export class EtsySupplierAgent {
  async findSupplierStrategy(productTitle: string, tags: string[] = [], price: number = 0) {
    const cline = getCline();

    const prompt = `
      Sen bir e-ticaret tedarik zinciri (sourcing) uzmanısın.
      Kullanıcı Etsy'de şu ürünü satmaya karar verdi:
      ÜRÜN: ${productTitle}
      ETİKETLER: ${tags.join(', ')}
      Mevcut Ortalama Satış Fiyatı: ${price} USD

      Bu ürünü nereden/nasıl tedarik edebilir? Ürünün yapısına bakarak en mantıklı üretim modelini analiz et.
      Seçenekler: 
      1. POD (Print on Demand - Printify, Printful, Gelato vb. sadece baskılı ürünler için)
      2. AliExpress / CJDropshipping (Hazır, fabrikasyon, genel geçer ürünler için)
      3. Private Label / Yerel Üretim / Handmade (Kişiselleştirilmiş, deri, ahşap veya özel takılar için)

      En uygun yöntemi seç ve kesinlikle JSON formatında döndür:
      {
        "sourceType": "POD" | "AliExpress" | "Private Label",
        "supplierName": "Önerilen Platform/Tedarikçi (Örn: Printify, CJDropshipping, Local Artisan)",
        "estimatedCost": (Sadece sayı, mevcut satış fiyatına bakarak tahmini bir üretim maliyeti uydur, örneğin fiyat 40 ise maliyet 12 gibi),
        "riskLevel": "Low" | "Medium" | "High",
        "notes": "Neden bu tedarik yöntemini önerdin? (Türkçe ve net açıklama)"
      }
    `;

    try {
      const response = await cline.chat.completions.create({
        model: "qwen/qwen-2.5-72b-instruct:free", // Qwen model for data extraction
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
