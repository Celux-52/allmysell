/**
 * Real Google Trends Integration
 * Uses google-trends-api to fetch actual trending data for products/niches
 */

// @ts-ignore - no types for google-trends-api
import googleTrends from 'google-trends-api';

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
 */
export async function getGoogleTrendsData(keyword: string): Promise<GoogleTrendsData | null> {
  try {
    // Interest over time - last 12 months
    const interestRes = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      endTime: new Date(),
      geo: '',  // Worldwide
    });

    const interestData = JSON.parse(interestRes);
    const timeline = interestData?.default?.timelineData || [];

    const interestOverTime = timeline.map((item: any) => ({
      date: item.formattedTime || '',
      value: item.value?.[0] || 0,
    }));

    // Calculate trend metrics
    const values = interestOverTime.map((d: any) => d.value);
    const averageInterest = values.length > 0 ? Math.round(values.reduce((a: number, b: number) => a + b, 0) / values.length) : 0;
    const peakInterest = values.length > 0 ? Math.max(...values) : 0;

    // Determine trend direction: compare last 3 months avg vs previous 3 months
    let trendDirection: 'rising' | 'stable' | 'declining' = 'stable';
    if (values.length >= 6) {
      const recent = values.slice(-3).reduce((a: number, b: number) => a + b, 0) / 3;
      const earlier = values.slice(-6, -3).reduce((a: number, b: number) => a + b, 0) / 3;
      if (recent > earlier * 1.15) trendDirection = 'rising';
      else if (recent < earlier * 0.85) trendDirection = 'declining';
    }

    // Related queries
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
      // Related queries might fail, that's ok
    }

    const summary = `Google Trends: "${keyword}" has an average interest of ${averageInterest}/100 over the last 12 months (peak: ${peakInterest}/100). Trend is ${trendDirection}. ${
      risingQueries.length > 0 ? `Rising related searches: ${risingQueries.slice(0, 3).join(', ')}.` : ''
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
    console.error('[GoogleTrends] Failed to fetch data for:', keyword, err.message);
    return null;
  }
}

/**
 * Build real, clickable supplier search URLs for a product keyword.
 */
export function buildSupplierLinks(productName: string): { name: string; url: string }[] {
  const encoded = encodeURIComponent(productName);
  return [
    {
      name: `AliExpress Search: "${productName}"`,
      url: `https://www.aliexpress.com/wholesale?SearchText=${encoded}`,
    },
    {
      name: `Alibaba Wholesale: "${productName}"`,
      url: `https://www.alibaba.com/trade/search?SearchText=${encoded}`,
    },
    {
      name: `DHgate: "${productName}"`,
      url: `https://www.dhgate.com/wholesale/search.do?searchkey=${encoded}`,
    },
    {
      name: `CJ Dropshipping: "${productName}"`,
      url: `https://cjdropshipping.com/search.html?key=${encoded}`,
    },
    {
      name: `1688.com (China): "${productName}"`,
      url: `https://s.1688.com/selloffer/offer_search.htm?keywords=${encoded}`,
    },
    {
      name: `Google Trends: "${productName}"`,
      url: `https://trends.google.com/trends/explore?q=${encoded}`,
    },
  ];
}
