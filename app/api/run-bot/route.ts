import { NextResponse } from 'next/server';

const BOT_API_URL = 'http://46.101.105.249:5000/calistir';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const keyword = body.keyword || '';

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // 1. Clear old data from Supabase
    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/trend_products?id=gte.0`, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }).catch(() => {}); // Continue even if delete fails
    }

    // 2. Trigger bot in background (don't await response)
    fetch(BOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    }).catch(() => {}); // Don't break UI on timeout

    // 3. Return immediate response to user
    return NextResponse.json({
      success: true,
      message: `Bot started for "${keyword}"!`,
    });

  } catch (error) {
    return NextResponse.json({ success: true, note: 'Bot is running in background' });
  }
}
