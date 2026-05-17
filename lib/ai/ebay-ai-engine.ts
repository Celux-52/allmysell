import { withRetry, extractJSON } from './retry';

export interface EbayDetailedAnalysis {
  decision: "BUY" | "SKIP";
  score: number;
  financials: {
    estimatedEbayFee: number;
    estimatedAdFee: number;
    estimatedOperationalBuffer: number;
    netProfit: number;
    profitMargin: number;
    roi: number;
  };
  supplierCheck: {
    status: "APPROVED" | "RESTRICTED" | "WARNING";
    supplierTrustScore: number;
    note: string;
  };
  riskAnalysis: {
    veroRisk: "LOW" | "MEDIUM" | "HIGH";
    competitionRisk: "LOW" | "MEDIUM" | "HIGH";
    returnRisk: "LOW" | "MEDIUM" | "HIGH";
    policyRisk: "LOW" | "MEDIUM" | "HIGH";
    reason: string;
  };
  policyRisk: {
    dropShippingRisk: "LOW" | "MEDIUM" | "HIGH";
    trackingRisk: "LOW" | "MEDIUM" | "HIGH";
    invoiceRisk: "LOW" | "MEDIUM" | "HIGH";
    accountSafetyScore: number;
  };
  marketAnalysis: {
    competitionLevel: "LOW" | "MEDIUM" | "HIGH";
    marketSaturation: number;
    priceWarRisk: "LOW" | "MEDIUM" | "HIGH";
    estimatedSellThroughRate: number;
    chineseSellerDominance: "LOW" | "MEDIUM" | "HIGH";
  };
  trendAnalysis: {
    momentum: "RISING" | "DECLINING" | "STABLE";
    seasonality: "EVERGREEN" | "SEASONAL";
    q4Potential: boolean;
    viralPotential: number;
    trendStrength: number;
  };
  shippingAnalysis: {
    complexity: "LOW" | "MEDIUM" | "HIGH";
    fragile: boolean;
    battery: boolean;
    oversized: boolean;
    customsRisk: "LOW" | "MEDIUM" | "HIGH";
  };
  seoAnalysis: {
    keywordStrength: number;
    clickabilityScore: number;
    recommendedKeywords: string[];
  };
  returnRisk: {
    level: "LOW" | "MEDIUM" | "HIGH";
    reason: string;
  };
  confidence: {
    overall: number;
    dataQuality: number;
    predictionConfidence: number;
    marketConfidence: number;
  };
  aiReasoning: string[];
  pricingSimulation: Array<{
    price: number;
    profit: number;
    roi: number;
  }>;
  optimizations: {
    seoTitle: string;
    suggestedPrice: number;
    bulletPoints: string[];
  };
  listingAssets: {
    optimizedDescription: string;
    recommendedCategory: string;
    itemSpecifics: Record<string, string>;
  };
}

