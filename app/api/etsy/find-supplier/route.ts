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
    const strategy = await agent.findSupplierStrategy(title, tags || [], price || 0);

    // Save strategy to DB (Optional)
    let savedSupplier = { ...strategy };
    try {
      savedSupplier = await prisma.etsySupplier.create({
        data: {
          productId,
          sourceType: strategy.sourceType,
          supplierName: strategy.supplierName,
          estimatedCost: strategy.estimatedCost,
          riskLevel: strategy.riskLevel,
          notes: strategy.notes,
        }
      });
    } catch (e) { console.warn("DB save failed", e); }

    return NextResponse.json({
      success: true,
      supplier: savedSupplier
    });

  } catch (error: any) {
    console.error("Etsy Supplier API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
