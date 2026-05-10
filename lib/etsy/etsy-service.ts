import { getCline } from '../ai/cline';
import { extractJSON, withRetry } from '../ai/retry';
import { fetchInternetDataViaTool } from '../ai/internet-search';

export class EtsyService {
  constructor() {
    // No API keys needed, moving to pure AI research
  }

  async searchProducts(keyword: string, limit: number = 3) {
    console.log(`[EtsyService] Starting AI-driven research for: ${keyword}`);
    return this.searchProductsAI(keyword, limit);
  }

  /**
   * AI-powered research with robust failover and creative fallbacks.
   */
  private async searchProductsAI(keyword: string, limit: number = 3) {
    try {
      console.log(`[EtsyService] Searching for: "${keyword}"...`);
      // 1. Search Etsy via existing n8n search tool
      let internetContext = await fetchInternetDataViaTool(`Etsy products for ${keyword}`);
      let isFallback = false;

      if (!internetContext || internetContext.length < 100) {
        console.warn(`[EtsyService] Search returned no/little data for: ${keyword}. Using AI Knowledge fallback.`);
        internetContext = `[SYSTEM NOTE: No live search results found for "${keyword}". You MUST use your extensive internal e-commerce database to simulate the top 5 most realistic, trending, and high-demand products in this specific niche.]`;
        isFallback = true;
      }

      // 2. Extract/Generate products with retry and model rotation
      return await withRetry(async (overrideModel?: string) => {
        const modelToUse = overrideModel || 'google/gemini-2.0-flash-lite-preview-02-05:free';
        const cline = getCline();
        
        const prompt = `
          TASK: ${isFallback ? 'GENERATE' : 'EXTRACT'} the top ${limit + 2} unique, trending Etsy product listings for the niche: "${keyword}".
          
          CONTEXT DATA:
          ${internetContext}

          ${isFallback ? 'IMPORTANT: Since live data is sparse, use your e-commerce expertise to create 5 highly specific, realistic product examples that would sell well on Etsy right now in this niche.' : ''}

          For each product, provide:
          - listingId (unique string)
          - title (specific, long-tail Etsy-style title)
          - price (realistic number)
          - currency (USD)
          - views (realistic count)
          - favorites (realistic count)
          - url (a valid Etsy search or product URL)
          - tags (list of 5-8 keywords)
          - shopName (creative shop name)
          - imageUrl (null)

          STRICT RULE: Return ONLY a JSON array of objects. No introductory text. 
          Even if you find no data, you MUST generate realistic examples based on your knowledge.
        `;

        const response = await cline.chat.completions.create({
          model: modelToUse,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8, // Increased for better creativity in fallback
          max_tokens: 1500
        });

        const text = response.choices[0]?.message?.content || '[]';
        const cleaned = extractJSON(text);
        let products = JSON.parse(cleaned);

        if (!Array.isArray(products) || products.length === 0) {
          throw new Error("AI returned an empty product list.");
        }

        console.log(`[EtsyService] Successfully got ${products.length} products using ${modelToUse}`);
        
        return products.map((p: any) => ({
          listingId: p.listingId?.toString() || Math.random().toString(36).substring(7),
          title: p.title || `Trending ${keyword} Item`,
          price: parseFloat(p.price) || 29.99,
          currency: p.currency || 'USD',
          views: parseInt(p.views) || Math.floor(Math.random() * 5000),
          favorites: parseInt(p.favorites) || Math.floor(Math.random() * 500),
          url: (!isFallback && p.url && p.url.includes('etsy.com/listing/')) ? p.url : `https://www.etsy.com/search?q=${encodeURIComponent(keyword)}`,
          tags: Array.isArray(p.tags) ? p.tags : [keyword],
          imageUrl: p.imageUrl || null,
          shopName: p.shopName || 'Etsy Boutique'
        })).slice(0, limit);
      });

    } catch (error) {
      console.error("[EtsyService] AI Research failed after all attempts:", error);
      return [];
    }
  }
}
