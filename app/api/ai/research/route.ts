import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Please log in to use AI research' }, { status: 401 })
    }

    const { query, mode = 'product' } = await request.json()

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return NextResponse.json({ error: 'Search query must be at least 3 characters' }, { status: 400 })
    }

    let results: any = null
    let engine = 'unknown'

    // Try providers in order: Groq → Gemini → Cline (fallback chain)
    if (mode === 'problem') {
      // Problem-Solution mode
      try {
        const { findProblemSolutions } = await import('@/lib/ai/groq')
        results = await findProblemSolutions(query.trim())
        engine = 'groq'
      } catch (groqErr: any) {
        console.warn('[Research] Groq failed for problem mode, trying Gemini:', groqErr.message)
        try {
          const { findProblemSolutions: geminiFPS } = await import('@/lib/ai/gemini')
          results = await geminiFPS(query.trim())
          engine = 'gemini'
        } catch (geminiErr: any) {
          console.warn('[Research] Gemini also failed:', geminiErr.message)
          try {
            const { researchProductsWithCline } = await import('@/lib/ai/cline')
            results = await researchProductsWithCline(query.trim())
            engine = 'cline'
          } catch (clineErr: any) {
            console.error('[Research] All AI providers failed:', clineErr.message)
            return NextResponse.json(
              { error: 'All AI providers are currently unavailable. Please try again later.' },
              { status: 503 }
            )
          }
        }
      }
    } else {
      // Product research mode
      try {
        const { researchProducts } = await import('@/lib/ai/groq')
        results = await researchProducts(query.trim())
        engine = 'groq'
      } catch (groqErr: any) {
        console.warn('[Research] Groq failed, trying Gemini:', groqErr.message)
        try {
          const { researchProducts: geminiRP } = await import('@/lib/ai/gemini')
          results = await geminiRP(query.trim())
          engine = 'gemini'
        } catch (geminiErr: any) {
          console.warn('[Research] Gemini also failed, trying Cline:', geminiErr.message)
          try {
            const { researchProductsWithCline } = await import('@/lib/ai/cline')
            results = await researchProductsWithCline(query.trim())
            engine = 'cline'
          } catch (clineErr: any) {
            console.error('[Research] All AI providers failed:', clineErr.message)
            return NextResponse.json(
              { error: 'All AI providers are currently unavailable. Please try again later.' },
              { status: 503 }
            )
          }
        }
      }
    }

    if (!results) {
      return NextResponse.json(
        { error: 'AI analysis service is temporarily unavailable. Please check your API keys.' },
        { status: 503 }
      )
    }

    return NextResponse.json({
      success: true,
      engine,
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
