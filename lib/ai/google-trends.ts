/**
 * Real Google Trends Integration
 * Uses google-trends-api to fetch actual trending data for products/niches.
 * Designed to NEVER throw — all errors return null gracefully.
 */

export interface GoogleTrendsData {
  interestOverTime: { date: string; value: number }[];
  relatedQueries: string[];
  risingQueries: string[];
  averageInterest: number;
  peakInterest: number;
  trendDirection: 'rising' | 'stable' | 'declining';
  summary: string;
}

/**
 * Fetch real Google Trends interest-over-time data for a keyword.
 * NEVER throws — returns null on any error.
 */
export async function getGoogleTrendsData(keyword: string): Promise<GoogleTrendsData | null> {
  try {
    // Dynamic import to avoid build-time issues (server-only module)
    // @ts-ignore: Could not find a declaration file for module 'google-trends-api'
    const googleTrends = (await import('google-trends-api')).default || (await import('google-trends-api'));

    // Interest over time - last 12 months
    let interestOverTime: { date: string; value: number }[] = [];
    let values: number[] = [];

    try {
      const interestRes = await googleTrends.interestOverTime({
        keyword,
        startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endTime: new Date(),
        geo: '',
      });

      const interestData = JSON.parse(interestRes);
      const timeline = interestData?.default?.timelineData || [];

      interestOverTime = timeline.map((item: any) => ({
        date: item.formattedTime || '',
        value: item.value?.[0] || 0,
      }));

      values = interestOverTime.map((d) => d.value);
    } catch (e: any) {
      console.warn(`[GoogleTrends] interestOverTime failed for "${keyword}":`, e.message);
    }

    // Calculate trend metrics
    const averageInterest = values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;
    const peakInterest = values.length > 0 ? Math.max(...values) : 0;

    // Determine trend direction
    let trendDirection: 'rising' | 'stable' | 'declining' = 'stable';
    if (values.length >= 6) {
      const recent = values.slice(-3).reduce((a, b) => a + b, 0) / 3;
      const earlier = values.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
      if (earlier > 0) {
        if (recent > earlier * 1.15) trendDirection = 'rising';
        else if (recent < earlier * 0.85) trendDirection = 'declining';
      }
    }

    // Related queries (separate try-catch so it doesn't kill the whole thing)
    let relatedQueries: string[] = [];
    let risingQueries: string[] = [];
    try {
      const relatedRes = await googleTrends.relatedQueries({ keyword });
      const relatedData = JSON.parse(relatedRes);
      const topQueries = relatedData?.default?.rankedList?.[0]?.rankedKeyword || [];
      const risingQs = relatedData?.default?.rankedList?.[1]?.rankedKeyword || [];
      relatedQueries = topQueries.slice(0, 8).map((q: any) => q.query);
      risingQueries = risingQs.slice(0, 8).map((q: any) => q.query);
    } catch {
      // Related queries can fail, that's ok
    }

    // If we got literally zero data, return null
    if (averageInterest === 0 && relatedQueries.length === 0 && risingQueries.length === 0) {
      return null;
    }

    const summary = `Google Trends: "${keyword}" has an average interest of ${averageInterest}/100 over the last 12 months (peak: ${peakInterest}/100). Trend is ${trendDirection}.${
      risingQueries.length > 0 ? ` Rising related searches: ${risingQueries.slice(0, 3).join(', ')}.` : ''
    }`;

    return {
      interestOverTime,
      relatedQueries,
      risingQueries,
      averageInterest,
      peakInterest,
      trendDirection,
      summary,
    };
  } catch (err: any) {
    console.warn('[GoogleTrends] Complete failure for:', keyword, err.message);
    return null;
  }
}

/**
 * Build real, clickable supplier search URLs for a product keyword.
 * ALL suppliers ship to the USA — filtered by US warehouse / US shipping.
 */
export function buildSupplierLinks(productName: string): { name: string; url: string }[] {
  const encoded = encodeURIComponent(productName);
  return [
    {
      name: `AliExpress (US Warehouse) — "${productName}"`,
      url: `https://www.aliexpress.com/wholesale?SearchText=${encoded}&shipFromCountry=US&SortType=total_tranpro_desc`,
    },
    {
      name: `AliExpress (Ships to US) — "${productName}"`,
      url: `https://www.aliexpress.com/wholesale?SearchText=${encoded}&shipToCountry=US&SortType=total_tranpro_desc`,
    },
    {
      name: `Amazon Wholesale — "${productName}"`,
      url: `https://www.amazon.com/s?k=${encoded}&ref=nb_sb_noss`,
    },
    {
      name: `CJ Dropshipping (US Warehouse) — "${productName}"`,
      url: `https://cjdropshipping.com/search.html?key=${encoded}&warehouse=US`,
    },
    {
      name: `Alibaba (US Verified) — "${productName}"`,
      url: `https://www.alibaba.com/trade/search?SearchText=${encoded}&country=US`,
    },
    {
      name: `Temu (US Shipping) — "${productName}"`,
      url: `https://www.temu.com/search_result.html?search_key=${encoded}`,
    },
    {
      name: `DHgate (Ships to US) — "${productName}"`,
      url: `https://www.dhgate.com/wholesale/search.do?searchkey=${encoded}&shipcountry=us`,
    },
    {
      name: `Google Trends — View Live Data`,
      url: `https://trends.google.com/trends/explore?q=${encoded}&geo=US`,
    },
  ];
}

export function buildCompetitorLinks(productName: string): { platform: string; url: string; note: string }[] {
  const encoded = encodeURIComponent(productName);
  return [
    { platform: 'Amazon', url: `https://www.amazon.com/s?k=${encoded}`, note: 'Check Bestseller tags and review counts' },
    { platform: 'eBay', url: `https://www.ebay.com/sch/i.html?_nkw=${encoded}&LH_Sold=1`, note: 'View recently sold items and prices' },
    { platform: 'Etsy', url: `https://www.etsy.com/search?q=${encoded}`, note: 'Analyze personalized and premium options' },
  ];
}
