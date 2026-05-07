import { NextResponse } from 'next/server';
import { NicheDiscoverer } from '@/lib/ai/niche-discoverer';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const strategy = body.strategy || 'mashup';
    console.log(`[Discovery API] Strategy: ${strategy}`);
    
    const discoverer = new NicheDiscoverer();
    const niches = await discoverer.discover(strategy);

    return NextResponse.json({
      success: true,
      niches
    });

  } catch (error: any) {
    console.error("[Discovery API] FATAL:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Unknown Error",
      stack: error.stack,
      env_check: process.env.OPENROUTER_API_KEY ? "Present" : "Missing"
    }, { status: 500 });
  }
}
