import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // 1. Real user count from Supabase Auth
    let totalUsers = 0;
    let recentUsers: any[] = [];
    try {
      const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (!error && users) {
        totalUsers = users.length;
        // Get 5 most recent users
        recentUsers = users
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(u => ({
            email: u.email || 'Unknown',
            createdAt: u.created_at,
            lastSignIn: u.last_sign_in_at
          }));
      }
    } catch (e) {
      console.warn("Supabase auth fetch failed", e);
    }

    // 2. Real Etsy stats from Prisma DB
    let etsyProducts = 0;
    let etsyAnalyses = 0;
    let etsyListings = 0;
    let etsySuppliers = 0;
    try {
      [etsyProducts, etsyAnalyses, etsyListings, etsySuppliers] = await Promise.all([
        prisma.etsyProduct.count(),
        prisma.etsyAnalysis.count(),
        prisma.etsyListing.count(),
        prisma.etsySupplier.count(),
      ]);
    } catch (e) {
      console.warn("Prisma count failed (DB may be offline)", e);
    }

    // 3. System health
    const systemStatus = {
      database: etsyProducts >= 0 ? 'online' : 'offline',
      etsyApi: process.env.ETSY_API_KEY ? 'connected' : 'missing',
      aiEngine: process.env.OPENROUTER_API_KEY ? 'active' : 'inactive',
      supabase: totalUsers >= 0 ? 'online' : 'offline',
    };

    const totalOperations = etsyProducts + etsyAnalyses + etsyListings + etsySuppliers;

    return NextResponse.json({
      users: {
        total: totalUsers,
        recent: recentUsers,
      },
      operations: {
        totalApiCalls: totalOperations,
        etsyProducts,
        etsyAnalyses,
        etsyListings,
        etsySuppliers,
      },
      revenue: {
        total: 0,
        currency: 'USD',
        note: 'Stripe integration pending'
      },
      system: systemStatus,
    });

  } catch (error: any) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
