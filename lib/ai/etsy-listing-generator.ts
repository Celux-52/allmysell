import { getCline } from './cline';

export class EtsyListingGenerator {
  async generateListing(productTitle: string, tags: string[] = []) {
    const cline = getCline();

    const prompt = `
      Sen Etsy SEO uzmanı ve metin yazarısın. Hedef kitlen doğrudan son tüketici.
      Şu ürün için Etsy listeleme başlığı ve açıklaması yazacaksın:
      ÜRÜN: ${productTitle}
      ETİKETLER: ${tags.join(', ')}

      KURALLAR (KESİNLİKLE UYULACAK):
      1. KESİNLİKLE YAPAY ZEKA GİBİ KONUŞMA. Robotik kelimelerden kaçın. Şunları ASLA KULLANMA: "In conclusion", "Dive into", "Tapestry", "Elevate", "Discover", "Unleash", "Whether you...", "Perfect for".
      2. Samimi, insani, el emeği hissiyatı veren, dürüst bir satıcı dili kullan.
      3. Başlık SEO uyumlu olsun (Etsy algoritması için ilk 40 karakter en önemli kısımdır), anahtar kelimeleri spam yapmadan doğal şekilde yedir.
      4. Açıklama çok uzun olmasın, okunabilir kısa paragraflar ve madde imleri kullan. Müşterinin aklındaki soruları yanıtla (boyut, malzeme, kargo süreci).
      5. Sonunda tavsiye edilen tam 13 adet arama hacmi yüksek Etsy etiketi ver.

      Çıktı kesinlikle aşağıdaki JSON formatında olmalı:
      {
        "seoTitle": "Etsy Başlığı (Max 140 karakter)",
        "description": "Satıcı ağzından samimi ürün açıklaması (HTML formatında P ve BR etiketleri kullanılabilir)",
        "tags": ["etiket1", "etiket2", "etiket3"]
      }
    `;

    try {
      const response = await cline.chat.completions.create({
        model: "anthropic/claude-3.5-haiku", // Kullanıcının premium modeli
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      });

      let content = response.choices[0].message.content;
      if (!content) throw new Error("No content received from AI");

      content = content.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

      return JSON.parse(content);
    } catch (error) {
      console.error("Listing Generation failed:", error);
      throw error;
    }
  }
}
