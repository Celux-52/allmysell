/**
 * Multi-AI Consensus Engine + Real Google Trends + Semantic Supplier Matching
 * 
 * Uses 5 specialized free AI models via OpenRouter:
 *   1. Ring 2.6 1T (Agent Workflows & Analysis)
 *   2. GPT-OSS 120B (Reasoning & Multi-step Research)
 *   3. Nemotron 3 Super (Data Processing & SEO Analysis)
 *   4. MiniMax M2.5 (Web Data Comprehension)
 *   5. Qwen 3 Next 80B (Technical Analysis & Logistics)
 * 
 * Then enriches with:
 *   - REAL Google Trends data
 *   - AI-powered semantic supplier matching (embeddings + cosine similarity)
 *   - Quality-filtered supplier products (rating ≥ 4.0, orders ≥ 50)
 */

import { getGoogleTrendsData, buildCompetitorLinks, type GoogleTrendsData } from './google-trends';
import { sourceSuppliersBatch, type ScoredSupplierMatch, type SupplierSourceResult } from './supplier-sourcing';
import { extractJSON, withRetry } from './retry';
import { fetchInternetDataViaTool } from './internet-search';
import { RESEARCH_MODELS, AI_MODELS } from './models';

interface SupplierLink {
  name: string;
  url: string;
}

