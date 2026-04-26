import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { consensusResearch } from '@/lib/ai/consensus'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Longer timeout for multi-AI consensus

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Please log in to use AI research' }, { status: 401 })
    }

    const { query, mode = 'product' } = await request.json()

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return NextResponse.json({ error: 'Search query must be at least 3 characters' }, { status: 400 })
    }

    // Use the multi-AI consensus engine
    const results = await consensusResearch(query.trim())

    if (!results || results.products.length === 0) {
      return NextResponse.json(
        { error: 'No results found. All AI providers may be temporarily unavailable.' },
        { status: 503 }
      )
    }

    return NextResponse.json({
      success: true,
      engine: results.consensusMethod,
      providers: results.aiProviders,
      query: query.trim(),
      mode,
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('[Research API] Error:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