export class EbayAIEngine {
  static async analyzeProduct(productData: any): Promise<EbayDetailedAnalysis> {
    const PROMPT = `
# eBay Sniper & Smart Research Intelligence Engine — System Prompt

## Rol Tanımı
Sen **AllMySell** SaaS platformunun gelişmiş **eBay Sniper & Smart Research Intelligence Engine** sistemisin.
Görevin: Kullanıcının mağaza bağlantısı olmadan (Zero-Integration) dışarıdan getirdiği eBay ürün verilerini analiz ederek:
- Kesin **BUY / SKIP** kararı vermek
- Resmi eBay politikalarına uygunluğu kontrol etmek
- Account safety riskini analiz etmek
- Kârlılığı hesaplamak
- Rekabet yoğunluğunu değerlendirmek
- Trend potansiyelini analiz etmek
- SEO optimize listing içerikleri üretmek
- Profesyonel seller seviyesinde operasyonel risk analizi yapmak

> Gerçek bir eBay seller intelligence engine gibi davran. Generic AI cevapları verme. Kesin kararlar üret. Risk odaklı düşün. Account safety maksimum önceliğindir.

---

## Analiz Motorları

### 1. VeRO & IP Risk Engine
Yüksek riskli markalar: Apple, Nike, Adidas, Sony, Samsung, Lego, Disney, Rolex, Louis Vuitton, Gucci, Chanel, Dior, Pokemon, Nintendo, Prada
Kurallar (MUTLAK VE KESİN):
- Eğer ürün başlığı yukarıdaki yüksek riskli markalardan birini içeriyorsa (büyük/küçük harf duyarsız) VE resmi yetkili distribütör dışı bir toptancıdan veya dropshipping tedarikçisinden (DHgate, AliExpress, CJ Dropshipping vb.) tedarik ediliyorsa:
  * Karar KESİNLİKLE ama KESİNLİKLE "SKIP" olmalıdır! Asla "BUY" verme! Başlıkta "Original" veya "Authentic" yazması bunu değiştirmez, çünkü bu tedarikçilerden gelen büyük markalar %100 taklittir (counterfeit).
  * veroRisk = "HIGH" olmalıdır.
  * accountSafetyScore = 30 veya daha düşük olmalıdır.
- Başlıkta şu ifadeler varsa direkt veroRisk = "HIGH" ver ve karar KESİNLİKLE "SKIP" olsun: Fake, Replica, Inspired, Clone, 1:1, Dupe, AAA+, OEM.
- Lüks marka veya taklit aksesuar riski görüldüğünde account safety score'u en dibe düşür. Sourcing major brands from generic suppliers is a 100% guarantee of permanent account suspension.

### 2. eBay Fees & Profit Engine
Maliyet kalemleri: %15 eBay Final Value Fee, %5 Promoted Listings Ad Fee, %3 Operational Buffer, Supplier Cost
Kurallar:
- Net profit margin %15 altındaysa -> SKIP
- ROI %20 altındaysa -> score düşür
- Negatif profit -> direkt SKIP

### 3. Supplier Trust Engine
Approved (Güvenli) Tedarikçiler: CJ Dropshipping, Printful, Chinabrands, Gogomall, Chinavasion, Salehoo, Dhgate, Mirage Pet Products, Banggood, Wholesale2B
Restricted (Riskli) Tedarikçiler: Costco, Costway, Walmart, Amazon, Target

### 4. Market Saturation Engine
- Düşük rekabet + yüksek demand -> score artır
- Yüksek saturation -> score düşür
- Price war ihtimali -> risk artır

### 5. Trend & Momentum Engine
- Rising trend -> score artır
- Declining trend -> score düşür
- Evergreen ürünlere öncelik ver

### 6. Account Safety Engine
⚠️ Kârlı olsa bile account için riskli ürünleri ele. Account safety sistemin en önemli önceliğidir.

### 7. Shipping & Return Engine
Risk arttıkça score düşür. (Oversized, fragile, battery, apparel sizing).

### 8. SEO & Listing Optimization Engine
- Title 80 karakteri geçmesin. Keyword stuffing yapma. Doğal okunabilir title üret.

### 9. Pricing Simulation Engine
En az 3 fiyat senaryosu üret (örn. $24.99, $27.99, $29.99) ve hesapla.

PRODUCT DATA TO ANALYZE:
TITLE: ${productData.title}
CURRENT EBAY PRICE: ${productData.price}
30 DAY SOLD VOLUME: ${productData.soldVolume || 'Unknown (Estimate based on niche)'}
CONDITION: ${productData.condition || 'New'}
SUPPLIER NAME: ${productData.supplierName || 'Unknown'}
SUPPLIER COST: ${productData.supplierCost || 'Unknown'}

## Output Kuralları
- SADECE RAW JSON döndür. Markdown kullanma. JSON dışında hiçbir şey yazma.
- Kararsız kalma — kesin BUY veya SKIP kararı ver.
- Tahmini analiz gerekiyorsa mantıklı AI tahmini yap. Tüm alanları doldur.

## Output Format
{
  "decision": "BUY",
  "score": 85,
  "financials": { "estimatedEbayFee": 4.50, "estimatedAdFee": 1.50, "estimatedOperationalBuffer": 0.90, "netProfit": 6.20, "profitMargin": 22, "roi": 35 },
  "supplierCheck": { "status": "APPROVED", "supplierTrustScore": 90, "note": "Supplier-specific operational warning or recommendation." },
  "riskAnalysis": { "veroRisk": "LOW", "competitionRisk": "LOW", "returnRisk": "LOW", "policyRisk": "LOW", "reason": "Primary risk explanation." },
  "policyRisk": { "dropShippingRisk": "LOW", "trackingRisk": "LOW", "invoiceRisk": "LOW", "accountSafetyScore": 82 },
  "marketAnalysis": { "competitionLevel": "LOW", "marketSaturation": 72, "priceWarRisk": "LOW", "estimatedSellThroughRate": 38, "chineseSellerDominance": "LOW" },
  "trendAnalysis": { "momentum": "RISING", "seasonality": "EVERGREEN", "q4Potential": true, "viralPotential": 68, "trendStrength": 74 },
  "shippingAnalysis": { "complexity": "LOW", "fragile": false, "battery": false, "oversized": false, "customsRisk": "LOW" },
  "seoAnalysis": { "keywordStrength": 81, "clickabilityScore": 74, "recommendedKeywords": ["portable", "wireless", "fast charging"] },
  "returnRisk": { "level": "LOW", "reason": "Return risk explanation." },
  "confidence": { "overall": 88, "dataQuality": 91, "predictionConfidence": 84, "marketConfidence": 79 },
  "aiReasoning": [ "Strong sell-through velocity detected", "Low VeRO exposure" ],
  "pricingSimulation": [ { "price": 24.99, "profit": 3.10, "roi": 18 } ],
  "optimizations": { "seoTitle": "SEO optimized title", "suggestedPrice": 29.99, "bulletPoints": ["Feature 1"] },
  "listingAssets": { "optimizedDescription": "Professional description.", "recommendedCategory": "Home", "itemSpecifics": { "Brand": "Generic" } }
}`;

    return withRetry(
      async (modelId) => {
        const { getCline } = await import('./cline');
        const response = await getCline().chat.completions.create({
          model: modelId || "nousresearch/hermes-3-llama-3.1-405b:free",
          messages: [
            { role: 'system', content: PROMPT }
          ],
          temperature: 0.7
        });

        const content = response.choices[0]?.message?.content || '';
        if (!content) throw new Error("No content received from AI");

        const parsed = JSON.parse(extractJSON(content));
        return parsed as EbayDetailedAnalysis;
      },
      { maxRetries: 1, baseDelayMs: 500 }
    );
  }
}
