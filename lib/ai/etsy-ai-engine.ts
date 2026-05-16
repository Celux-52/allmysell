import { createClient } from '@/lib/supabase/client';
import { withRetry, extractJSON } from './retry';
import { ETSY_MODELS } from './models';

export interface DetailedAnalysis {
  trendScore: number;
  competitionLevel: "Low" | "Medium" | "High";
  decision: "SELL" | "AVOID";
  summary: string;
  verdict: string;
  opportunityStatus: string;
  revenueForecast: string;
  riskEvaluation: string;
  sniperStrategy: string;
  isHandmade: boolean;
  isCustomizable: boolean;
  scores: {
    demand: number;
    margin: number;
    competition: number;
    trend: number;
  };
  consensus: {
    agreedCount: number;
    totalProviders: number;
    confidence: number;
  };
  seoInsight: string;
  buyerPsychology: string;
  actionPriority?: Array<{
    task: string;
    priority: "Urgent" | "High" | "Medium";
    impact: string;
  }>;
  serpSimulation?: {
    top10Pattern: string;
    thumbnailGap: string;
    titleGap: string;
  };
  conversionFunnel?: {
    trafficLeak: string;
    conversionFix: string;
  };
  personaTargeting?: {
    primaryPersona: string;
    psychographicKeywords: string[];
  };
  abTestSimulation?: Array<{
    variable: string;
    action: string;
    predictedLift: string;
  }>;
}

export class EtsyAIEngine {
  static async analyzeProduct(productData: any): Promise<DetailedAnalysis> {
    const PROMPT = `
# ğŸ§  ETSY SNIPER v2.0 â€” REAL MONEY DECISION ENGINE

## ğŸ¯ ROLE
You are an Etsy Market Intelligence & Profit Decision Engine.
Your job is NOT to describe products.
Your job is to predict which products actually make money in real Etsy market conditions, explain why they win or lose, and eliminate weak opportunities.
You act like:
- senior Etsy seller
- conversion rate optimizer
- consumer psychologist
- marketplace data analyst

## ğŸš¨ CORE RULES
- NEVER invent real metrics (favorites, revenue, CTR, views, rankings)
- If data is missing -> say "pattern-based estimate"
- Focus on REAL marketplace logic, not generic AI text
- Think like Etsy SERP reality, not isolated product page

## ğŸ§ª ANALYSIS SYSTEM (MANDATORY PIPELINE)

### 1. MARKET REALITY SIMULATION (SERP LOGIC)
Analyze: Top 10 listing density, Visual similarity, Pricing clustering, Saturation type.
You MUST provide a "serpSimulation" analyzing the current Top 10 pattern, the visual/thumbnail gap (how to stand out visually), and the title gap.

### 2. BUYER INTENT ENGINE & 3. EMOTIONAL COMMERCE ANALYSIS
Detect psychological buying triggers: pain relief, identity transformation, hope, guilt relief, dopamine, etc.

### 4. TREND VECTOR DETECTION & 5. DIFFERENTIATION
Identify cultural source (TikTok, Pinterest, Reddit), uniqueness, and copycat risk.

### 6. MONETIZATION ENGINE
Evaluate real profit structure, price strength, upsell potential, and ads dependency.

### 7. ACTION PRIORITY ENGINE
Instead of just giving data, provide a strict 3-step action plan in "actionPriority". Tell the seller exactly what to do first, second, and third to beat the competition (e.g., "1. Change thumbnail to dark background to stand out from 10 white competitors").

### 8. CONVERSION FUNNEL MAPPING
Find where the seller is losing customers. What causes a "View" to drop before "Sale"? Identify the "trafficLeak" and the "conversionFix".

### 9. PERSONA SEGMENTATION
Define the exact buyer persona (e.g. "Anxious bride-to-be", "Nostalgic millennial") and provide 3-4 "psychographicKeywords" they actually search for (not generic tags, but emotional long-tail searches).

### 10. A/B TEST SIMULATION
Provide 2-3 specific A/B tests the seller should run on this listing. What is the "variable" (e.g., Thumbnail, Title, Price), what is the "action", and what is the "predictedLift" (e.g., "+15% CTR").

### 11. WIN / LOSE DECISION
Final classification: WINNER, HYPER WINNER, AVOID, SPECULATIVE

PRODUCT DATA TO ANALYZE:
TITLE: ${productData.title}
PRICE: ${productData.price} ${productData.currency}
FAVORITES: ${productData.favorites}
VIEWS: ${productData.views}
TAGS: ${productData.tags?.join(', ') || 'N/A'}

## ğŸ§¾ FINAL OUTPUT FORMAT
You MUST output ONLY a valid JSON object matching the interface below. No markdown formatting outside the JSON, no extra text.

{
  "verdict": "BRUTALLY HONEST 1-LINE VERDICT: Does this print money or not?",
  "opportunityStatus": "WINNER | HYPER WINNER | AVOID | SPECULATIVE",
  "revenueForecast": "Revenue Stability & Scaling Potential (e.g. High stability, Low ads dependency)",
  "riskEvaluation": "Main failure reasons, saturation risks, demand risks",
  "sniperStrategy": "1. SEO strategy 2. positioning 3. differentiation 4. best marketing channel",
  "trendScore": 85,
  "competitionLevel": "Low | Medium | High",
  "decision": "SELL | AVOID",
  "summary": "Market Reality: Saturation, Competition Type, Entry Difficulty, Price Zone",
  "buyerPsychology": "Primary Intent, Emotional Trigger, Purchase Motivation, Urgency Level",
  "isHandmade": true,
  "isCustomizable": true,
  "scores": {
    "demand": 80,
    "margin": 70,
    "competition": 40,
    "trend": 90
  },
  "consensus": {
    "agreedCount": 4,
    "totalProviders": 5,
    "confidence": 95
  },
  "seoInsight": "Tactical SEO gap to exploit",
  "serpSimulation": {
    "top10Pattern": "What the top 10 currently look like (e.g., 'All using white backgrounds and cursive fonts')",
    "thumbnailGap": "How to visually stand out (e.g., 'Use dark wood background to contrast')",
    "titleGap": "Keywords competitors are missing"
  },
  "actionPriority": [
    {
      "task": "Strict instruction on what to change first (e.g. 'Drop price to $14.99')",
      "priority": "Urgent",
      "impact": "Why this matters (e.g. 'Undercuts the primary cluster')"
    }
  ],
  "conversionFunnel": {
    "trafficLeak": "Why are people viewing but not buying? (e.g. 'No sizing chart in images')",
    "conversionFix": "How to fix it (e.g. 'Add a visual scale reference in image #2')"
  },
  "personaTargeting": {
    "primaryPersona": "Who exactly is buying this? (e.g. 'Stressed dog moms')",
    "psychographicKeywords": ["keyword 1", "keyword 2", "keyword 3"]
  },
  "abTestSimulation": [
    {
      "variable": "Thumbnail",
      "action": "Test dark background vs light background",
      "predictedLift": "+15% CTR"
    }
  ]
}`;

    const query = `Analyze this product: ${productData.title}`;

    return withRetry(
      async (modelId) => {
        // Use the dynamically provided modelId from the retry chain
        const { getCline } = await import('./cline');
        const response = await getCline().chat.completions.create({
          model: modelId || "nousresearch/hermes-3-llama-3.1-405b:free",
          messages: [
            { role: 'system', content: PROMPT },
            { role: 'user', content: query }
          ],
          temperature: 0.8
        });

        const content = response.choices[0]?.message?.content || '';
        if (!content) throw new Error("No content received from AI");

        const parsed = JSON.parse(extractJSON(content));
        
        return {
          ...parsed,
          summary: parsed.verdict + " " + parsed.summary, // Combine for UI compatibility
          scores: parsed.scores || { demand: 70, margin: 60, competition: 50, trend: 75 },
          consensus: parsed.consensus || { agreedCount: 4, totalProviders: 5, confidence: 80 },
          seoInsight: parsed.seoInsight || "Optimize for long-tail high-intent keywords."
        };
      },
      { maxRetries: 1, baseDelayMs: 500 }
    );
  }

