import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Admin check
    const isAdmin = user.user_metadata?.role === 'admin' ||
                     user.email === 'melih@allmysell.com' ||
                     user.email === 'yunus@allmysell.com'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { topic } = await request.json()
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // Try providers in order: Groq → Gemini
    try {
      const { generateBlogContent } = await import('@/lib/ai/groq')
      const content = await generateBlogContent(topic)
      return NextResponse.json({ success: true, engine: 'groq', ...content })
    } catch (groqErr: any) {
      console.warn('[Blog] Groq failed, trying Gemini:', groqErr.message)
      try {
        const { generateBlogContent: geminiGen } = await import('@/lib/ai/gemini')
        const content = await geminiGen(topic)
        return NextResponse.json({ success: true, engine: 'gemini', ...content })
      } catch (geminiErr: any) {
        console.error('[Blog] All AI providers failed:', geminiErr.message)
        return NextResponse.json(
          { error: 'AI content generation is currently unavailable. Please try again later.' },
          { status: 503 }
        )
      }
    }
  } catch (error: any) {
    console.error('[Blog API] Error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
