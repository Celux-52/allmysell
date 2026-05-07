import { NextResponse } from 'next/server';
import { NicheDiscoverer } from '@/lib/ai/niche-discoverer';

export async function POST(req: Request) {
  try {
    const { strategy } = await req.json();
    
    const discoverer = new NicheDiscoverer();
    const niches = await discoverer.discover(strategy || 'mashup');

    return NextResponse.json({
      success: true,
      niches
    });

  } catch (error: any) {
    console.error("Niche Discovery API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to discover niches" 
    }, { status: 500 });
  }
}
