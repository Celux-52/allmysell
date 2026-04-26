/**
 * Multi-AI Consensus Engine + Real Google Trends + Real Supplier Links
 * 
 * 1. Queries ALL AI providers in parallel for product ideas
 * 2. Fetches REAL Google Trends data for each product
 * 3. Generates REAL, clickable supplier search URLs
 * 4. Merges and ranks everything into a consensus result
 */

import { getGoogleTrendsData, buildSupplierLinks, type GoogleTrendsData } from './google-trends';

interface SupplierLink {
  name: string;
  url: string;
}

interface ConsensusProduct {
  name: string;
  category: string;
  wholesalePrice: string;
  retailPrice: string;
  profitMargin: string;
  competition: string;
  trend: string;
  score: number;
  description: string;
  platforms: string[];
  whyItWorks: string;
  targetAudience: string;
  marketingTips: string[];
  sources: string[];
  suppliers: SupplierLink[];
  googleTrendsInsight: string;
  googleTrendsData: GoogleTrendsData | null;
}

export interface ConsensusResult {
  products: ConsensusProduct[];
  summary: string;
  aiProviders: string[];
  consensusMethod: string;
}

const RESEARCH_PROMPT = (query: string) => `You are a world-class e-commerce product research analyst.
The user is researching: "${query}"

CRITICAL INSTRUCTIONS:
1. Analyze this niche using your knowledge of current market data, Google Trends patterns, and e-commerce platforms.
2. Provide realistic wholesale and retail pricing based on actual market data.
3. Score each product 0-100 based on: demand (30%), margin (25%), competition (20%), trend momentum (15%), ease of sourcing (10%).
4. For each product, give a short keyword that best represents it for supplier searches (in the "searchKeyword" field).

Return ONLY valid JSON in this exact structure:
{
  "products": [
    {
      "name": "Product Name",
      "category": "Category",
      "searchKeyword": "exact product search term for suppliers",
      "wholesalePrice": "$X-Y",
      "retailPrice": "$X-Y",
      "profitMargin": "XX-XX%",
      "competition": "Low|Medium|High",
      "trend": "Rising|Stable|Declining",
      "score": 85,
      "description": "Detailed description",
      "platforms": ["eBay", "Etsy", "Amazon", "Shopify"],
      "whyItWorks": "Deep market analysis",
      "targetAudience": "Specific target demographic",
      "marketingTips": ["Actionable tip 1", "Tip 2", "Tip 3"],
      "sources": ["Data source 1", "Source 2"]
    }
  ],
  "summary": "Comprehensive market overview"
}

Return 4-6 products. ONLY return valid JSON.`;

function safeParseJSON(text: string): any {
  try {
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

async function queryGroq(query: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getGroq } = await import('./groq');
    const groq = getGroq();
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query) },
        { role: 'user', content: query }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });
    const text = response.choices[0]?.message?.content || '{}';
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] Groq failed:', err.message);
    return null;
  }
}

async function queryGemini(query: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getGemini } = await import('./gemini');
    const gemini = getGemini();
    const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(RESEARCH_PROMPT(query));
    const text = result.response.text();
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] Gemini failed:', err.message);
    return null;
  }
}

async function queryCline(query: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getCline } = await import('./cline');
    const cline = getCline();
    const response = await cline.chat.completions.create({
      model: 'cline-free',
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const text = response.choices[0]?.message?.content || '{}';
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] Cline failed:', err.message);
    return null;
  }
}

/**
 * Merge AI results, then enrich with REAL Google Trends data and REAL supplier links
 */