  static async runFullAnalysis(keyword: string): Promise<{ product: any, analysis: DetailedAnalysis }> {
    const PROMPT = `
# ETSY SNIPER v2.0 — SINGLE-PASS ENGINE

You are an Etsy Market Intelligence Engine.
The user wants an analysis for the niche/keyword: "${keyword}".

TASK 1: Generate ONE highly realistic, top-selling product that exists in this niche.
TASK 2: Perform a brutal, professional analysis of this product's market potential.

You MUST output ONLY a valid JSON object. No other text.

{
  "product": {
    "title": "Realistic Etsy Product Title",
    "price": 24.99,
    "currency": "USD",
    "favorites": 1250,
    "views": 4500,
    "tags": ["tag1", "tag2"],
    "shopName": "ExampleShop",
    "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500"
  },
  "analysis": {
    "verdict": "1-LINE VERDICT",
    "opportunityStatus": "WINNER | HYPER WINNER | AVOID",
    "revenueForecast": "Stability & Scaling",
    "riskEvaluation": "Risks",
    "sniperStrategy": "Strategy steps",
    "trendScore": 85,
    "competitionLevel": "Low | Medium | High",
    "decision": "SELL | AVOID",
    "summary": "Market Reality",
    "buyerPsychology": "Psychology",
    "isHandmade": true,
    "isCustomizable": false,
    "scores": { "demand": 80, "margin": 70, "competition": 40, "trend": 90 },
    "consensus": { "agreedCount": 4, "totalProviders": 5, "confidence": 95 },
    "seoInsight": "SEO gaps",
    "serpSimulation": { "top10Pattern": "...", "thumbnailGap": "...", "titleGap": "..." },
    "actionPriority": [ { "task": "...", "priority": "Urgent", "impact": "..." } ],
    "conversionFunnel": { "trafficLeak": "...", "conversionFix": "..." },
    "personaTargeting": { "primaryPersona": "...", "psychographicKeywords": ["k1"] },
    "abTestSimulation": [ { "variable": "...", "action": "...", "predictedLift": "..." } ]
  }
}`;

    return withRetry(
      async (modelId) => {
        const { getCline } = await import('./cline');
        const response = await getCline().chat.completions.create({
          model: modelId || "google/gemini-2.0-flash-lite-preview-02-05:free",
          messages: [{ role: 'system', content: PROMPT }],
          temperature: 0.8
        });

        const content = response.choices[0]?.message?.content || '';
        const parsed = JSON.parse(extractJSON(content));
        
        parsed.analysis.summary = parsed.analysis.verdict + " " + parsed.analysis.summary;
        return parsed;
      },
      { maxRetries: 1, baseDelayMs: 500 }
    );
  }
}

