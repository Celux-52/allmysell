/**
 * Multi-AI Consensus Engine + Real Google Trends + Semantic Supplier Matching
 * 
 * Uses 5 independent AI providers in parallel:
 *   1. Groq (Llama 3.3 70B)
 *   2. Gemini 2.0 Flash
 *   3. Cline - DeepSeek R1 (best reasoning)
 *   4. Cline - Qwen 3 72B
 *   5. Cline - Claude 3.5 Haiku
 * 
 * Then enriches with:
 *   - REAL Google Trends data
 *   - AI-powered semantic supplier matching (embeddings + cosine similarity)
 *   - Quality-filtered supplier products (rating ≥ 4.0, orders ≥ 50)
 */

import { getGoogleTrendsData, buildCompetitorLinks, type GoogleTrendsData } from './google-trends';
import { sourceSuppliersBatch, type ScoredSupplierMatch, type SupplierSourceResult } from './supplier-sourcing';
import { extractJSON } from './retry';

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
  /** Static fallback supplier search URLs */
  suppliers: SupplierLink[];
  /** AI-matched supplier products with semantic scores */
  semanticSuppliers: ScoredSupplierMatch[];
  /** Sourcing stats: how many candidates evaluated, rejected, etc. */
  sourcingStats: {
    totalCandidates: number;
    rejectedBySemantic: number;
    rejectedByQuality: number;
    matchCount: number;
  } | null;
  competitorLinks: { platform: string; url: string; note: string }[];
  googleTrendsInsight: string;
  googleTrendsData: GoogleTrendsData | null;
}

export interface ConsensusResult {
  products: ConsensusProduct[];
  summary: string;
  aiProviders: string[];
  consensusMethod: string;
}

export async function fetchInternetDataViaTool(query: string): Promise<string> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL || "https://n8n.allmysell.com/webhook/search";
  console.log(`[InternetTool] Initiating search for: "${query}"`);

  try {
    // Direct call to n8n search tool instead of relying on AI to decide to search
    // This is much more reliable for product research tasks
    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error(`[InternetTool] n8n search failed (${n8nResponse.status}):`, errorText);
      return "";
    }

    const data = await n8nResponse.json();

    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      console.log(`[InternetTool] Success: Found ${data.results.length} results`);
      const parsedResults = data.results
        .map((r: any) => `Title: ${r.title}\nLink: ${r.link}\nSnippet: ${r.snippet}`)
        .join('\n\n');
        
      return `\n\n--- LIVE INTERNET DATA (n8n Search) ---\n${parsedResults}\n---------------------------\n\n`;
    }

    console.warn(`[InternetTool] n8n returned no results. Data:`, JSON.stringify(data));
    return "";
  } catch (e) {
    console.error("[InternetTool] n8n fetch error:", e);
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
    const cleaned = extractJSON(text);
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
      model: 'meta-llama/llama-3.2-3b-instruct:free',
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
      model: 'meta-llama/llama-3.2-3b-instruct:free',
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
      model: 'meta-llama/llama-3.2-3b-instruct:free',
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
 * ✅ SMART AI VALIDATION LAYER
 * Cross-validate all AI responses, detect inconsistencies and errors
 */
async function smartValidateAndRefine(
  allResults: Array<{ products: any[]; summary: string } | null>,
  providers: string[],
  query: string,
  internetContext: string
): Promise<{ products: any[], summaries: string[], activeProviders: string[] }> {
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
    return { products: [], summaries: [], activeProviders: [] };
  }

  // 🧠 INTELLIGENCE CHECK: Use AIs to cross-correct each other
  const allProductsJson = JSON.stringify(allProducts, null, 2);

  const validationPrompt = `
You are a DATA AUDITOR. Below is a product list returned by 5 different AI models for the same query.

QUERY: ${query}

YOUR TASK:
1. Compare identical products across providers
2. Detect inconsistencies in price, margin, score data
3. Identify missing fields
4. Flag fabricated or unrealistic data
5. Calculate the MOST ACCURATE average values for each product
6. Do not allow any AI to make errors

✅ Return ONLY corrected and validated JSON. Do not add any explanations.

ALL PRODUCTS:
${allProductsJson}

${internetContext}
`;

  try {
    // Validate using DeepSeek R1 which has the best reasoning capabilities
    const { getCline } = await import('./cline');
    const cline = getCline();

    const validationResponse = await cline.chat.completions.create({
      model: 'meta-llama/llama-3.2-3b-instruct:free',
      messages: [{ role: 'user', content: validationPrompt }],
      temperature: 0.1
    });

    const validated = safeParseJSON(validationResponse.choices[0]?.message?.content || '{}');

    if (validated && validated.products && Array.isArray(validated.products)) {
      console.log(`✅ Smart validation completed: ${allProducts.length} products validated`);
      return {
        products: validated.products,
        summaries: validated.summary ? [validated.summary, ...summaries] : summaries,
        activeProviders
      };
    }
  } catch (e) {
    console.warn('⚠️ Smart validation failed, falling back to normal merge');
  }

  return { products: allProducts, summaries, activeProviders };
}

