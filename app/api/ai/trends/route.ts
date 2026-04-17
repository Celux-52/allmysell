import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeTrends } from '@/lib/ai/groq'

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

    try {
      const trends = await analyzeTrends(niche)
      return NextResponse.json({
        success: true,
        engine: 'groq',
        niche: niche || 'general',
        trends,
        timestamp: new Date().toISOString(),
      })
    } catch (err: any) {
      console.error('Trends Groq AI error:', err.message)
      return NextResponse.json(
        { error: 'Groq API hatası: ' + err.message },
        { status: 503 }
      )
    }
  } catch (error: any) {
    console.error('Trends API error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
