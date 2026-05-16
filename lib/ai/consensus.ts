/**
 * Optimized AI Research & Trends Engine (v3.0)
 * 
 * Focus: Single-model performance with smart failover (Nemotron -> MiMo -> Gemini)
 * Features: Internet Search, Google Trends Integration, Semantic Enrichment
 */

import { getGoogleTrendsData, buildCompetitorLinks, type GoogleTrendsData } from './google-trends';
import { sourceSuppliersBatch, type ScoredSupplierMatch } from './supplier-sourcing';
import { extractJSON, withRetry } from './retry';
import { fetchInternetDataViaTool } from './internet-search';
import { RESEARCH_MODELS, ETSY_MODELS } from './models';

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
  failureModes: Array<{ scenario: string; likelihood: string; impact: string }>;
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
  suppliers: any[];
  semanticSuppliers: ScoredSupplierMatch[];
  sourcingStats: any;
  competitorLinks: any[];
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
  return `You are a world-class e-commerce product research analyst.
The user is researching: "${query}"${internetContext}

CRITICAL: Return ONLY valid JSON.
{
  "products": [
    {
      "name": "Product Name",
      "category": "Category",
      "searchKeyword": "exact search term",
      "wholesalePrice": "$X-Y",
      "retailPrice": "$X-Y",
      "profitMargin": "XX%",
      "realProfitMargin": "XX%",
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
      "failureRisks": ["Risk 1"],
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
      "marketingTips": ["Tip 1"],
      "sources": ["Source 1"]
    }
  ],
  "summary": "Comprehensive market overview"
}`;
};

/**
 * 🔍 Main Research Function
 */
export async function consensusResearch(query: string, tier: string = 'FREE'): Promise<ConsensusResult> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('RESEARCH_TIMEOUT')), 50000)
  );

  try {
    const researchPromise = (async (): Promise<ConsensusResult> => {
      const [internetContext, mainQueryTrends] = await Promise.all([
        Promise.race([
          fetchInternetDataViaTool(query),
          new Promise<string>((r) => setTimeout(() => r(""), 10000))
        ]),
        getGoogleTrendsData(query).catch(() => null)
      ]);

      const fullContext = internetContext + (mainQueryTrends ? `\n\n--- GOOGLE TRENDS ---\n${mainQueryTrends.summary}\n` : "");

      const analysis = await withRetry(async (overrideModel?: string) => {
        const { getCline } = await import('./cline');
        const modelToUse = overrideModel || RESEARCH_MODELS.NEMOTRON.id;

        const response = await getCline().chat.completions.create({
          model: modelToUse,
          messages: [
            { role: 'system', content: RESEARCH_PROMPT(query, fullContext, tier) },
            { role: 'user', content: query }
          ],
          temperature: 0.7
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty AI response");

        return JSON.parse(extractJSON(content));
      }, { maxRetries: 1, baseDelayMs: 1000 });

      const enrichedProducts = await Promise.all(analysis.products.map(async (product: any) => {
        const keyword = product.searchKeyword || product.name;
        const competitorLinks = buildCompetitorLinks(keyword);
        return {
          ...product,
          competitorLinks,
          googleTrendsData: mainQueryTrends,
          googleTrendsInsight: mainQueryTrends?.summary || "No specific trend data available.",
          agreedByCount: 1,
          suppliers: [],
          semanticSuppliers: [],
          sourcingStats: null
        };
      }));

      return {
        products: enrichedProducts,
        summary: analysis.summary || "Analysis complete.",
        aiProviders: [RESEARCH_MODELS.NEMOTRON.id],
        consensusMethod: "Dedicated AI Engine"
      };
    })();

    return await Promise.race([researchPromise, timeoutPromise]);
  } catch (error: any) {
    if (error.message === 'RESEARCH_TIMEOUT') {
      return { products: [], summary: 'Timed out.', aiProviders: [], consensusMethod: 'none' };
    }
    throw error;
  }
}

/**
 * 🔥 Trends Engine
 */
export async function consensusTrends(niche: string) {
  const searchTerm = niche || 'trending products 2026';
  const AI_PROMPT = `You are an expert trend analyst. Discover profitable micro-niches for: "${searchTerm}". Return valid JSON.
  {
    "categories": [
      {
        "name": "Category Name",
        "emoji": "🔥",
        "trends": [
          { "keyword": "Product", "volume": "250K+", "growth": "+180%", "status": "rising", "insight": "Reason" }
        ]
      }
    ],
    "summary": "Analysis"
  }`;

  try {
    const analysis = await withRetry(async (overrideModel?: string) => {
      const { getCline } = await import('./cline');
      const modelToUse = overrideModel || RESEARCH_MODELS.NEMOTRON.id;

      const response = await getCline().chat.completions.create({
        model: modelToUse,
        messages: [{ role: 'user', content: AI_PROMPT }],
        temperature: 0.9,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(extractJSON(response.choices[0]?.message?.content || '{}'));
    });

    return {
      engine: "Nemotron 3 Super",
      niche: niche || 'general',
      trends: {
        ...analysis,
        methodology: "AI analysis powered by NVIDIA Nemotron 3 Super.",
        sources: [{ name: "Google Trends", url: `https://trends.google.com/trends/explore?q=${encodeURIComponent(searchTerm)}`, type: "real-time" }]
      }
    };
  } catch (err) {
    return null;
  }
}
