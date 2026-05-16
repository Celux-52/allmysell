import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { consensusResearch } from '@/lib/ai/consensus'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 })

    const { query, mode = 'product' } = await request.json()
    if (!query) return NextResponse.json({ error: 'Query required.' }, { status: 400 })

    // --- NON-BLOCKING RATE LIMIT CHECK ---
    let tier = 'FREE'
    try {
      const profilePromise = prisma.profile.findUnique({
        where: { id: user.id },
        select: { subscriptionStatus: true }
      })
      
      // Give DB only 3 seconds to respond, otherwise proceed as FREE
      const profile = await Promise.race([
        profilePromise,
        new Promise<null>(r => setTimeout(() => r(null), 3000))
      ])

      const adminEmails = ['melih20052005gs@gmail.com', (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')]
      const isUserAdmin = user.email && adminEmails.some(e => user.email?.toLowerCase().includes(e.toLowerCase()))
      tier = isUserAdmin ? 'PRO_AGENCY' : (profile?.subscriptionStatus || 'FREE')
    } catch (e) {
      console.warn('[Research API] DB Check failed, proceeding as FREE:', e)
    }

    // --- SMART CACHING (Fast attempt) ---
    try {
      const existingSearch = await Promise.race([
        prisma.searchHistory.findFirst({
          where: {
            query: { equals: query.trim(), mode: 'insensitive' },
            createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
          }
        }),
        new Promise<null>(r => setTimeout(() => r(null), 2000))
      ])

      if (existingSearch && existingSearch.results) {
        return NextResponse.json({
          success: true,
          engine: 'Database Cache',
          results: existingSearch.results,
          cached: true
        })
      }
    } catch (e) {}

    // --- RUN RESEARCH ---
    let results: any = null
    try {
      results = await consensusResearch(query.trim(), tier)
    } catch (err: any) {
      console.error('[Research API] Logic error:', err)
      return NextResponse.json({ error: 'Research failed.', details: err.message }, { status: 503 })
    }

    if (!results || !results.products || results.products.length === 0) {
      return NextResponse.json({ error: 'No products found.', details: 'AI models returned no data.' }, { status: 503 })
    }

    // --- ASYNC SAVE (Don't wait for DB to finish) ---
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: query.trim(),
        queryType: mode,
        resultCount: results.products.length,
        results: results as any,
      }
    }).catch(e => console.warn('[Research API] Silent DB save failure:', e))

    return NextResponse.json({
      success: true,
      engine: results.consensusMethod || 'AI Stable Engine',
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[Research API] Critical error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
