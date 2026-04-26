import { GoogleGenerativeAI } from '@google/generative-ai'

let geminiClient: GoogleGenerativeAI | null = null

export function getGemini(): GoogleGenerativeAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set. Get one free at aistudio.google.com/apikey')
    }
    geminiClient = new GoogleGenerativeAI(apiKey)
  }
  return geminiClient
}

function safeParseJSON<T>(text: string, fallback: T): T {
  try {
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    return JSON.parse(cleaned) as T
  } catch {
    console.error('[Gemini] Failed to parse JSON response')
    return fallback
  }
}

export interface ProductResearchResult {
  products: Array<{
    name: string
    category: string
    wholesalePrice: string
    retailPrice: string
    profitMargin: string
    competition: 'Low' | 'Medium' | 'High'
    trend: 'Rising' | 'Stable' | 'Declining'
    score: number
    description: string
    platforms: string[]
    whyItWorks: string
    targetAudience: string
    marketingTips: string[]
    sources: string[]
  }>
  summary: string
}

export async function researchProducts(query: string): Promise<ProductResearchResult> {
  const gemini = getGemini()
  const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `You are an expert e-commerce product research analyst. Your job is to analyze market trends, competition, and profitability to find winning products for dropshipping and e-commerce sellers.

When given a query, return a JSON response with exactly this structure:
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
      "description": "Brief description",
      "platforms": ["AliExpress", "CJ Dropshipping"],
      "whyItWorks": "Market analysis",
      "targetAudience": "Who buys this",
      "marketingTips": ["Tip 1", "Tip 2"],
      "sources": ["Current trending url 1", "Source 2"]
    }
  ],
  "summary": "Brief overall market analysis for this niche"
}

Rules:
- Return 3-5 products for query: "${query}"
- CRITICAL: Provide real world verifiable sources/URLs in the "sources" fields to back your data
- ONLY return valid JSON.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return safeParseJSON<ProductResearchResult>(text, { products: [], summary: 'Failed to parse AI response.' })
}

export interface TrendAnalysisResult {
  categories: Array<{
    name: string
    emoji: string
    trends: Array<{
      keyword: string
      volume: string
      growth: string
      status: 'rising' | 'stable' | 'declining'
      insight: string
    }>
  }>
  summary: string
  topOpportunity: string
  sources: string[]
}

export async function analyzeTrends(niche?: string): Promise<TrendAnalysisResult> {
  const gemini = getGemini()
  const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `You are an expert e-commerce trend analyst. ${niche ? `Analyze trends for the "${niche}" niche.` : 'Analyze current trending product categories in e-commerce.'}

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
          "status": "rising|stable|declining",
          "insight": "Brief market insight about this trend"
        }
      ]
    }
  ],
  "summary": "Overall market analysis",
  "topOpportunity": "The single best opportunity right now and why",
  "sources": ["URL or name of real source 1", "Source 2"]
}

Rules:
- Include 3 categories: Hot/Rising, Stable Sellers, and one niche-specific
- Each category should have 3-5 trends
- Use realistic volume and growth numbers based on current market data
- CRITICAL: Provide real world verifiable sources/URLs in the "sources" fields to back your data
- ONLY return valid JSON, no markdown or extra text`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return safeParseJSON<TrendAnalysisResult>(text, { categories: [], summary: 'Failed to parse AI response.', topOpportunity: '', sources: [] })
}

export interface ProblemSolutionResult {
  problem: string
  solutions: Array<{
    product: string
    description: string
    whyItSolves: string
    estimatedDemand: 'High' | 'Medium' | 'Low'
    competitionLevel: 'Low' | 'Medium' | 'High'
    suggestedPrice: string
    sourcingTip: string
  }>
  marketSize: string
  recommendation: string
}

export async function findProblemSolutions(problem: string): Promise<ProblemSolutionResult> {
  const gemini = getGemini()
  const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `You are an expert at the Problem-Solution product research method for e-commerce. 

Given this customer problem: "${problem}"

Find product solutions that solve this problem. Return JSON:
{
  "problem": "Restated problem clearly",
  "solutions": [
    {
      "product": "Product name",
      "description": "What this product does",
      "whyItSolves": "How it directly addresses the problem",
      "estimatedDemand": "High|Medium|Low",
      "competitionLevel": "Low|Medium|High",
      "suggestedPrice": "$XX-XX retail",
      "sourcingTip": "Where to find this product"
    }
  ],
  "marketSize": "Estimated market size/demand",
  "recommendation": "Top recommendation and action step"
}

Return 3-5 solutions. ONLY return valid JSON.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return safeParseJSON<ProblemSolutionResult>(text, { problem, solutions: [], marketSize: 'Unknown', recommendation: 'Failed to parse AI response.' })
}

export async function generateBlogContent(topic: string): Promise<{ title: string; content: string; excerpt: string; tags: string[] }> {
  const gemini = getGemini()
  const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `You are a professional e-commerce blog writer. Write engaging, SEO-optimized blog posts about e-commerce, dropshipping, and product trends. 

Topic: "${topic}"

Return JSON with: 
{ 
  "title": "Inspiring Title", 
  "content": "# Blog Content\\n\\n(markdown format, 800+ words)", 
  "excerpt": "A short 2 sentence SEO description.", 
  "tags": ["ecommerce", "trends"] 
}

ONLY return valid JSON format no markdown tags around it.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return safeParseJSON(text, { title: '', content: '', excerpt: '', tags: [] })
}