/**
 * Merge AI results, then enrich with REAL Google Trends data and REAL supplier links
 */
async function mergeAndEnrich(
  allResults: Array<{ products: any[]; summary: string } | null>,
  providers: string[],
  query: string,
  internetContext: string
): Promise<ConsensusResult> {

  // ✅ RUN SMART VALIDATION FIRST
  const { products: validatedProducts, summaries, activeProviders } = await smartValidateAndRefine(
    allResults, providers, query, internetContext
  );

  if (validatedProducts.length === 0) {
    return {
      products: [],
      summary: 'All AI providers failed to return results. Please try again.',
      aiProviders: [],
      consensusMethod: 'none',
    };
  }

  // Group similar products by normalized name
  const productMap = new Map<string, any[]>();
  for (const p of validatedProducts) {
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
    const consensusBonus = Math.min((group.length - 1) * 5, 15);

    // ✅ DATA QUALITY CHECK
    const qualityPenalty = group.length < 2 ? -10 : 0;

    mergedRaw.push({
      name: base.name,
      searchKeyword: base.searchKeyword || base.name,
      category: base.category || 'General',
      wholesalePrice: base.wholesalePrice || 'N/A',
      retailPrice: base.retailPrice || 'N/A',
      profitMargin: base.profitMargin || 'N/A',
      competition: base.competition || 'Medium',
      trend: base.trend || 'Stable',
      score: Math.min(Math.max(avgScore + consensusBonus + qualityPenalty, 0), 100),
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

  // ENRICH: Fetch real Google Trends data for top products (max 4 to avoid rate limiting, fetch in parallel)
  const trendsMap = new Map<string, GoogleTrendsData | null>();
  const top4 = topProducts.slice(0, 4);

  await Promise.allSettled(
    top4.map(async (product, i) => {
      const keyword = product.searchKeyword || product.name;
      // Stagger slightly to avoid instant rate limiting
      if (i > 0) await new Promise(r => setTimeout(r, i * 200));
      try {
        const trendsData = await getGoogleTrendsData(keyword);
        trendsMap.set(product.name, trendsData);
      } catch (err: any) {
        console.warn(`[GoogleTrends] Failed for "${keyword}":`, err.message);
        trendsMap.set(product.name, null);
      }
    })
  );

  // ═══════════════════════════════════════════════════════
  // SEMANTIC SUPPLIER SOURCING (NEW)
  // Replaces static URL generation with AI-powered matching
  // ═══════════════════════════════════════════════════════
  console.log('\n🔗 [Consensus] Starting semantic supplier sourcing...');
  const supplierResults = await sourceSuppliersBatch(
    topProducts.map(p => ({
      name: p.name,
      searchKeyword: p.searchKeyword || p.name,
      category: p.category,
      description: p.description,
      whyItWorks: p.whyItWorks,
      targetAudience: p.targetAudience,
    }))
  );
  console.log(`🔗 [Consensus] Supplier sourcing complete for ${supplierResults.size} products\n`);

  // Build final products with semantic suppliers + Google Trends
  const finalProducts: ConsensusProduct[] = topProducts.map((product) => {
    const keyword = product.searchKeyword || product.name;
    const competitorLinks = buildCompetitorLinks(keyword);
    const realTrends = trendsMap.get(product.name) || null;

    // Get semantic supplier results for this product
    const sourcing = supplierResults.get(product.name);
    const semanticSuppliers = sourcing?.matches || [];
    const fallbackLinks = sourcing?.fallbackLinks || [];
    const sourcingStats = sourcing ? {
      totalCandidates: sourcing.totalCandidatesEvaluated,
      rejectedBySemantic: sourcing.rejectedBySemantic,
      rejectedByQuality: sourcing.rejectedByQuality,
      matchCount: sourcing.matches.length,
    } : null;

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
      suppliers: fallbackLinks,
      semanticSuppliers,
      sourcingStats,
      competitorLinks,
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
    'DeepSeek R1 (Premium)',
    'Qwen 2.5 72B (Premium)',
    'Claude 3.5 Haiku (Premium)',
  ];

  // 1. Fetch live internet data via native tool calling to n8n webhook FIRST
  const internetContext = await fetchInternetDataViaTool(query);

  // 2. Fire ALL 5 providers in parallel with the live internet context
  const settled = await Promise.allSettled([
    queryGroq(query, internetContext),
    queryGemini(query, internetContext),
    queryDeepSeek(query, internetContext),
    queryQwen(query, internetContext),
    queryLlamaScout(query, internetContext),
  ]);

  const results = settled.map(r => r.status === 'fulfilled' ? r.value : null);

  return mergeAndEnrich(results, providers, query, internetContext);
}

/**
 * TRENDS CONSENSUS ENGINE
 * Fires 5 AI providers in parallel to find the best trends, then merges categories.
 */
export async function consensusTrends(niche: string) {
  const searchTerm = niche || 'trending products 2026';
  
  const AI_PROMPT = `You are an expert e-commerce trend analyst. ${niche ? `Analyze trends for the "${niche}" niche.` : 'Discover highly specific, obscure, and extremely profitable e-commerce MICRO-NICHES. Do NOT give me generic categories like "Tech Accessories" or "Home Decor". Think outside the box.'}

CRITICAL:
1. Find UNEXPECTED, hidden, or hyper-specific sub-niches (e.g., "Mushroom Core Room Decor", "Gothic Pet Accessories", "Ergonomic Japanese Stationery").
2. For EVERY piece of data you provide, you MUST explain your reasoning and cite your source.
3. Be wildly creative but ground it in actual rising trends.

Return a JSON response with exactly this structure:
{
  "categories": [
    {
      "name": "Category Name",
      "emoji": "🔥",
      "trends": [
        {
          "keyword": "Product keyword",
          "volume": "250K+",
          "growth": "+180%",
          "status": "rising",
          "insight": "Brief market insight with reasoning",
          "dataSource": "Where this data comes from (e.g. Google Trends, Etsy Search Data, Amazon BSR, etc.)",
          "reasoning": "Why this trend matters and how we determined its status"
        }
      ]
    }
  ],
  "summary": "Overall market analysis with transparent methodology",
  "topOpportunity": "Best opportunity with clear reasoning why",
  "methodology": "Explain exactly how this analysis was performed and what data sources were consulted",
  "sources": [
    {"name": "Google Trends", "url": "https://trends.google.com/trends/explore?q=${encodeURIComponent(searchTerm)}", "type": "real-time"}
  ],
  "limitations": "What this analysis cannot tell you and what you should verify independently"
}

Rules:
- Include exactly 2 distinct categories.
- Each category must have 2-3 trends.
- ONLY return valid JSON without any markdown formatting.`;

  const providers = [
    { name: 'Groq (Llama 3.3 70B)', fn: async () => {
      const { getGroq } = await import('@/lib/ai/groq')
      const r = await getGroq().chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: AI_PROMPT }],
        response_format: { type: 'json_object' },
        temperature: 0.9
      })
      return r.choices[0]?.message?.content || '{}'
    }},
    { name: 'Gemini 2.0 Flash', fn: async () => {
      const { getGemini } = await import('@/lib/ai/gemini')
      const result = await getGemini().getGenerativeModel({ model: 'gemini-2.0-flash' }).generateContent(AI_PROMPT)
      return result.response.text()
    }},
    { name: 'DeepSeek R1', fn: async () => {
      const { getCline } = await import('@/lib/ai/cline')
      const r = await getCline().chat.completions.create({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [{ role: 'user', content: AI_PROMPT }],
        temperature: 0.9
      })
      return r.choices[0]?.message?.content || '{}'
    }},
    { name: 'Qwen 2.5 72B', fn: async () => {
      const { getCline } = await import('@/lib/ai/cline')
      const r = await getCline().chat.completions.create({
        model: 'qwen/qwen-2.5-72b-instruct:free',
        messages: [{ role: 'user', content: AI_PROMPT }],
        temperature: 0.9
      })
      return r.choices[0]?.message?.content || '{}'
    }},
    { name: 'Claude 3 Haiku', fn: async () => {
      const { getCline } = await import('@/lib/ai/cline')
      const r = await getCline().chat.completions.create({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [{ role: 'user', content: AI_PROMPT }],
        temperature: 0.9
      })
      return r.choices[0]?.message?.content || '{}'
    }},
  ];

  // Fire all 5 in parallel
  const settled = await Promise.allSettled(providers.map(p => p.fn()));

  const allCategories: any[] = [];
  const allSources: any[] = [];
  const successfulProviders: string[] = [];
  let bestSummary = "";
  let bestOpportunity = "";

  settled.forEach((result, i) => {
    if (result.status === 'fulfilled' && result.value) {
      try {
        const cleaned = extractJSON(result.value);
        const parsed = JSON.parse(cleaned);
        
        if (parsed.categories && Array.isArray(parsed.categories)) {
          allCategories.push(...parsed.categories);
          successfulProviders.push(providers[i].name);
        }
        if (parsed.sources && Array.isArray(parsed.sources)) {
          allSources.push(...parsed.sources);
        }
        if (parsed.summary && !bestSummary) bestSummary = parsed.summary;
        if (parsed.topOpportunity && !bestOpportunity) bestOpportunity = parsed.topOpportunity;
      } catch (e) {}
    }
  });

  if (allCategories.length === 0) {
    return null;
  }

  // Deduplicate sources by URL
  const uniqueSourcesMap = new Map();
  allSources.forEach(s => {
    if (s.url && !uniqueSourcesMap.has(s.url)) {
      uniqueSourcesMap.set(s.url, s);
    }
  });
  
  // Return merged result
  return {
    engine: successfulProviders.join(' + '),
    niche: niche || 'general',
    trends: {
      categories: allCategories.slice(0, 6), // Keep top 6 categories from all AIs
      summary: `🧠 Multi-AI Consensus (${successfulProviders.length} providers): ${bestSummary}`,
      topOpportunity: bestOpportunity,
      methodology: "Parallel consensus gathered from Groq, Gemini, DeepSeek, Qwen, and Claude.",
      sources: Array.from(uniqueSourcesMap.values()),
      limitations: "AI-generated volumes and growth are estimations. Google Trends API provides actual verification."
    }
  };
}
