import { getCline } from '../ai/cline';
import { fetchInternetDataViaTool } from '../ai/consensus';

export class EtsyService {
  private apiKey: string;
  private sharedSecret: string;
  private baseUrl = 'https://openapi.etsy.com/v3';

  constructor() {
    // No API keys needed, moving to pure AI research
  }

  async searchProducts(keyword: string, limit: number = 3) {
    console.log(`[EtsyService] Starting AI-driven research for: ${keyword}`);
    return this.searchProductsAI(keyword, limit);
  }

  /**
   * AI-powered research using the existing n8n search tool and OpenRouter.
   */
  private async searchProductsAI(keyword: string, limit: number = 3) {
    try {
      // 1. Search Etsy via existing n8n search tool
      const internetContext = await fetchInternetDataViaTool(`site:etsy.com ${keyword} products`);

      if (!internetContext) {
        throw new Error("No search context returned from internet tool");
      }

      // 2. Extract product details using AI (DeepSeek R1 prioritized)
      const cline = getCline();
      const prompt = `
        You are an Etsy product analyst. Using the LIVE INTERNET DATA below, extract the top ${limit} unique product listings for "${keyword}".
        
        ${internetContext}

        For each product, provide:
        - listingId (extract from URL or generate unique ID)
        - title
        - price (number only)
        - currency (3-letter code)
        - views (estimate or 0)
        - favorites (estimate or 0)
        - url
        - tags (keywords)
        - shopName
        - imageUrl (null if not found)

        Return ONLY a JSON array of objects.
      `;

      const response = await cline.chat.completions.create({
        model: 'deepseek/deepseek-r1:free',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1
      });

      const content = response.choices[0]?.message?.content || '[]';
      const cleaned = content.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
      const products = JSON.parse(cleaned);

      return products.map((p: any) => ({
        listingId: p.listingId?.toString() || Math.random().toString(36).substring(7),
        title: p.title || 'Unknown Product',
        price: Number(p.price) || 0,
        currency: p.currency || 'USD',
        views: Number(p.views) || 0,
        favorites: Number(p.favorites) || 0,
        url: p.url || '',
        tags: Array.isArray(p.tags) ? p.tags : [],
        shopName: p.shopName || 'Etsy Shop',
        imageUrl: p.imageUrl || null
      }));

    } catch (error) {
      console.error("[EtsyService] AI Research failed:", error);
      return [];
    }
  }

  private formatListings(results: any[]) {
    return results.map(item => ({
      listingId: item.listing_id.toString(),
      title: item.title,
      price: item.price ? (item.price.amount / item.price.divisor) : 0,
      currency: item.price ? item.price.currency_code : 'USD',
      views: item.views,
      favorites: item.num_favorers,
      url: item.url,
      tags: item.tags || [],
      shopName: item.Shop?.shop_name,
      imageUrl: item.Images && item.Images.length > 0 ? item.Images[0].url_570xN : null
    }));
  }
}
