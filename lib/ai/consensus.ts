/**
 * Absolute Stability Consensus Engine (v4.0)
 */
import { getGoogleTrendsData, buildCompetitorLinks } from './google-trends';
import { extractJSON, withRetry } from './retry';
import { fetchInternetDataViaTool } from './internet-search';
import { RESEARCH_MODELS } from './models';

export async function consensusResearch(query: string, tier: string = 'FREE') {
  const isBasic = tier === 'FREE' || tier === 'STARTER';

  // Timeout for stability
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('TIMEOUT')), 55000)
  );

  const taskPromise = (async () => {
    // 1. Parallel Data Fetch (Reduced timeout to 1s to test if n8n is the bottleneck)
    const [internetData, trendsData] = await Promise.all([
      Promise.race([
        fetchInternetDataViaTool(query), 
        new Promise<string>(r => setTimeout(() => r(""), 1000))
      ]),
      getGoogleTrendsData(query).catch(() => null)
    ]);

    const context = internetData ? `${internetData}\n${trendsData?.summary || ""}` : "Direct AI analysis.";

    // 2. AI Analysis with Instant Failover
    const analysis = await withRetry(async (modelId) => {
      const { getCline } = await import('./cline');
      const response = await getCline().chat.completions.create({
        model: modelId!,
        messages: [
          {
            role: 'system',
            content: `You are a product researcher. Analyze: "${query}". Context: ${context}. Return valid JSON: {"products": [{"name": "...", "score": 85, ...}], "summary": "..."}`
          }
        ],
        temperature: 0.7
      });

      const content = response.choices[0]?.message?.content;
      return JSON.parse(extractJSON(content || "{}"));
    });

    // 3. Simple Enrichment
    const products = (analysis.products || []).map((p: any) => ({
      ...p,
      competitorLinks: buildCompetitorLinks(p.name),
      googleTrendsData: trendsData,
      googleTrendsInsight: trendsData?.summary || "Stable trend.",
      agreedByCount: 1
    }));

    return {
      products,
      summary: analysis.summary || "Analysis complete.",
      aiProviders: ["Gemini 2.0 Flash"],
      consensusMethod: "Direct Stable Engine"
    };
  })();

  return Promise.race([taskPromise, timeoutPromise]);
}

export async function consensusTrends(niche: string) {
  return withRetry(async (modelId) => {
    const { getCline } = await import('./cline');
    const response = await getCline().chat.completions.create({
      model: modelId!,
      messages: [{ role: 'user', content: `Analyze trends for: ${niche}. Return JSON: {"categories": [...]}` }],
      temperature: 0.9
    });
    const analysis = JSON.parse(extractJSON(response.choices[0]?.message?.content || "{}"));
    return {
      engine: "Gemini Stable",
      niche: niche || 'general',
      trends: { ...analysis, sources: [] }
    };
  });
}
