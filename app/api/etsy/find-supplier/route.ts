import { NextResponse } from 'next/server';
import { EtsySupplierAgent } from '@/lib/ai/etsy-supplier-agent';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { productId, title, tags, price } = await req.json();

    if (!productId || !title) {
      return NextResponse.json({ error: "Product ID and title are required" }, { status: 400 });
    }

    const agent = new EtsySupplierAgent();
    const strategy = await agent.findSupplier(title, tags || [], price || 0);

    // 3. Save strategy to DB (Fail-safe)
    let finalSupplier = { ...strategy };
    try {
      const savedInDb = await prisma.etsySupplier.create({
        data: {
          productId,
          sourceType: strategy.sourceType,
          supplierName: strategy.supplierName,
          estimatedCost: strategy.estimatedCost,
          riskLevel: strategy.riskLevel,
          notes: strategy.notes,
        }
      });
      finalSupplier = { ...savedInDb } as any;
    } catch (e) { 
      console.warn("[Find Supplier] DB save failed, returning AI results only:", e); 
    }

    return NextResponse.json({
      success: true,
      supplier: finalSupplier
    });

  } catch (error: any) {
    console.error("Etsy Supplier API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
