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
      return NextResponse.json({ error: 'Lütfen AI araması yapmak için giriş yapın.' }, { status: 401 })
    }

    const { query, mode = 'product' } = await request.json()

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      return NextResponse.json({ error: 'Arama terimi en az 3 karakter olmalıdır.' }, { status: 400 })
    }

    // --- ANTI-BOT RATE LIMITING (Kötüye Kullanım Koruması) ---
    // Get start of current month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    try {
      const searchCount = await prisma.searchHistory.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: startOfMonth
          }
        }
      })

      const MONTHLY_LIMIT = 1000
      if (searchCount >= MONTHLY_LIMIT) {
        return NextResponse.json(
          { error: `Aylık arama limitinize (${MONTHLY_LIMIT}) ulaştınız. Lütfen sistem yöneticisiyle iletişime geçin.` },
          { status: 429 }
        )
      }
    } catch (dbError) {
      console.warn('[Research API] Veritabanı limiti kontrol edilemedi:', dbError)
      // If DB fails, we still let them search to not break the app entirely, but log it.
    }

    // Use the multi-AI consensus engine
    const results = await consensusResearch(query.trim())

    if (!results || results.products.length === 0) {
      return NextResponse.json(
        { error: 'Sonuç bulunamadı. Yapay zeka sağlayıcıları geçici olarak meşgul olabilir.' },
        { status: 503 }
      )
    }

    // --- SAVE TO SEARCH HISTORY ---
    try {
      // Sadece profil varsa ekleyebilmek için userId ile kayıt deniyoruz
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
      console.warn('[Research API] Arama geçmişi kaydedilemedi:', dbError)
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
