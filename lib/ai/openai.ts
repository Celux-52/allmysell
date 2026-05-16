import OpenAI from 'openai'

let openaiClient: OpenAI | null = null

export function getOpenAI(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables')
    }
    openaiClient = new OpenAI({ apiKey })
  }
  return openaiClient
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
  const openai = getOpenAI()

  const systemPrompt = `You are an expert e-commerce product research analyst. Your job is to analyze market trends, competition, and profitability to find winning products for dropshipping and e-commerce sellers.

When given a query (problem, niche, or category), you must return a JSON response with exactly this structure:
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
      "score": 0-100,
      "description": "Brief product description and why it sells well",
      "platforms": ["AliExpress", "CJ Dropshipping", "Amazon", etc.],
      "whyItWorks": "Market analysis of why this product has potential",
      "targetAudience": "Who buys this product",
      "marketingTips": ["Tip 1", "Tip 2", "Tip 3"],
      "sources": ["URL or name of data source 1", "Source 2"]
    }
  ],
  "summary": "Brief overall market analysis for this niche",
  "sources": ["General market research source 1", "Source 2"]
}

Rules:
- Return 3-5 products per query
- Score is 0-100 based on overall potential (margin, demand, competition)
- Be realistic with pricing based on actual market data
- Focus on products suitable for dropshipping (lightweight, high perceived value)
- Include specific sourcing platforms
- Provide actionable marketing tips
- CRITICAL: Provide real world verifiable sources/URLs in the "sources" fields to back your data
- ONLY return valid JSON, no markdown or extra text`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Find winning products for: "${query}"` },
    ],
    temperature: 0.7,
    max_tokens: 3000,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('No response from AI')
  }

  return JSON.parse(content) as ProductResearchResult
}

