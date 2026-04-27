"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getSavedProductsAction() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not logged in" };
    }

    const savedProducts = await prisma.savedProduct.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return { success: true, data: savedProducts };
  } catch (error: any) {
    console.error("[getSavedProductsAction] Error:", error);
    return { success: false, error: error.message };
  }
}

export async function saveProductAction(productData: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not logged in" };
    }

    // Check limits (if still applying the free/premium limit logic here, e.g. max 50 for premium)
    const count = await prisma.savedProduct.count({
      where: { userId: user.id }
    });

    // Let's set a high limit since it's a paid SaaS, maybe 1000
    if (count >= 1000) {
      return { success: false, error: "Limit reached (1000 saved products max)." };
    }

    // Check if already saved by name
    const existing = await prisma.savedProduct.findFirst({
      where: { 
        userId: user.id,
        productName: productData.name 
      }
    });

    if (existing) {
      return { success: false, error: "Product already saved." };
    }

    // Insert to DB
    const saved = await prisma.savedProduct.create({
      data: {
        userId: user.id,
        productName: productData.name,
        platform: productData.category || "General",
        price: parseFloat(productData.retailPrice?.replace(/[^0-9.]/g, '')) || 0,
        profitMargin: parseFloat(productData.profitMargin) || 0,
        competition: productData.competition || "Medium",
        aiScore: productData.score || 0,
        category: productData.category || "General",
        notes: JSON.stringify({
          wholesalePrice: productData.wholesalePrice,
          retailPrice: productData.retailPrice,
          profitScore: productData.profitScore,
          competitionScore: productData.competitionScore,
          opportunityScore: productData.opportunityScore,
          description: productData.description,
          whyItWorks: productData.whyItWorks,
          targetAudience: productData.targetAudience,
          trend: productData.trend
        })
      }
    });

    return { success: true, data: saved };
  } catch (error: any) {
    console.error("[saveProductAction] Error:", error);
    return { success: false, error: error.message };
  }
}

export async function removeSavedProductAction(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Not logged in" };

    await prisma.savedProduct.deleteMany({
      where: { 
        id: id,
        userId: user.id 
      }
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSavedProductNoteAction(id: string, note: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Not logged in" };

    // Update the note field (in our schema, the string field is `notes`, but we stored complex JSON there. Wait!)
    // If `notes` contains JSON, we should parse it, update the `userNote` field, and save it back.
    const existing = await prisma.savedProduct.findFirst({
      where: { id: id, userId: user.id }
    });

    if (!existing) return { success: false, error: "Not found" };

    let parsedNotes = {};
    try {
      if (existing.notes) parsedNotes = JSON.parse(existing.notes);
    } catch(e) {}

    parsedNotes = { ...parsedNotes, userNote: note };

    await prisma.savedProduct.updateMany({
      where: { id: id, userId: user.id },
      data: { notes: JSON.stringify(parsedNotes) }
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
