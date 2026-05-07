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
