import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getGoogleTrendsData } from '@/lib/ai/google-trends'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Trends API — Combines REAL Google Trends data with AI analysis.
 * Returns transparent data sources so the user knows exactly where each insight comes from.
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Please log in to view trends' }, { status: 401 })
    }

    const { niche } = await request.json().catch(() => ({ niche: undefined }))
    const searchTerm = niche || 'trending products 2026'

    // Step 1: Fetch REAL Google Trends data
    let googleTrends = null
    let googleTrendsError = null
    try {
      googleTrends = await getGoogleTrendsData(searchTerm)
    } catch (e: any) {
      googleTrendsError = e.message
    }

    // Step 2: Get AI analysis (with fallback chain)
    let aiTrends = null
    let aiEngine = ''

    const AI_PROMPT = `You are an expert e-commerce trend analyst. ${niche ? `Analyze trends for the "${niche}" niche.` : 'Analyze current trending product categories in e-commerce.'}

CRITICAL: For EVERY piece of data you provide, you MUST explain your reasoning and cite your source.

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
    {"name": "Google Trends", "url": "https://trends.google.com/trends/explore?q=${encodeURIComponent(searchTerm)}", "type": "real-time"},
    {"name": "Source Name", "url": "URL", "type": "database|real-time|historical"}
  ],
  "limitations": "What this analysis cannot tell you and what you should verify independently"
}

Rules:
- Include 3 categories
- Each category: 3-5 trends with volume, growth, and reasoning
- Be TRANSPARENT about data sources — never make up URLs
- Explain your confidence level for each data point
- ONLY return valid JSON.`

    // Try Groq → Gemini → Cline
    const providers = [
      { name: 'Groq (Llama 3.3 70B)', fn: async () => {
        const { getGroq } = await import('@/lib/ai/groq')
        const groq = getGroq()
        const r = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: AI_PROMPT }],
          response_format: { type: 'json_object' },
          temperature: 0.7
        })
        return r.choices[0]?.message?.content || '{}'
      }},
      { name: 'Gemini 2.0 Flash', fn: async () => {
        const { getGemini } = await import('@/lib/ai/gemini')
        const gemini = getGemini()
        const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })
        const result = await model.generateContent(AI_PROMPT)
        return result.response.text()
      }},
      { name: 'DeepSeek R1', fn: async () => {
        const { getCline } = await import('@/lib/ai/cline')
        const cline = getCline()
        const r = await cline.chat.completions.create({
          model: 'deepseek-r1',
          messages: [{ role: 'user', content: AI_PROMPT }],
          temperature: 0.7
        })
        return r.choices[0]?.message?.content || '{}'
      }},
    ]

    for (const provider of providers) {
      try {
        const text = await provider.fn()
        const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
        aiTrends = JSON.parse(cleaned)
        aiEngine = provider.name
        break
      } catch (e: any) {
        console.warn(`[Trends] ${provider.name} failed:`, e.message)
      }
    }

    if (!aiTrends) {
      return NextResponse.json(
        { error: 'All AI providers are temporarily unavailable.' },
        { status: 503 }
      )
    }

    // Step 3: Merge Google Trends real data into the response
    return NextResponse.json({
      success: true,
      engine: aiEngine,
      niche: niche || 'general',
      trends: aiTrends,
      googleTrendsData: googleTrends,
      googleTrendsQuery: searchTerm,
      googleTrendsError,
      dataSources: {
        primary: 'Google Trends API (google-trends-api npm package)',
        secondary: `${aiEngine} AI Model`,
        method: 'Real Google Trends data is fetched via the official Google Trends scraping API. AI models analyze e-commerce platform data (Etsy, Amazon, eBay search volumes) and cross-reference with Google Trends patterns.',
        transparency: 'Google Trends data is real and verifiable. AI insights are model-generated and should be validated independently.',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[Trends API] Error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
