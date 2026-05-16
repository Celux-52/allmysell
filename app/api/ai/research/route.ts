import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { consensusResearch } from '@/lib/ai/consensus'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel'in izin verdiği maksimum süre

export async function POST(request: NextRequest) {
  try {
    // 1. Kullanıcı Kontrolü
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 })

    const { query, mode = 'product' } = await request.json()
    if (!query) return NextResponse.json({ error: 'Query required.' }, { status: 400 })

    // 2. Veritabanından Profil ve Kota Kontrolü (Orijinal Akış)
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: { subscriptionStatus: true }
    })

    const searchCount = await prisma.searchHistory.count({
      where: {
        userId: user.id,
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      }
    })

    const adminEmails = ['melih20052005gs@gmail.com', (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')]
    const isUserAdmin = user.email && adminEmails.some(e => user.email?.toLowerCase().includes(e.toLowerCase()))
    const status = isUserAdmin ? 'PRO_AGENCY' : (profile?.subscriptionStatus || 'FREE')

    // 3. Akıllı Önbellek (Önce DB'ye bak)
    const existingSearch = await prisma.searchHistory.findFirst({
      where: {
        query: { equals: query.trim(), mode: 'insensitive' },
        createdAt: { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
      }
    })

    if (existingSearch && existingSearch.results) {
      return NextResponse.json({
        success: true,
        engine: 'Database Cache',
        results: existingSearch.results,
        cached: true
      })
    }

    // 4. AI Araştırması (Gemini/Nemotron)
    let results = await consensusResearch(query.trim(), status)

    if (!results || !results.products || results.products.length === 0) {
      throw new Error('AI could not generate results. Please try again.')
    }

    // 5. Sonucu Kaydet (Orijinal Akış)
    await prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: query.trim(),
        queryType: mode,
        resultCount: results.products.length,
        results: results as any,
      }
    })

    return NextResponse.json({
      success: true,
      engine: results.consensusMethod,
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[Research API] Error:', error)
    return NextResponse.json(
      { error: 'Service Unavailable', details: error.message },
      { status: 503 }
    )
  }
}
