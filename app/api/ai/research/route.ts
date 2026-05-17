import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { consensusResearch } from '@/lib/ai/consensus'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/isAdmin'

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

    const isUserAdmin = user.email ? isAdmin(user.email) : false
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
    const errorMessage = error.message || 'Service Unavailable';
    console.error('[Research API] Critical Failure:', {
      message: errorMessage,
      stack: error.stack,
      query: (request as any)._query || 'unknown'
    });

    // 503 is for general failures, but let's be more specific if it's a timeout
    const status = errorMessage.includes('TIMEOUT') ? 504 : 503;
    
    return NextResponse.json(
      { 
        error: errorMessage.includes('TIMEOUT') 
          ? 'Research took too long. Please try a more specific search term or try again in a moment.' 
          : 'AI Research Service is temporarily overloaded. We are switching to backup engines.',
        details: errorMessage,
        code: status
      },
      { status }
    )
  }
}
