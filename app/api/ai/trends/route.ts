import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getGoogleTrendsData } from '@/lib/ai/google-trends'
import { consensusTrends } from '@/lib/ai/consensus'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Trends API — Combines REAL Google Trends data with AI analysis.
 * Now uses Multi-AI Consensus in parallel (Groq, Gemini, DeepSeek, Qwen, Claude).
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

    // Step 2: Get Multi-AI Consensus analysis
    const consensusResult = await consensusTrends(niche)

    if (!consensusResult) {
      return NextResponse.json(
        { error: 'All AI providers are temporarily unavailable.' },
        { status: 503 }
      )
    }

    // Step 3: Merge Google Trends real data into the response
    return NextResponse.json({
      success: true,
      engine: consensusResult.engine,
      niche: consensusResult.niche,
      trends: consensusResult.trends,
      googleTrendsData: googleTrends,
      googleTrendsQuery: searchTerm,
      googleTrendsError,
      dataSources: {
        primary: 'Google Trends API (google-trends-api npm package)',
        secondary: `${consensusResult.engine} AI Models`,
        method: 'Real Google Trends data is fetched via the official Google Trends scraping API. AI models analyze e-commerce platform data (Etsy, Amazon, eBay search volumes) and cross-reference with Google Trends patterns in parallel.',
        transparency: 'Google Trends data is real and verifiable. AI insights are model-generated and should be validated independently.',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[Trends API] Error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}