async function mergeAndEnrich(
  allResults: Array<{ products: any[]; summary: string } | null>, 
  providers: string[],
  query: string
): Promise<ConsensusResult> {
  const activeProviders: string[] = [];
  const allProducts: any[] = [];
  const summaries: string[] = [];

  allResults.forEach((result, i) => {
    if (result && result.products && Array.isArray(result.products)) {
      activeProviders.push(providers[i]);
      allProducts.push(...result.products);
      if (result.summary) summaries.push(result.summary);
    }
  });

  if (allProducts.length === 0) {
    return {
      products: [],
      summary: 'All AI providers failed to return results. Please try again.',
      aiProviders: [],
      consensusMethod: 'none',
    };
  }

  // Group similar products by normalized name
  const productMap = new Map<string, any[]>();
  for (const p of allProducts) {
    if (!p.name) continue;
    const key = p.name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
    if (!productMap.has(key)) productMap.set(key, []);
    productMap.get(key)!.push(p);
  }

  // Merge duplicates and average scores
  const mergedRaw: any[] = [];
  for (const [, group] of productMap) {
    const base = group[0];
    const avgScore = Math.round(group.reduce((sum: number, p: any) => sum + (p.score || 70), 0) / group.length);

    const allSources = new Set<string>();
    group.forEach((p: any) => { if (p.sources) p.sources.forEach((s: string) => allSources.add(s)); });

    const allTips = new Set<string>();
    group.forEach((p: any) => { if (p.marketingTips) p.marketingTips.forEach((t: string) => allTips.add(t)); });

    mergedRaw.push({
      name: base.name,
      searchKeyword: base.searchKeyword || base.name,
      category: base.category || 'General',
      wholesalePrice: base.wholesalePrice || 'N/A',
      retailPrice: base.retailPrice || 'N/A',
      profitMargin: base.profitMargin || 'N/A',
      competition: base.competition || 'Medium',
      trend: base.trend || 'Stable',
      score: Math.min(avgScore + (group.length > 1 ? 5 : 0), 100),
      description: base.description || '',
      platforms: [...new Set(group.flatMap((p: any) => p.platforms || []))],
      whyItWorks: base.whyItWorks || '',
      targetAudience: base.targetAudience || '',
      marketingTips: [...allTips].slice(0, 5),
      sources: [...allSources].slice(0, 5),
    });
  }

  // Sort by score
  mergedRaw.sort((a, b) => b.score - a.score);
  const topProducts = mergedRaw.slice(0, 8);

  // ENRICH: Fetch real Google Trends data for each product (in parallel, max 4)
  const enrichPromises = topProducts.slice(0, 4).map(async (product) => {
    const keyword = product.searchKeyword || product.name;
    const trendsData = await getGoogleTrendsData(keyword);
    return { product, trendsData };
  });

  // For products 5+, skip Google Trends (to avoid rate limiting)
  const enrichedResults = await Promise.allSettled(enrichPromises);
  const trendsMap = new Map<string, GoogleTrendsData | null>();
  
  enrichedResults.forEach((result) => {
    if (result.status === 'fulfilled') {
      trendsMap.set(result.value.product.name, result.value.trendsData);
    }
  });

  // Build final products with REAL supplier links and REAL Google Trends data
  const finalProducts: ConsensusProduct[] = topProducts.map((product) => {
    const keyword = product.searchKeyword || product.name;
    const realSuppliers = buildSupplierLinks(keyword);
    const realTrends = trendsMap.get(product.name) || null;

    // Build Google Trends insight from real data
    let googleTrendsInsight = 'Google Trends data not available for this product.';
    if (realTrends) {
      googleTrendsInsight = realTrends.summary;
      // Override AI trend direction with real Google Trends direction
      if (realTrends.trendDirection === 'rising') product.trend = 'Rising';
      else if (realTrends.trendDirection === 'declining') product.trend = 'Declining';
      else product.trend = 'Stable';
    }

    return {
      name: product.name,
      category: product.category,
      wholesalePrice: product.wholesalePrice,
      retailPrice: product.retailPrice,
      profitMargin: product.profitMargin,
      competition: product.competition,
      trend: product.trend,
      score: product.score,
      description: product.description,
      platforms: product.platforms,
      whyItWorks: product.whyItWorks,
      targetAudience: product.targetAudience,
      marketingTips: product.marketingTips,
      sources: product.sources,
      suppliers: realSuppliers,
      googleTrendsInsight,
      googleTrendsData: realTrends,
    };
  });

  const combinedSummary = summaries.length > 1
    ? `Cross-AI Consensus (${activeProviders.join(' + ')}): ${summaries[0]}`
    : summaries[0] || 'Analysis complete.';

  return {
    products: finalProducts,
    summary: combinedSummary,
    aiProviders: activeProviders,
    consensusMethod: activeProviders.length > 1 ? 'multi-ai-consensus' : 'single-provider',
  };
}

/**
 * Main consensus research function.
 * 1. Fires all AI providers in parallel
 * 2. Merges their product suggestions
 * 3. Enriches with REAL Google Trends data
 * 4. Attaches REAL, clickable supplier links
 */
export async function consensusResearch(query: string): Promise<ConsensusResult> {
  const providers = ['Groq (Llama 3.3 70B)', 'Gemini 2.0 Flash', 'Cline AI'];

  const [groqResult, geminiResult, clineResult] = await Promise.allSettled([
    queryGroq(query),
    queryGemini(query),
    queryCline(query),
  ]);

  const results = [
    groqResult.status === 'fulfilled' ? groqResult.value : null,
    geminiResult.status === 'fulfilled' ? geminiResult.value : null,
    clineResult.status === 'fulfilled' ? clineResult.value : null,
  ];

  return mergeAndEnrich(results, providers, query);
}
