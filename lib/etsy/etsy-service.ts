export class EtsyService {
  private apiKey: string;
  private sharedSecret: string;
  private baseUrl = 'https://openapi.etsy.com/v3';

  constructor() {
    this.apiKey = process.env.ETSY_API_KEY || '';
    this.sharedSecret = process.env.ETSY_SHARED_SECRET || '';
  }

  async searchProducts(keyword: string, limit: number = 5) {
    if (!this.apiKey) throw new Error("Etsy API Key is not set");

    try {
      const response = await fetch(`${this.baseUrl}/application/listings/active?keywords=${encodeURIComponent(keyword)}&limit=${limit}&includes=Images,Shop`, {
        headers: {
          'x-api-key': `${this.apiKey}:${this.sharedSecret}`
        }
      });

      if (!response.ok) {
        throw new Error(`Etsy API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.formatListings(data.results);
    } catch (error) {
      console.error("Error fetching from Etsy:", error);
      throw error;
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
