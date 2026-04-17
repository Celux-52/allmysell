import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { findProblemSolutions, researchProducts } from '@/lib/ai/groq'

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
    let engine = 'groq'

    if (mode === 'problem') {
      try {
        results = await findProblemSolutions(query.trim())
      } catch (err: any) {
        console.error('Groq Problem AI error:', err.message)
        return NextResponse.json({ error: 'Groq API hatası: ' + err.message }, { status: 503 })
      }
    } else {
      try {
        results = await researchProducts(query.trim())
      } catch (err: any) {
        console.error('Groq Research AI error:', err.message)
        return NextResponse.json({ error: 'Groq API hatası: ' + err.message }, { status: 503 })
      }
    }

    if (!results) {
      return NextResponse.json(
        { error: 'Yapay zeka analiz servisi şu an kullanılamıyor. Lütfen GROQ_API_KEY\'inizi kontrol edin.' },
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
    console.error('AI Research API error:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
