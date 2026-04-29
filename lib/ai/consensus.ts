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

import { getGoogleTrendsData, buildSupplierLinks, buildCompetitorLinks, type GoogleTrendsData } from './google-trends';

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

  const { getCline } = await import('./cline');
  const cline = getCline();

  const systemPrompt = `You are a web search routing agent. 
You MUST use the "search" tool when the user asks for:
* current information
* trends
* product research
* anything requiring internet data

Do NOT answer from memory if search is required.`;

  const tools = [
    {
      type: "function" as const,
      function: {
        name: "search",
        description: "Search the internet for up-to-date information",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string" }
          },
          required: ["query"]
        }
      }
    }
  ];

  try {
    const response = await cline.chat.completions.create({
      model: 'gemini-2.5-flash-preview', // Fast & reliable tool caller
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze trends and products for: ${query}` }
      ],
      tools: tools,
      tool_choice: "auto"
    });

    const message = response.choices[0]?.message;

    // Check if the model decided to use the tool
    if (message?.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0] as any;
      if (toolCall.function.name === "search") {
        const args = JSON.parse(toolCall.function.arguments);

        // Call the n8n webhook
        const n8nResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: args.query })
        });

        const data = await n8nResponse.json();

        // Parse the response format standard
        if (data && data.results && Array.isArray(data.results)) {
          const parsedResults = data.results.map((r: any) => `Title: ${r.title}\nLink: ${r.link}\nSnippet: ${r.snippet}`).join('\n\n');
          return `\n\n--- LIVE INTERNET DATA (n8n Search) ---\nThe following is real-time web search data for this query. You MUST base your analysis, prices, and trends on this data whenever possible:\n${parsedResults}\n---------------------------\n\n`;
        }
      }
    }

    return ""; // Fallback if no tool was called or search failed
  } catch (e) {
    console.error("n8n tool search failed", e);
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
      model: 'deepseek/deepseek-r1',
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
      model: 'qwen/qwen-2.5-72b-instruct',
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
      model: 'anthropic/claude-3.5-haiku',
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
 * Tüm AI yanıtlarını birbirleriyle karşılaştır, eksikleri ve yanlışları tespit et
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

  // 🧠 ZEKA KONTROLÜ: AI'ları birbirlerini düzeltmesi için kullan
  const allProductsJson = JSON.stringify(allProducts, null, 2);

  const validationPrompt = `
Sen bir VERİ DENETÇİSİSİN. Aşağıda 5 farklı yapay zekanın aynı sorgu için döndürdüğü ürün listesi var.

SORGUNUZ: ${query}

GÖREVİN:
1. Aynı ürünleri birbirleriyle karşılaştır
2. Fiyat, marj, skor gibi verilerdeki tutarsızlıkları tespit et
3. Eksik alanları belirle
4. Uydurulmuş veya gerçekçi olmayan verileri işaret et
5. Her ürün için EN DOĞRU ortalama değerleri hesapla
6. Hiçbir AI'ın yanlış yapmasına izin verme

✅ SADECE düzeltilmiş ve doğrulanmış JSON döndür. Hiçbir açıklama ekleme.

TÜM ÜRÜNLER:
${allProductsJson}

${internetContext}
`;

  try {
    // En iyi mantık yapısına sahip DeepSeek R1 ile doğrulama yap
    const { getCline } = await import('./cline');
    const cline = getCline();

    const validationResponse = await cline.chat.completions.create({
      model: 'deepseek-r1',
      messages: [{ role: 'user', content: validationPrompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const validated = safeParseJSON(validationResponse.choices[0]?.message?.content || '{}');

    if (validated && validated.products && Array.isArray(validated.products)) {
      console.log(`✅ Smart validation completed: ${allProducts.length} ürün doğrulandı`);
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

  // ✅ İLK ÖNCE AKILLI DOĞRULAMA YAP
  const { products: validatedProducts, summaries, activeProviders } = await smartValidateAndRefine(
    allResults, providers, query, internetContext
  );

  if (validatedProducts.length === 0) {
    return {
      products: [],
      summary: 'Tüm yapay zeka sağlayıcıları sonuç döndüremedi. Lütfen tekrar deneyin.',
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

    // ✅ VERİ KALİTE KONTROLÜ
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

  // Build final products with REAL supplier links and REAL Google Trends
  const finalProducts: ConsensusProduct[] = topProducts.map((product) => {
    const keyword = product.searchKeyword || product.name;
    const realSuppliers = buildSupplierLinks(keyword);
    const competitorLinks = buildCompetitorLinks(keyword);
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