interface ConsensusProduct {
  name: string;
  category: string;
  searchKeyword: string;
  wholesalePrice: string;
  retailPrice: string;
  profitMargin: string;
  realProfitMargin: string;
  platformFees: string;
  competition: string;
  trend: string;
  score: number;
  confidenceLevel: string;
  confidencePercent: number;
  dataSource: string;
  doNotBuild: boolean;
  doNotBuildReason: string;
  trafficSource: string;
  failureRisks: string[];
  failureModes: Array<{
    scenario: string;
    likelihood: string;
    impact: string;
  }>;
  saturationIndex: number;
  copycatRisk: number;
  saturationNote: string;
  trendLifespan: string;
  trendLifespanNote: string;
  scalabilityScore: number;
  scalabilityNote: string;
  description: string;
  platforms: string[];
  whyItWorks: string;
  targetAudience: string;
  painPoint: string;
  sellingAngle: string;
  viralPotential: string;
  marketingTips: string[];
  sources: string[];
  agreedByCount: number;
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



const RESEARCH_PROMPT = (query: string, internetContext: string = "", tier: string = 'FREE') => {
  const isBasic = tier === 'FREE' || tier === 'STARTER';
  
  return `You are a world-class e-commerce product research analyst with a BRUTALLY HONEST approach.
The user is researching: "${query}"${internetContext}

CRITICAL INSTRUCTIONS:
1. Analyze this niche using your knowledge of current market data, Google Trends patterns, and e-commerce platforms.
2. Provide realistic wholesale and retail pricing based on actual market data.
3. Score each product 0-100 based on: demand (30%), margin (25%), competition (20%), trend momentum (15%), ease of sourcing (10%).
4. For each product, give a short keyword that best represents it for supplier searches (in the "searchKeyword" field).
5. For "painPoint", "sellingAngle", and "viralPotential": write MAX 1 short sentence each. Be specific, no fluff.

${!isBasic ? `
6. 💀 FAILURE MODE ANALYSIS RULE:
For EVERY product, think like a pessimist: "Why would this FAIL?" Provide 2-3 specific failure scenarios in "failureModes". Include worst-case outcomes.

7. 🧬 COPYCAT & SATURATION RULE:
Estimate market saturation (0-100) and copycat risk (0-100). Be honest.

8. ⏱ TREND LIFESPAN & SCALABILITY RULE:
Classify trend as "Evergreen", "Seasonal", or "Fad". Rate "scalabilityScore" (0-100).
` : '6. Keep the analysis focused on core trends and pricing. Do not provide detailed failure mode or saturation data for this basic tier.'}

⛔ "DO NOT BUILD" RULE:
If a product has HIGH competition + LOW margin + DECLINING trend, you MUST set "doNotBuild": true and explain why in "doNotBuildReason".

📊 REALITY LAYER RULE:
Honestly assess your confidence. Set "confidenceLevel" to "high" ONLY if you have strong evidence.

💰 PROFIT REALITY CHECK RULE:
Calculate "realProfitMargin" by deducting platform fees, shipping, and ads cost. Show the REAL take-home profit.

Return ONLY valid JSON in this exact structure:
{
  "products": [
    {
      "name": "Product Name",
      "category": "Category",
      "searchKeyword": "exact search term",
      "wholesalePrice": "$X-Y",
      "retailPrice": "$X-Y",
      "profitMargin": "XX-XX%",
      "realProfitMargin": "XX-XX%",
      "platformFees": "Breakdown",
      "competition": "Low/Medium/High",
      "trend": "Rising/Stable/Declining",
      "score": 85,
      "confidenceLevel": "high/medium/low",
      "confidencePercent": 85,
      "dataSource": "Sources",
      "doNotBuild": false,
      "doNotBuildReason": "",
      "trafficSource": "TikTok/FB/Search",
      "failureRisks": ["Risk 1", "Risk 2"],
      ${!isBasic ? `"failureModes": [{"scenario": "X", "likelihood": "Y", "impact": "Z"}],
      "saturationIndex": 45,
      "copycatRisk": 80,
      "saturationNote": "Note",
      "trendLifespan": "Evergreen/Seasonal/Fad",
      "trendLifespanNote": "Note",
      "scalabilityScore": 65,
      "scalabilityNote": "Note",` : ''}
      "description": "Short description",
      "platforms": ["Amazon", "Etsy"],
      "whyItWorks": "Reason",
      "targetAudience": "Audience",
      "painPoint": "Problem",
      "sellingAngle": "Hook",
      "viralPotential": "Viral hook",
      "marketingTips": ["Tip 1", "Tip 2"],
      "sources": ["Source 1", "Source 2"]
    }
  ],
  "summary": "Comprehensive market overview"
}

Return 4-6 products. At least 1 product MUST be marked as doNotBuild:true if competition is oversaturated. ONLY return valid JSON.`;
};

function safeParseJSON(text: string): any {
  try {
    const cleaned = extractJSON(text);
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

// --- Provider 1: Ring 2.6 1T (Agent Workflows) ---
async function queryRing(query: string, internetContext: string, tier: string = 'FREE'): Promise<{ products: any[]; summary: string } | null> {
  return withRetry(async (overrideModel) => {
    const { getCline } = await import('./cline');
    const response = await getCline().chat.completions.create({
      model: overrideModel || RESEARCH_MODELS.RING.id,
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext, tier) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const text = response.choices[0]?.message?.content || '{}';
    const parsed = safeParseJSON(text);
    if (!parsed || !parsed.products) throw new Error("Invalid or empty JSON from Ring");
    return parsed;
  });
}

// --- Provider 2: GPT-OSS 120B (Reasoning) ---
async function queryGptOss(query: string, internetContext: string, tier: string = 'FREE'): Promise<{ products: any[]; summary: string } | null> {
  return withRetry(async (overrideModel) => {
    const { getCline } = await import('./cline');
    const response = await getCline().chat.completions.create({
      model: overrideModel || RESEARCH_MODELS.GPT_OSS.id,
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext, tier) },
        { role: 'user', content: query }
      ],
      temperature: 0.6
    });
    const text = response.choices[0]?.message?.content || '{}';
    const parsed = safeParseJSON(text);
    if (!parsed || !parsed.products) throw new Error("Invalid or empty JSON from GPT-OSS");
    return parsed;
  });
}

// --- Provider 3: Nemotron 3 Super (Data Processing) ---
async function queryNemotron(query: string, internetContext: string, tier: string = 'FREE'): Promise<{ products: any[]; summary: string } | null> {
  return withRetry(async (overrideModel) => {
    const { getCline } = await import('./cline');
    const response = await getCline().chat.completions.create({
      model: overrideModel || RESEARCH_MODELS.NEMOTRON.id,
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext, tier) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const parsed = safeParseJSON(response.choices[0]?.message?.content || '{}');
    if (!parsed || !parsed.products) throw new Error("Invalid or empty JSON from Nemotron");
    return parsed;
  });
}

// --- Provider 4: MiniMax M2.5 (Web Comprehension) ---
async function queryMinimax(query: string, internetContext: string, tier: string = 'FREE'): Promise<{ products: any[]; summary: string } | null> {
  return withRetry(async (overrideModel) => {
    const { getCline } = await import('./cline');
    const response = await getCline().chat.completions.create({
      model: overrideModel || RESEARCH_MODELS.MINIMAX.id,
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext, tier) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const parsed = safeParseJSON(response.choices[0]?.message?.content || '{}');
    if (!parsed || !parsed.products) throw new Error("Invalid or empty JSON from MiniMax");
    return parsed;
  });
}

// --- Provider 5: Qwen 3 Next 80B (Technical Analysis) ---
async function queryQwenNext(query: string, internetContext: string, tier: string = 'FREE'): Promise<{ products: any[]; summary: string } | null> {
  return withRetry(async (overrideModel) => {
    const { getCline } = await import('./cline');
    const response = await getCline().chat.completions.create({
      model: overrideModel || RESEARCH_MODELS.QWEN_NEXT.id,
      messages: [
        { role: 'system', content: RESEARCH_PROMPT(query, internetContext, tier) },
        { role: 'user', content: query }
      ],
      temperature: 0.7
    });
    const parsed = safeParseJSON(response.choices[0]?.message?.content || '{}');
    if (!parsed || !parsed.products) throw new Error("Invalid or empty JSON from Qwen Next");
    return parsed;
  });
}

/**
 * ✅ SMART AI VALIDATION LAYER
 * Cross-validate all AI responses, detect inconsistencies and errors
 */
async function smartValidateAndRefine(
  allResults: Array<{ products: any[]; summary: string } | null>,
  providers: string[],
  query: string,
  internetContext: string,
  isBasic: boolean = false
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
7. CRITICAL: You MUST KEEP all advanced fields (doNotBuild, failureModes, saturationIndex, copycatRisk, trendLifespan, scalabilityScore, realProfitMargin) in your final output. DO NOT strip them!

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
      model: isBasic ? 'meta-llama/llama-3.2-3b-instruct:free' : AI_MODELS.REASONING.id, 
      messages: [{ role: 'user', content: validationPrompt }],
      temperature: 0.3
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

  // ✅ RUN SMART VALIDATION FIRST (Skip for basic tier to save 5-10s)
  const isBasic = !allResults[0] || (allResults[0] as any).tier === 'FREE' || (allResults[0] as any).tier === 'STARTER';
  
  let validatedProducts: any[] = [];
  let summaries: string[] = [];
  let activeProviders: string[] = [];

  if (isBasic) {
     // Fast path for basic tier: just take the first good result set
     const firstGood = allResults.find(r => r && r.products && r.products.length > 0);
     validatedProducts = firstGood?.products || [];
     summaries = firstGood?.summary ? [firstGood.summary] : [];
     activeProviders = providers.slice(0, 3);
  } else {
    const validated = await smartValidateAndRefine(allResults, providers, query, internetContext, isBasic);
    validatedProducts = validated.products;
    summaries = validated.summaries;
    activeProviders = validated.activeProviders;
  }

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
      realProfitMargin: base.realProfitMargin || base.profitMargin || 'N/A',
      platformFees: base.platformFees || '',
      competition: base.competition || 'Medium',
      trend: base.trend || 'Stable',
      score: Math.min(Math.max(avgScore + consensusBonus + qualityPenalty, 0), 100),
      confidenceLevel: base.confidenceLevel || 'medium',
      confidencePercent: base.confidencePercent || 70,
      dataSource: base.dataSource || 'AI Estimate',
      doNotBuild: base.doNotBuild || false,
      doNotBuildReason: base.doNotBuildReason || '',
      trafficSource: base.trafficSource || '',
      failureRisks: base.failureRisks || [],
      failureModes: base.failureModes || [],
      saturationIndex: base.saturationIndex || 0,
      copycatRisk: base.copycatRisk || 0,
      saturationNote: base.saturationNote || '',
      trendLifespan: base.trendLifespan || 'Stable',
      trendLifespanNote: base.trendLifespanNote || '',
      scalabilityScore: base.scalabilityScore || 0,
      scalabilityNote: base.scalabilityNote || '',
      description: base.description || '',
      platforms: [...new Set(group.flatMap((p: any) => p.platforms || []))],
      whyItWorks: base.whyItWorks || '',
      targetAudience: base.targetAudience || '',
      painPoint: base.painPoint || '',
      sellingAngle: base.sellingAngle || '',
      viralPotential: base.viralPotential || '',
      marketingTips: [...allTips].slice(0, 5),
      sources: [...allSources].slice(0, 5),
      agreedByCount: group.length,
    });
  }

