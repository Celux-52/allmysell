import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Please log in to view trends' }, { status: 401 })
    }

    const { niche } = await request.json().catch(() => ({ niche: undefined }))

    // Try providers in order: Groq → Gemini
    try {
      const { analyzeTrends } = await import('@/lib/ai/groq')
      const trends = await analyzeTrends(niche)
      return NextResponse.json({
        success: true,
        engine: 'groq',
        niche: niche || 'general',
        trends,
        timestamp: new Date().toISOString(),
      })
    } catch (groqErr: any) {
      console.warn('[Trends] Groq failed, trying Gemini:', groqErr.message)
      try {
        const { analyzeTrends: geminiTrends } = await import('@/lib/ai/gemini')
        const trends = await geminiTrends(niche)
        return NextResponse.json({
          success: true,
          engine: 'gemini',
          niche: niche || 'general',
          trends,
          timestamp: new Date().toISOString(),
        })
      } catch (geminiErr: any) {
        console.error('[Trends] All AI providers failed:', geminiErr.message)
        return NextResponse.json(
          { error: 'AI trend analysis is currently unavailable. Please try again later.' },
          { status: 503 }
        )
      }
    }
  } catch (error: any) {
    console.error('[Trends API] Error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
