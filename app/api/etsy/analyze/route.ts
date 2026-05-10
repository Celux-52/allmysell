import { NextResponse } from 'next/server';
import { EtsyService } from '@/lib/etsy/etsy-service';
import { EtsyAIEngine } from '@/lib/ai/etsy-ai-engine';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const etsyService = new EtsyService();
    const aiEngine = new EtsyAIEngine();

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

      const status = profile?.subscriptionStatus || 'FREE'

      const etsyCount = await prisma.searchHistory.count({
        where: {
          userId: user.id,
          queryType: 'etsy',
          createdAt: { gte: startOfMonth }
        }
      })

      const ETSY_LIMITS: Record<string, number> = {
        'FREE': 1,
        'STARTER': 200,
        'GROWTH': 40,
        'PRO_AGENCY': 1000000
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

    // 1. Fetch top product for this keyword
    const products = await etsyService.searchProducts(keyword, 1);
    
    if (!products || products.length === 0) {
      return NextResponse.json({ error: "No products found for this keyword on Etsy" }, { status: 404 });
    }

    const topProduct = products[0];

    // 2. Save product to DB (Optional, don't crash if DB is down)
    let savedProduct: any = { id: 'temp-' + Date.now(), ...topProduct };
    try {
      savedProduct = await prisma.etsyProduct.create({
        data: {
          keyword,
          listingId: topProduct.listingId,
          title: topProduct.title,
          price: topProduct.price,
          currency: topProduct.currency,
          favorites: topProduct.favorites,
          views: topProduct.views,
          tags: topProduct.tags,
          url: topProduct.url,
          imageUrl: topProduct.imageUrl,
          shopName: topProduct.shopName
        }
      });
    } catch (dbError) {
      console.warn("DB Save failed for Etsy Product, continuing with AI analysis...", dbError);
    }

    // 3. Analyze via AI
    const analysisResult = await aiEngine.analyzeProduct(topProduct);

    // 4. Save analysis to DB (Optional)
    let savedAnalysis: any = { ...analysisResult };
    try {
      savedAnalysis = await prisma.etsyAnalysis.create({
        data: {
          productId: savedProduct.id,
          trendScore: analysisResult.trendScore,
          competitionLevel: analysisResult.competitionLevel,
          decision: analysisResult.decision,
          summary: analysisResult.summary,
          isHandmade: analysisResult.isHandmade,
          isCustomizable: analysisResult.isCustomizable
        }
      });
    } catch (dbError) {
      console.warn("DB Save failed for Etsy Analysis, returning raw AI data...", dbError);
    }

    // 5. Save to global SearchHistory for persistent UI history
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await prisma.searchHistory.create({
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
        });
      }
    } catch (historyError) {
      console.warn("Persistent History Save failed:", historyError);
    }

    return NextResponse.json({
      product: savedProduct,
      analysis: savedAnalysis
    });

  } catch (error: any) {
    console.error("Etsy Analysis API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
