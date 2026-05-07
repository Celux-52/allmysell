import { getCline } from '../ai/cline';
import { fetchInternetDataViaTool } from '../ai/consensus';

export class EtsyService {
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
      console.log(`[EtsyService] Searching for: "${keyword}" using broader query...`);
      // 1. Search Etsy via existing n8n search tool (Broader query)
      const internetContext = await fetchInternetDataViaTool(`etsy products ${keyword}`);

      if (!internetContext || internetContext.length < 50) {
        console.warn(`[EtsyService] Insufficient search context returned for: ${keyword}`);
        return [];
      }

      console.log(`[EtsyService] Context received. Extracting with Gemini 2.0 Flash (Fast)...`);

      // 2. Extract product details using a FAST model (Gemini 2.0 Flash) to avoid Vercel 10s timeout
      const cline = getCline();
      const prompt = `
        Using the LIVE INTERNET DATA below, extract the top ${limit} unique Etsy product listings for "${keyword}".
        
        ${internetContext}

        For each product, provide:
        - listingId (extract from URL or generate unique ID)
        - title
        - price (number only)
        - currency (3-letter code)
        - views (estimate or 0)
        - favorites (estimate or 0)
        - url (MUST be a valid Etsy URL)
        - tags (keywords)
        - shopName
        - imageUrl (null if not found)

        Return ONLY a JSON array of objects. No reasoning text.
      `;

      const response = await cline.chat.completions.create({
        model: 'google/gemini-2.0-flash-001', // Super fast, avoids Vercel timeout
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1
      });

      const content = response.choices[0]?.message?.content || '[]';
      const cleaned = content.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
      
      let products = [];
      try {
        products = JSON.parse(cleaned);
      } catch (parseError) {
        console.error(`[EtsyService] Extraction failed to parse JSON:`, content);
        return [];
      }

      console.log(`[EtsyService] Successfully extracted ${products.length} products`);
      return products.map((p: any) => ({
        listingId: p.listingId?.toString() || Math.random().toString(36).substring(7),
        title: p.title || 'Unknown Product',
        price: parseFloat(p.price) || 0,
        currency: p.currency || 'USD',
        views: parseInt(p.views) || 0,
        favorites: parseInt(p.favorites) || 0,
        url: p.url || 'https://www.etsy.com',
        tags: Array.isArray(p.tags) ? p.tags : [],
        imageUrl: p.imageUrl || null,
        shopName: p.shopName || 'Etsy Shop'
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
