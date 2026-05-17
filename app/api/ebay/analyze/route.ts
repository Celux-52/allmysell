import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { EbayAIEngine } from '@/lib/ai/ebay-ai-engine';
import { isAdmin } from '@/lib/isAdmin';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow 60 seconds for heavy AI tasks

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price, soldVolume, condition, supplierName, supplierCost } = body;

    if (!title || price === undefined) {
      return NextResponse.json({ error: "Product Title and Price are required" }, { status: 400 });
    }

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
      const isUserAdmin = user.email ? isAdmin(user.email) : false;
      const status = isUserAdmin ? 'PRO_AGENCY' : (profile?.subscriptionStatus || 'FREE')

      // Administrators have absolute unlimited access, completely bypassing limits!
      if (!isUserAdmin) {
        const ebayCount = await prisma.searchHistory.count({
          where: {
            userId: user.id,
            queryType: 'ebay',
            createdAt: { gte: startOfMonth }
          }
        })

        const EBAY_LIMITS: Record<string, number> = {
          'FREE': 1,
          'STARTER': 50,
          'GROWTH': 75,
          'PRO_AGENCY': 125
        }

        const limit = EBAY_LIMITS[status] || 1

        if (ebayCount >= limit) {
          return NextResponse.json(
            { 
              error: `You have reached your monthly eBay Sniper limit for the ${status} plan (${limit}).`,
              code: 'LIMIT_REACHED'
            },
            { status: 429 }
          )
        }
      }
    } catch (dbError) {
      console.warn('[eBay API] Rate limit check failed:', dbError)
    }

    // 1. Run AI Analysis using the provided product data
    const productData = {
      title,
      price,
      soldVolume,
      condition,
      supplierName,
      supplierCost
    };

    const aiResult = await EbayAIEngine.analyzeProduct(productData);

    if (!aiResult) {
      return NextResponse.json({ error: "AI could not generate results. Please try again." }, { status: 404 });
    }

    // 2. Save history to DB (Non-blocking)
    try {
      prisma.searchHistory.create({
        data: {
          userId: user.id,
          query: title,
          queryType: 'ebay',
          results: aiResult as any
        }
      }).catch(e => console.warn('History save failed:', e));
    } catch (e) {}

    return NextResponse.json({ analysis: aiResult });

  } catch (error: any) {
    console.error("eBay Analyze Route Error:", error);
    return NextResponse.json({ error: error.message || "An error occurred during analysis" }, { status: 500 });
  }
}
