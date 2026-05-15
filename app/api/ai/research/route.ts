import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { consensusResearch } from '@/lib/ai/consensus'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Longer timeout for multi-AI consensus

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Please log in to use AI research.' }, { status: 401 })
    }

    const { query, mode = 'product' } = await request.json()

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return NextResponse.json({ error: 'Search query must be at least 3 characters.' }, { status: 400 })
    }

    // --- TIERED RATE LIMITING ---
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    // Default status - will be overridden if DB check succeeds
    let status = 'FREE'

    try {
      // 1. Get user profile for subscription status
      const profile = await prisma.profile.findUnique({
        where: { id: user.id },
        select: { subscriptionStatus: true }
      })

      // --- ADMIN OVERRIDE ---
      const envAdmins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
      const adminEmails = [...envAdmins, 'melih20052005gs@gmail.com']
      const isUserAdmin = user.email && adminEmails.includes(user.email.toLowerCase())

      status = isUserAdmin ? 'PRO_AGENCY' : (profile?.subscriptionStatus || 'FREE')

      // 2. Count searches this month
      const searchCount = await prisma.searchHistory.count({
        where: {
          userId: user.id,
          createdAt: { gte: startOfMonth }
        }
      })

      // 3. Define limits
      const LIMITS: Record<string, number> = {
        'FREE': 3,
        'STARTER': 50,
        'GROWTH': 75,
        'PRO_AGENCY': 125
      }

      const limit = LIMITS[status] || 3

      // --- DEMO OVERRIDE: sellerxturkiye@gmail.com ---
      if (user.email === 'sellerxturkiye@gmail.com') {
        const trialEndDate = new Date('2026-05-12T18:51:00Z');
        if (new Date() < trialEndDate) {
          const DEMO_LIMIT = 5;
          if (searchCount >= DEMO_LIMIT) {
            return NextResponse.json(
              {
                error: `Demo limit reached (5/5 searches). Please contact admin for full access.`,
                code: 'LIMIT_REACHED',
                currentPlan: 'DEMO',
                limit: DEMO_LIMIT
              },
              { status: 429 }
            )
          }
          status = 'STARTER'; // Grant starter tier power for demo
        }
      }

      if (searchCount >= limit) {
        return NextResponse.json(
          {
            error: `You have reached your monthly search limit for the ${status} plan (${limit}).`,
            code: 'LIMIT_REACHED',
            currentPlan: status,
            limit: limit
          },
          { status: 429 }
        )
      }
    } catch (dbError) {
      console.warn('[Research API] Rate limit check failed:', dbError)
    }

    // Use the multi-AI consensus engine
    let results: any = null
    let researchError: string | null = null

    try {
      results = await consensusResearch(query.trim(), status)
    } catch (researchErr: any) {
      researchError = researchErr?.message || 'Unknown error'
      console.error('[Research API] Research error:', researchErr)
    }

    if (!results || results.products.length === 0) {
      return NextResponse.json(
        {
          error: 'AI research service is temporarily unavailable.',
          details: researchError || 'All AI providers failed to return results.',
          suggestion: 'Please try again in a few minutes or use a more specific search query.'
        },
        { status: 503 }
      )
    }

    // --- SAVE TO SEARCH HISTORY ---
    try {
      // Save search history with userId
      await prisma.searchHistory.create({
        data: {
          userId: user.id,
          query: query.trim(),
          queryType: mode,
          resultCount: results.products.length,
          results: results as any, // Store JSON
        }
      })
    } catch (dbError) {
      console.warn('[Research API] Could not save search history:', dbError)
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
