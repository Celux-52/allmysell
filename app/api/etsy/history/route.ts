import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const historyItems = await prisma.searchHistory.findMany({
      where: {
        userId: user.id,
        queryType: 'etsy'
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    // Etsy dashboard expects a specific structure: { id, query, decision, trendScore, timestamp }
    const formattedHistory = historyItems.map(item => {
      // Safely parse JSON results
      let analysisResult: any = {};
      if (item.results && typeof item.results === 'object') {
        const results = item.results as any;
        if (results.analysis) {
          analysisResult = results.analysis;
        }
      }

      return {
        id: item.id,
        query: item.query,
        decision: analysisResult.decision || 'ANALYZED',
        trendScore: analysisResult.trendScore || analysisResult.scores?.trend || 50,
        timestamp: item.createdAt
      };
    });

    return NextResponse.json(formattedHistory);
  } catch (error) {
    console.error("[Etsy History API] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