  // Sort by score
  mergedRaw.sort((a, b) => b.score - a.score);
  const topProducts = mergedRaw.slice(0, 8);

  // ENRICH: Fetch trends and suppliers IN PARALLEL
  console.log('\n🔗 [Consensus] Starting parallel enrichment (Trends + Suppliers)...');
  
  const top4 = topProducts.slice(0, 4);

  const [trendsResults, supplierResults] = await Promise.all([
    // Parallel Trends
    Promise.allSettled(
      top4.map(async (product, i) => {
        const keyword = product.searchKeyword || product.name;
        if (i > 0) await new Promise(r => setTimeout(r, i * 150));
        try {
          return { name: product.name, data: await getGoogleTrendsData(keyword) };
        } catch (err: any) {
          return { name: product.name, data: null };
        }
      })
    ),
    // Parallel Suppliers
    sourceSuppliersBatch(
      topProducts.map(p => ({
        name: p.name,
        searchKeyword: p.searchKeyword || p.name,
        category: p.category,
        description: p.description,
        whyItWorks: p.whyItWorks,
        targetAudience: p.targetAudience,
      }))
    )
  ]);

  const trendsMap = new Map<string, GoogleTrendsData | null>();
  trendsResults.forEach(r => {
    if (r.status === 'fulfilled') trendsMap.set(r.value.name, r.value.data);
  });
  
