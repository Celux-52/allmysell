import OpenAI from 'openai'

let groqClient: OpenAI | null = null

export function getGroq(): OpenAI {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      throw new Error('Neither GROQ_API_KEY nor OPENROUTER_API_KEY is set. Please provide one in your .env file.')
    }
    
    const isOpenRouter = !process.env.GROQ_API_KEY && !!process.env.OPENROUTER_API_KEY
    
    groqClient = new OpenAI({ 
      apiKey,
      baseURL: isOpenRouter ? "https://openrouter.ai/api/v1" : "https://api.groq.com/openai/v1",
      defaultHeaders: isOpenRouter ? {
        "HTTP-Referer": "https://allmysell.com",
        "X-Title": "AllMySell"
      } : undefined
    })
  }
  return groqClient
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

function safeParseJSON<T>(text: string, fallback: T): T {
  try {
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    return JSON.parse(cleaned) as T
  } catch {
    console.error('[Groq] Failed to parse JSON response')
    return fallback
  }
}

export async function researchProducts(query: string): Promise<ProductResearchResult> {
  const groq = getGroq()

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
- ONLY return valid JSON without markdown wrapping.`

  const isOpenRouter = !process.env.GROQ_API_KEY && !!process.env.OPENROUTER_API_KEY
  
  // Use a reliable free model list for OpenRouter
  const model = isOpenRouter 
    ? 'meta-llama/llama-3.2-3b-instruct:free' // Highly available and fast
    : 'llama-3.3-70b-versatile'

  const response = await groq.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: query }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7
  })

  const text = response.choices[0]?.message?.content || '{}'
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
  const groq = getGroq()

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
- Volume format: "XXK+" for thousands
- Growth format: "+XX%" or "-XX%"
- CRITICAL: Provide real world verifiable sources/URLs in the "sources" fields to back your data
- ONLY return valid JSON without markdown wrapping.`

  const isOpenRouter = !process.env.GROQ_API_KEY && !!process.env.OPENROUTER_API_KEY
  const model = isOpenRouter ? 'meta-llama/llama-3.2-3b-instruct:free' : 'llama-3.3-70b-versatile'

  const response = await groq.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7
  })

  const text = response.choices[0]?.message?.content || '{}'
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
  const groq = getGroq()

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

Return 3-5 solutions. ONLY return valid JSON without markdown wrapping.`

  const isOpenRouter = !process.env.GROQ_API_KEY && !!process.env.OPENROUTER_API_KEY
  const model = isOpenRouter ? 'meta-llama/llama-3.2-3b-instruct:free' : 'llama-3.3-70b-versatile'

  const response = await groq.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7
  })

  const text = response.choices[0]?.message?.content || '{}'
  return safeParseJSON<ProblemSolutionResult>(text, { problem, solutions: [], marketSize: 'Unknown', recommendation: 'Failed to parse AI response.' })
}

export async function generateBlogContent(topic: string): Promise<{ title: string; content: string; excerpt: string; tags: string[] }> {
  const groq = getGroq()

  const prompt = `You are a world-class e-commerce investigative journalist and market analyst. 
Write a high-authority, SEO-optimized blog post based on the following viral trend data.

DATA:
"${topic}"

STRUCTURE REQUIREMENTS:
1. Catchy, high-CTR Title.
2. Hook Intro: Why this is viral right now.
3. The "Why It Works" Analysis: Deep psychological and market triggers.
4. Profit Potential: Analysis of margins and demand.
5. Marketing Strategy: How to sell this using the viral video as a base.
6. Target Audience Breakdown.
7. Final Verdict (SELL or AVOID).

FORMAT: 
- Use professional yet engaging tone.
- Use Markdown for the content (H1, H2, Bold, Lists).
- 800-1200 words.

Return JSON with: 
{ 
  "title": "Professional SEO Title", 
  "content": "# Full Article Content in Markdown", 
  "excerpt": "Compelling 160-character meta description.", 
  "tags": ["ecommerce", "dropshipping", "viral-trends", "niche-analysis"] 
}

ONLY return valid JSON format.`

  const isOpenRouter = !process.env.GROQ_API_KEY && !!process.env.OPENROUTER_API_KEY
  const model = isOpenRouter ? 'meta-llama/llama-3.2-3b-instruct:free' : 'llama-3.3-70b-versatile'

  const response = await groq.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.8
  })

  const text = response.choices[0]?.message?.content || '{}'
  return safeParseJSON(text, { title: '', content: '', excerpt: '', tags: [] })
}
