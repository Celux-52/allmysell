import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function DELETE() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete only Etsy history for this user
    await prisma.searchHistory.deleteMany({
      where: {
        userId: user.id,
        queryType: 'etsy'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Etsy History Clear API] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
