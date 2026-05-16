import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // --- RESILIENT DB FETCH ---
    let usage: any = { status: 'FREE', general: { count: 0, limit: 3, remaining: 3 }, etsy: { count: 0, limit: 10, remaining: 10 } }
    
    try {
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      // Use a timeout for Prisma to prevent hanging
      const [profile, searchCount] = await Promise.all([
        Promise.race([
          prisma.profile.findUnique({ where: { id: user.id } }),
          new Promise<null>(r => setTimeout(() => r(null), 2000))
        ]),
        Promise.race([
          prisma.searchHistory.count({
            where: {
              userId: user.id,
              createdAt: { gte: startOfMonth }
            }
          }),
          new Promise<number>(r => setTimeout(() => r(0), 2000))
        ])
      ])

      const tier = profile?.subscriptionStatus || 'FREE'
      const LIMITS: Record<string, number> = {
        'FREE': 3,
        'STARTER': 50,
        'GROWTH': 75,
        'PRO_AGENCY': 125
      }

      usage = {
        status: tier,
        general: {
          count: searchCount || 0,
          limit: LIMITS[tier] || 3,
          remaining: Math.max(0, (LIMITS[tier] || 3) - (searchCount || 0))
        },
        etsy: {
          count: 0,
          limit: 10,
          remaining: 10
        }
      }
    } catch (dbError) {
      console.warn('[Usage API] Database fallback triggered:', dbError)
      // High-quality fallback
      usage = {
        status: 'FREE',
        general: { count: 0, limit: 3, remaining: 3 },
        etsy: { count: 0, limit: 10, remaining: 10 }
      }
    }

    return NextResponse.json(usage)
  } catch (error: any) {
    console.error('[Usage API] Critical error:', error)
    return NextResponse.json({ count: 0, limit: 3, tier: 'FREE' }) // Never fail
  }
}
