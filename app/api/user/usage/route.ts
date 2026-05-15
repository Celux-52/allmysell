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

    // --- ADMIN OVERRIDE ---
    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
    const isUserAdmin = user.email && adminEmails.includes(user.email.toLowerCase())
    
    const status = isUserAdmin ? 'PRO_AGENCY' : (profile?.subscriptionStatus || 'FREE')

    const searchCount = await prisma.searchHistory.count({
      where: {
        userId: user.id,
        queryType: 'general',
        createdAt: { gte: startOfMonth }
      }
    })

    const etsyCount = await prisma.searchHistory.count({
      where: {
        userId: user.id,
        queryType: 'etsy',
        createdAt: { gte: startOfMonth }
      }
    })

    const GENERAL_LIMITS: Record<string, number> = {
      'FREE': 3,
      'STARTER': 50,
      'GROWTH': 75,
      'PRO_AGENCY': 125
    }

    const ETSY_LIMITS: Record<string, number> = {
      'FREE': 1,
      'STARTER': 50,
      'GROWTH': 75,
      'PRO_AGENCY': 125
    }

    return NextResponse.json({
      status,
      general: {
        count: searchCount,
        limit: GENERAL_LIMITS[status] || 3,
        remaining: Math.max(0, (GENERAL_LIMITS[status] || 3) - searchCount)
      },
      etsy: {
        count: etsyCount,
        limit: ETSY_LIMITS[status] || 1,
        remaining: Math.max(0, (ETSY_LIMITS[status] || 1) - etsyCount)
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
