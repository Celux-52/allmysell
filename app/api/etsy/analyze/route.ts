import { NextResponse } from 'next/server';
import { EtsyService } from '@/lib/etsy/etsy-service';
import { EtsyAIEngine } from '@/lib/ai/etsy-ai-engine';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow 60 seconds for heavy AI tasks

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const etsyService = new EtsyService();

    // --- TIERED RATE LIMITING ---
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    try {
      const profile = await prisma.profile.findUnique({
        where: { id: user.id },
        select: { subscriptionStatus: true }
      })

      // --- ADMIN OVERRIDE ---
      const envAdmins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
      const adminEmails = [...envAdmins, 'melih20052005gs@gmail.com']
      const isUserAdmin = user.email && adminEmails.includes(user.email.toLowerCase())
      
      const status = isUserAdmin ? 'PRO_AGENCY' : (profile?.subscriptionStatus || 'FREE')

      const etsyCount = await prisma.searchHistory.count({
        where: {
          userId: user.id,
          queryType: 'etsy',
          createdAt: { gte: startOfMonth }
        }
      })

      const ETSY_LIMITS: Record<string, number> = {
        'FREE': 1,
        'STARTER': 50,
        'GROWTH': 75,
        'PRO_AGENCY': 125
      }

      const limit = ETSY_LIMITS[status] || 1

      if (etsyCount >= limit) {
        return NextResponse.json(
          { 
            error: `You have reached your monthly Etsy Sniper limit for the ${status} plan (${limit}).`,
            code: 'LIMIT_REACHED'
          },
          { status: 429 }
        )
      }
    } catch (dbError) {
      console.warn('[Etsy API] Rate limit check failed:', dbError)
    }

    // 1. Fetch Product & Analysis in ONE single AI call (Bypasses Vercel Timeouts)
    const { product: topProduct, analysis: analysisResult } = await EtsyAIEngine.runFullAnalysis(keyword);

    if (!topProduct || !analysisResult) {
      return NextResponse.json({ error: "AI could not generate results. Please try again." }, { status: 404 });
    }

    // 2. Save product to DB (Non-blocking)
    let savedProduct: any = { id: 'temp-' + Date.now(), ...topProduct, keyword };
    prisma.etsyProduct.create({
      data: {
        keyword,
        listingId: topProduct.listingId || 'LST-' + Date.now(),
        title: topProduct.title,
        price: typeof topProduct.price === 'string' ? parseFloat(topProduct.price) || 0 : topProduct.price,
        currency: topProduct.currency || 'USD',
        favorites: topProduct.favorites || 0,
        views: topProduct.views || 0,
        tags: topProduct.tags || [],
        url: topProduct.url || '#',
        imageUrl: topProduct.imageUrl || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
        shopName: topProduct.shopName || 'AI Shop'
      }
    }).then(p => savedProduct.id = p.id).catch(e => console.warn("DB Save failed:", e.message));

    // 3. Save analysis to DB (Non-blocking)
    let savedAnalysis: any = { ...analysisResult };
    prisma.etsyAnalysis.create({
      data: {
        productId: savedProduct.id,
        trendScore: analysisResult.trendScore || analysisResult.scores?.trend || 0,
        saturationScore: analysisResult.scores?.competition || 0,
        opportunityScore: analysisResult.scores?.demand || 0,
        decision: analysisResult.decision || 'AVOID',
        analysis: analysisResult as any
      }
    }).catch(e => console.warn("DB Analysis Save failed:", e.message));

    // 5. Save to global SearchHistory (Non-blocking)
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: keyword,
        queryType: 'etsy',
        resultCount: 1,
        results: {
          product: savedProduct,
          analysis: savedAnalysis
        }
      }
    }).catch(e => console.warn("DB History Save failed:", e.message));

    return NextResponse.json({
      product: savedProduct,
      analysis: savedAnalysis
    });

  } catch (error: any) {
    console.error("Etsy Analysis API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
