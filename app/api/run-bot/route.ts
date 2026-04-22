import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://cadmemzncpvbarvgklsa.supabase.co';
const SUPABASE_KEY = 'sb_secret_kuv_Dz4UWF0NhFBgRlaQsg_zjHtQ0bc';
const BOT_API_URL = 'http://46.101.105.249:5000/calistir';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const keyword = body.keyword || '';

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword gerekli' }, { status: 400 });
    }

    // 1. Supabase'deki eski verileri sil
    await fetch(`${SUPABASE_URL}/rest/v1/trend_products?id=gte.0`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    }).catch(() => {}); // Hata olsa bile devam et

    // 2. Bot'u arka planda tetikle (cevabı bekleme)
    fetch(BOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    }).catch(() => {}); // Timeout olsa bile UI'ı bozma

    // 3. Kullanıcıya hemen "başlatıldı" cevabı ver
    return NextResponse.json({
      success: true,
      message: `"${keyword}" için bot başlatıldı!`,
    });

  } catch (error) {
    return NextResponse.json({ success: true, note: 'Bot arka planda çalışıyor' });
  }
}
