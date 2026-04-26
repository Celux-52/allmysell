/**
 * Multi-AI Consensus Engine + Real Google Trends + Real Supplier Links
 * 
 * Uses 5 independent AI providers in parallel:
 *   1. Groq (Llama 3.3 70B)
 *   2. Gemini 2.0 Flash
 *   3. Cline - DeepSeek R1 (best reasoning)
 *   4. Cline - Qwen 3 72B
 *   5. Cline - Llama 4 Scout 17B
 * 
 * Then enriches with REAL Google Trends data and REAL clickable supplier URLs.
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

async function searchWithTavily(query: string) {
    if (!process.env.TAVILY_API_KEY) return "";
    try {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: process.env.TAVILY_API_KEY,
                query: `trending e-commerce products wholesale retail margins competition for: ${query}`,
                search_depth: "basic",
                max_results: 5
            })
        });
        const data = await response.json();
        if (data && data.results) {
            const results = data.results.map((r: any) => `Source: ${r.url}\nContent: ${r.content}`).join('\n\n');
            return `\n\n--- LIVE INTERNET DATA ---\nThe following is real-time web search data for this query. You MUST base your analysis, prices, and trends on this data whenever possible:\n${results}\n---------------------------\n\n`;
        }
        return "";
    } catch (e) {
        console.error("Tavily search failed", e);
        return "";
    }
}

const RESEARCH_PROMPT = (query: string, internetContext: string = "") => `You are a world-class e-commerce product research analyst.
The user is researching: "${query}"${internetContext}

CRITICAL INSTRUCTIONS:
1. Analyze this niche using your knowledge of current market data, Google Trends patterns, and e-commerce platforms.
2. Provide realistic wholesale and retail pricing based on actual market data.
3. Score each product 0-100 based on: demand (30%), margin (25%), competition (20%), trend momentum (15%), ease of sourcing (10%).
4. For each product, give a short keyword that best represents it for supplier searches (in the "searchKeyword" field).
5. For "painPoint", "sellingAngle", and "viralPotential": write MAX 1 short sentence each. Be specific, no fluff.

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
      "targetAudience": "Specific target demographic (e.g. Women 18-30 interested in fitness)",
      "painPoint": "What problem does the buyer have? (1 line max)",
      "sellingAngle": "Best ad/content angle to sell this (1 line max)",
      "viralPotential": "Why could this go viral on social media? (1 line max)",
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

// --- Provider 1: Groq (Llama 3.3 70B) ---
async function queryGroq(query: string, internetContext: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getGroq } = await import('./groq');
    const groq = getGroq();
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext) },
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

// --- Provider 2: Gemini 2.0 Flash ---
async function queryGemini(query: string, internetContext: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getGemini } = await import('./gemini');
    const gemini = getGemini();
    const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(RESEARCH_PROMPT(query, internetContext));
    const text = result.response.text();
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] Gemini failed:', err.message);
    return null;
  }
}

// --- Provider 3: Cline - DeepSeek R1 (Best Reasoning) ---
async function queryDeepSeek(query: string, internetContext: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getCline } = await import('./cline');
    const cline = getCline();
    const response = await cline.chat.completions.create({
      model: 'deepseek-r1',
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const text = response.choices[0]?.message?.content || '{}';
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] DeepSeek R1 failed:', err.message);
    return null;
  }
}

// --- Provider 4: Cline - Qwen 3 72B ---
async function queryQwen(query: string, internetContext: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getCline } = await import('./cline');
    const cline = getCline();
    const response = await cline.chat.completions.create({
      model: 'qwen-3-72b-instruct',
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const text = response.choices[0]?.message?.content || '{}';
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] Qwen 3 failed:', err.message);
    return null;
  }
}

// --- Provider 5: Cline - Llama 4 Scout ---
async function queryLlamaScout(query: string, internetContext: string): Promise<{ products: any[]; summary: string } | null> {
  try {
    const { getCline } = await import('./cline');
    const cline = getCline();
    const response = await cline.chat.completions.create({
      model: 'llama-4-scout-17b',
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const text = response.choices[0]?.message?.content || '{}';
    return safeParseJSON(text);
  } catch (err: any) {
    console.warn('[Consensus] Llama 4 Scout failed:', err.message);
    return null;
  }
}

/**
 * Merge AI results, then enrich with REAL Google Trends data and REAL supplier links
 */
