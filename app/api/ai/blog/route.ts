import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateBlogContent } from '@/lib/ai/groq'

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

    try {
      const content = await generateBlogContent(topic)
      return NextResponse.json({ success: true, ...content })
    } catch (aiError: any) {
      console.error('Blog AI error:', aiError.message)
      return NextResponse.json(
        { error: 'AI content generation unavailable. Check your OPENAI_API_KEY.' },
        { status: 503 }
      )
    }
  } catch (error: any) {
    console.error('AI Blog error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
