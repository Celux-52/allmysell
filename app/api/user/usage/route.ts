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

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: { subscriptionStatus: true }
    })

    const status = profile?.subscriptionStatus || 'FREE'

    const searchCount = await prisma.searchHistory.count({
      where: {
        userId: user.id,
        createdAt: { gte: startOfMonth }
      }
    })

    const LIMITS: Record<string, number> = {
      'FREE': 3,
      'STARTER': 50,
      'GROWTH': 200,
      'PRO_AGENCY': 1000000
    }

    return NextResponse.json({
      status,
      searchCount,
      limit: LIMITS[status] || 3,
      remaining: Math.max(0, (LIMITS[status] || 3) - searchCount)
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