async function mergeAndEnrich(
  allResults: Array<{ products: any[]; summary: string } | null>,
  providers: string[]
): Promise<ConsensusResult> {
  const activeProviders: string[] = [];
  const allProducts: any[] = [];
  const summaries: string[] = [];

  allResults.forEach((result, i) => {
    if (result && result.products && Array.isArray(result.products) && result.products.length > 0) {
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

    // Products recommended by more AI providers get higher consensus bonus
    const consensusBonus = Math.min((group.length - 1) * 3, 10);

    mergedRaw.push({
      name: base.name,
      searchKeyword: base.searchKeyword || base.name,
      category: base.category || 'General',
      wholesalePrice: base.wholesalePrice || 'N/A',
      retailPrice: base.retailPrice || 'N/A',
      profitMargin: base.profitMargin || 'N/A',
      competition: base.competition || 'Medium',
      trend: base.trend || 'Stable',
      score: Math.min(avgScore + consensusBonus, 100),
      description: base.description || '',
      platforms: [...new Set(group.flatMap((p: any) => p.platforms || []))],
      whyItWorks: base.whyItWorks || '',
      targetAudience: base.targetAudience || '',
      marketingTips: [...allTips].slice(0, 5),
      sources: [...allSources].slice(0, 5),
      agreedByCount: group.length,
    });
  }

  // Sort by score
  mergedRaw.sort((a, b) => b.score - a.score);
  const topProducts = mergedRaw.slice(0, 8);

  // ENRICH: Fetch real Google Trends data for top products (max 4 to avoid rate limiting)
  const trendsMap = new Map<string, GoogleTrendsData | null>();
  
  for (let i = 0; i < Math.min(topProducts.length, 4); i++) {
    const keyword = topProducts[i].searchKeyword || topProducts[i].name;
    try {
      const trendsData = await getGoogleTrendsData(keyword);
      trendsMap.set(topProducts[i].name, trendsData);
    } catch (err: any) {
      console.warn(`[GoogleTrends] Failed for "${keyword}":`, err.message);
      trendsMap.set(topProducts[i].name, null);
    }
    // Small delay between requests to avoid rate limiting
    if (i < 3) await new Promise(r => setTimeout(r, 300));
  }

  // Build final products with REAL supplier links and REAL Google Trends
  const finalProducts: ConsensusProduct[] = topProducts.map((product) => {
    const keyword = product.searchKeyword || product.name;
    const realSuppliers = buildSupplierLinks(keyword);
    const realTrends = trendsMap.get(product.name) || null;

    let googleTrendsInsight = 'Google Trends data was not available for this product.';
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

  // Build consensus summary
  const providerList = activeProviders.join(', ');
  const combinedSummary = activeProviders.length > 1
    ? `🧠 Cross-AI Consensus from ${activeProviders.length} providers (${providerList}): ${summaries[0] || 'Analysis complete.'}`
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
 * Fires 5 AI providers in parallel, merges, enriches with Google Trends + real supplier links.
 */
export async function consensusResearch(query: string): Promise<ConsensusResult> {
  const providers = [
    'Groq (Llama 3.3 70B)',
    'Gemini 2.0 Flash',
    'DeepSeek R1',
    'Qwen 3 72B',
    'Llama 4 Scout',
  ];

  // 1. Fetch live internet data via Tavily FIRST
  const internetContext = await searchWithTavily(query);

  // 2. Fire ALL 5 providers in parallel with the live internet context
  const settled = await Promise.allSettled([
    queryGroq(query, internetContext),
    queryGemini(query, internetContext),
    queryDeepSeek(query, internetContext),
    queryQwen(query, internetContext),
    queryLlamaScout(query, internetContext),
  ]);

  const results = settled.map(r => r.status === 'fulfilled' ? r.value : null);

  return mergeAndEnrich(results, providers);
}