  console.log(`🔗 [Consensus] Parallel enrichment complete\n`);

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
      searchKeyword: product.searchKeyword,
      wholesalePrice: product.wholesalePrice,
      retailPrice: product.retailPrice,
      profitMargin: product.profitMargin,
      realProfitMargin: product.realProfitMargin,
      platformFees: product.platformFees,
      competition: product.competition,
      trend: product.trend,
      score: product.score,
      confidenceLevel: product.confidenceLevel,
      confidencePercent: product.confidencePercent,
      dataSource: product.dataSource,
      doNotBuild: product.doNotBuild,
      doNotBuildReason: product.doNotBuildReason,
      trafficSource: product.trafficSource,
      failureRisks: product.failureRisks,
      failureModes: product.failureModes,
      saturationIndex: product.saturationIndex,
      copycatRisk: product.copycatRisk,
      saturationNote: product.saturationNote,
      trendLifespan: product.trendLifespan,
      trendLifespanNote: product.trendLifespanNote,
      scalabilityScore: product.scalabilityScore,
      scalabilityNote: product.scalabilityNote,
      description: product.description,
      platforms: product.platforms,
      whyItWorks: product.whyItWorks,
      targetAudience: product.targetAudience,
      painPoint: product.painPoint,
      sellingAngle: product.sellingAngle,
      viralPotential: product.viralPotential,
      marketingTips: product.marketingTips,
      sources: product.sources,
      agreedByCount: product.agreedByCount,
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
export async function consensusResearch(query: string, tier: string = 'FREE'): Promise<ConsensusResult> {
  // Global timeout for the entire research process
  const timeoutPromise = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error('RESEARCH_TIMEOUT')), 50000)
  );

  try {
    const researchPromise = (async () => {
      const providers = [
        'Ring 2.6 1T (Agent)',
        'GPT-OSS 120B (Reasoning)',
        'Nemotron 3 Super (Data)',
        'MiniMax M2.5 (Comprehension)',
        'Qwen 3 Next 80B (Technical)',
      ];

      // 1. Fetch live internet data via native tool calling to n8n webhook FIRST
      const internetContext = await fetchInternetDataViaTool(query);

      // 2. Fetch real Google Trends for the main query to provide ground-truth trend data to AI
      const mainQueryTrends = await getGoogleTrendsData(query);
      const googleTrendsContext = mainQueryTrends 
        ? `\n\n--- REAL-TIME GOOGLE TRENDS DATA ---\n${mainQueryTrends.summary}\n-----------------------------------\n\n`
        : "";

      const fullContext = internetContext + googleTrendsContext;

      // Basic tier uses fewer models to speed up response and avoid rate limits
      const isBasic = tier === 'FREE' || tier === 'STARTER';
      const allProviders = isBasic 
        ? [
            { name: providers[0], fn: () => queryRing(query, fullContext, tier) },
            { name: providers[1], fn: () => queryGptOss(query, fullContext, tier) },
            { name: providers[2], fn: () => queryNemotron(query, fullContext, tier) }
          ]
        : [
            { name: providers[0], fn: () => queryRing(query, fullContext, tier) },
            { name: providers[1], fn: () => queryGptOss(query, fullContext, tier) },
            { name: providers[2], fn: () => queryNemotron(query, fullContext, tier) },
            { name: providers[3], fn: () => queryMinimax(query, fullContext, tier) },
            { name: providers[4], fn: () => queryQwenNext(query, fullContext, tier) }
          ];

      const isOpenRouterOnly = !process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY;

      const staggeredPromises = allProviders.map(async (provider, i) => {
        // Stagger requests by 5 seconds each (0s, 5s, 10s...)
        if (isOpenRouterOnly && i > 0) {
          const delay = i * 5000;
          console.log(`[Consensus] Staggering provider ${provider.name} by ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
        }
        
        try {
          const result = await provider.fn();
          return { ...result, tier };
        } catch (error: any) {
          console.error(`[Consensus] Provider ${provider.name} failed:`, error.message);
          return null;
        }
      });

      let settledResults = await Promise.all(staggeredPromises) as Array<{ products: any[]; summary: string } | null>;
      
      // --- LAST RESORT FALLBACK ---
      // If all providers failed (rate limits, timeouts, etc.), try one single robust call using the openrouter/free router.
      const allFailed = settledResults.every(r => !r || !r.products || r.products.length === 0);
      
      if (allFailed) {
        console.warn('⚠️ [Consensus] ALL providers failed. Attempting Last Resort fallback...');
        try {
          const { getCline } = await import('./cline');
          const response = await getCline().chat.completions.create({
            model: 'openrouter/free',
            messages: [
              { role: 'system', content: RESEARCH_PROMPT(query, internetContext, tier) },
              { role: 'user', content: query }
            ],
            temperature: 0.7
          });
          const text = response.choices[0]?.message?.content || '{}';
          const parsed = safeParseJSON(text);
          if (parsed && parsed.products && parsed.products.length > 0) {
             console.log('✅ [Consensus] Last Resort fallback succeeded!');
             settledResults = [{ ...parsed, tier }];
          }
        } catch (fallbackError: any) {
          console.error('❌ [Consensus] Last Resort fallback also failed:', fallbackError.message);
        }
      }

      return mergeAndEnrich(settledResults, providers.slice(0, allProviders.length), query, internetContext);
    })();

    return await Promise.race([researchPromise, timeoutPromise]);
  } catch (error: any) {
    if (error.message === 'RESEARCH_TIMEOUT') {
      return {
        products: [],
        summary: 'The research engine is currently overloaded and timed out. Please try a more specific query or try again in a few minutes.',
        aiProviders: [],
        consensusMethod: 'none',
      };
    }
    throw error;
  }
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
    {
      name: 'Ring 2.6 1T', fn: async () => {
        const { getCline } = await import('@/lib/ai/cline')
        const r = await getCline().chat.completions.create({
          model: RESEARCH_MODELS.RING.id,
          messages: [{ role: 'user', content: AI_PROMPT }],
          temperature: 0.9
        })
        return r.choices[0]?.message?.content || '{}'
      }
    },
    {
      name: 'GPT-OSS 120B', fn: async () => {
        const { getCline } = await import('@/lib/ai/cline')
        const r = await getCline().chat.completions.create({
          model: RESEARCH_MODELS.GPT_OSS.id,
          messages: [{ role: 'user', content: AI_PROMPT }],
          temperature: 0.9
        })
        return r.choices[0]?.message?.content || '{}'
      }
    },
    {
      name: 'Nemotron 3 Super', fn: async () => {
        const { getCline } = await import('@/lib/ai/cline')
        const r = await getCline().chat.completions.create({
          model: RESEARCH_MODELS.NEMOTRON.id,
          messages: [{ role: 'user', content: AI_PROMPT }],
          temperature: 0.9
        })
        return r.choices[0]?.message?.content || '{}'
      }
    },
    {
      name: 'MiniMax M2.5', fn: async () => {
        const { getCline } = await import('@/lib/ai/cline')
        const r = await getCline().chat.completions.create({
          model: RESEARCH_MODELS.MINIMAX.id,
          messages: [{ role: 'user', content: AI_PROMPT }],
          temperature: 0.9
        })
        return r.choices[0]?.message?.content || '{}'
      }
    },
    {
      name: 'Qwen 3 Next 80B', fn: async () => {
        const { getCline } = await import('@/lib/ai/cline')
        const r = await getCline().chat.completions.create({
          model: RESEARCH_MODELS.QWEN_NEXT.id,
          messages: [{ role: 'user', content: AI_PROMPT }],
          temperature: 0.9
        })
        return r.choices[0]?.message?.content || '{}'
      }
    },
  ];

  // If relying on OpenRouter Free tier, reduce parallel requests to avoid 429 Rate Limits
  const isOpenRouterOnly = !process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY;
  const activeProviders = isOpenRouterOnly ? providers.slice(0, 3) : providers;

  const staggeredPromises = activeProviders.map(async (provider, i) => {
    if (isOpenRouterOnly && i > 0) {
      const delay = i * 5000;
      console.log(`[Consensus Trends] Staggering provider ${provider.name} by ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }
    return provider.fn();
  });

  const settled = await Promise.allSettled(staggeredPromises);

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
      } catch (e) { }
    }
  });

  // --- LAST RESORT FALLBACK FOR TRENDS ---
  if (allCategories.length === 0) {
    console.warn('⚠️ [Consensus Trends] ALL providers failed. Attempting Last Resort fallback...');
    try {
      const { getCline } = await import('@/lib/ai/cline')
      const r = await getCline().chat.completions.create({
        model: 'openrouter/free',
        messages: [{ role: 'user', content: AI_PROMPT }],
        temperature: 0.9
      })
      const fallbackResult = r.choices[0]?.message?.content || '{}';
      const cleaned = extractJSON(fallbackResult);
      const parsed = JSON.parse(cleaned);

      if (parsed.categories && Array.isArray(parsed.categories)) {
        allCategories.push(...parsed.categories);
        successfulProviders.push('OpenRouter Free (Fallback)');
        if (parsed.summary && !bestSummary) bestSummary = parsed.summary;
        if (parsed.topOpportunity && !bestOpportunity) bestOpportunity = parsed.topOpportunity;
      }
    } catch (fallbackError: any) {
      console.error('❌ [Consensus Trends] Last Resort fallback failed:', fallbackError.message);
    }
  }

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
