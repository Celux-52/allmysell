/**
 * Multi-AI Consensus Engine
 * Queries ALL available AI providers in parallel, then merges and ranks results.
 * Each provider contributes its analysis, and a final synthesis produces the best answer.
 */

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
  suppliers: string[];
  googleTrendsInsight: string;
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
1. Cross-reference Google Trends data — mention search volume trends, seasonal patterns, and geographic interest.
2. For EACH product, provide at least 3-4 real supplier sources (AliExpress links/stores, CJ Dropshipping, DHgate, 1688.com, Alibaba, specific supplier names).
3. Provide realistic wholesale and retail pricing based on actual market data.
4. Score each product 0-100 based on: demand (30%), margin (25%), competition (20%), trend momentum (15%), ease of sourcing (10%).

Return ONLY valid JSON in this exact structure:
{
  "products": [
    {
      "name": "Product Name",
      "category": "Category",
      "wholesalePrice": "$X-Y",
      "retailPrice": "$X-Y",
      "profitMargin": "XX-XX%",
      "competition": "Low|Medium|High",
      "trend": "Rising|Stable|Declining",
      "score": 85,
      "description": "Detailed description of this product and its market position",
      "platforms": ["eBay", "Etsy", "Amazon", "Shopify"],
      "whyItWorks": "Deep market analysis of why this product has strong potential",
      "targetAudience": "Specific target demographic",
      "marketingTips": ["Actionable tip 1", "Tip 2", "Tip 3"],
      "sources": ["Real data source URL 1", "Source 2"],
      "suppliers": ["Supplier 1 with platform (e.g. AliExpress - StoreName)", "Supplier 2", "Supplier 3", "Supplier 4"],
      "googleTrendsInsight": "Google Trends analysis: search volume trend, peak seasons, top regions"
    }
  ],
  "summary": "Comprehensive market overview with Google Trends context"
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
 * Merge products from multiple AI providers.
 * If the same product appears from multiple providers, average their scores and merge data.
 * Then sort by score descending.
 */
function mergeResults(allResults: Array<{ products: any[]; summary: string } | null>, providers: string[]): ConsensusResult {
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

  // Merge duplicates, average scores, combine suppliers
  const merged: ConsensusProduct[] = [];
  for (const [, group] of productMap) {
    const base = group[0];
    const avgScore = Math.round(group.reduce((sum: number, p: any) => sum + (p.score || 70), 0) / group.length);
    
    // Combine unique suppliers from all providers
    const allSuppliers = new Set<string>();
    group.forEach((p: any) => {
      if (p.suppliers) p.suppliers.forEach((s: string) => allSuppliers.add(s));
      // Also pull from platforms/sources if suppliers is empty
      if (!p.suppliers || p.suppliers.length === 0) {
        if (p.sources) p.sources.forEach((s: string) => allSuppliers.add(s));
      }
    });

    // Combine unique sources
    const allSources = new Set<string>();
    group.forEach((p: any) => {
      if (p.sources) p.sources.forEach((s: string) => allSources.add(s));
    });

    // Combine marketing tips
    const allTips = new Set<string>();
    group.forEach((p: any) => {
      if (p.marketingTips) p.marketingTips.forEach((t: string) => allTips.add(t));
    });

    merged.push({
      name: base.name,
      category: base.category || 'General',
      wholesalePrice: base.wholesalePrice || 'N/A',
      retailPrice: base.retailPrice || 'N/A',
      profitMargin: base.profitMargin || 'N/A',
      competition: base.competition || 'Medium',
      trend: base.trend || 'Stable',
      score: avgScore + (group.length > 1 ? 5 : 0), // Bonus for cross-provider agreement
      description: base.description || '',
      platforms: [...new Set(group.flatMap((p: any) => p.platforms || []))],
      whyItWorks: base.whyItWorks || '',
      targetAudience: base.targetAudience || '',
      marketingTips: [...allTips].slice(0, 5),
      sources: [...allSources].slice(0, 5),
      suppliers: [...allSuppliers].slice(0, 6),
      googleTrendsInsight: base.googleTrendsInsight || group.find((p: any) => p.googleTrendsInsight)?.googleTrendsInsight || 'Data pending',
    });
  }

  // Sort by score, cap at 100
  merged.sort((a, b) => b.score - a.score);
  merged.forEach(p => { if (p.score > 100) p.score = 100; });

  // Merge summaries
  const combinedSummary = summaries.length > 1
    ? `Cross-AI Consensus (${activeProviders.join(' + ')}): ${summaries[0]}` 
    : summaries[0] || 'Analysis complete.';

  return {
    products: merged.slice(0, 8), // Top 8 products
    summary: combinedSummary,
    aiProviders: activeProviders,
    consensusMethod: activeProviders.length > 1 ? 'multi-ai-consensus' : 'single-provider',
  };
}

/**
 * Main consensus research function.
 * Fires all AI providers in parallel and merges their results.
 */
export async function consensusResearch(query: string): Promise<ConsensusResult> {
  const providers = ['Groq (Llama 3.3 70B)', 'Gemini 2.0 Flash', 'Cline AI'];
  
  // Fire all providers in parallel
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

  return mergeResults(results, providers);
}
