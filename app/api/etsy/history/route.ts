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

    const history = await prisma.searchHistory.findMany({
      where: {
        userId: user.id,
        queryType: 'etsy'
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    // Map to the format expected by the frontend
    const formattedHistory = history.map(item => ({
      id: item.id,
      query: item.query,
      timestamp: item.createdAt.toISOString(),
      decision: (item.results as any)?.analysis?.decision || null,
      trendScore: (item.results as any)?.analysis?.trendScore || null
    }));

    return NextResponse.json(formattedHistory);
  } catch (error) {
    console.error("[Etsy History API] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
