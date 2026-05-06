import { NextResponse } from 'next/server';
import { EtsyListingGenerator } from '@/lib/ai/etsy-listing-generator';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { productId, title, tags } = await req.json();

    if (!productId || !title) {
      return NextResponse.json({ error: "Product ID and title are required" }, { status: 400 });
    }

    const generator = new EtsyListingGenerator();
    const generatedData = await generator.generateListing(title, tags || []);

    // Save generated listing to DB (Optional)
    let savedListing: any = { seoTitle: generatedData.seoTitle, description: generatedData.description, tags: generatedData.tags };
    try {
      savedListing = await prisma.etsyListing.create({
        data: {
          productId,
          seoTitle: generatedData.seoTitle,
          description: generatedData.description,
          tags: generatedData.tags,
        }
      });
    } catch (e) { console.warn("DB save failed", e); }

    return NextResponse.json({
      success: true,
      listing: savedListing
    });

  } catch (error: any) {
    console.error("Etsy Listing API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
