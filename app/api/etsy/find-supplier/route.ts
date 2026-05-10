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
    const suppliersList = strategy.suppliers || [strategy]; // Fallback if AI forgets array wrapper

    // 3. Save strategy to DB (Fail-safe)
    try {
      if (suppliersList.length > 0) {
        const firstSupplier = suppliersList[0];
        await prisma.etsySupplier.create({
          data: {
            productId,
            sourceType: firstSupplier.sourceType,
            supplierName: firstSupplier.name || firstSupplier.supplierName || "Unknown Supplier",
            estimatedCost: firstSupplier.estimatedCost,
            riskLevel: firstSupplier.riskLevel,
            notes: firstSupplier.notes,
          }
        });
      }
    } catch (e) { 
      console.warn("[Find Supplier] DB save failed:", e); 
    }

    return NextResponse.json({
      success: true,
      suppliers: suppliersList
    });

  } catch (error: any) {
    console.error("Etsy Supplier API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
