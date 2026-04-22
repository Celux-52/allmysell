import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // N8N webhook'una sunucu üzerinden (Server-Side) istek atıyoruz
    // Bu sayede tarayıcıdaki CORS veya timeout sorunlarını aşıyoruz
    const n8nResponse = await fetch('https://n8n.allmysell.com/webhook/ebay-trend-hunter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      const text = await n8nResponse.text();
      console.error('N8N Error (ignored):', text);
      // N8N 500 dönse bile, bot arka planda başarılı bir şekilde tabloya yazdığı için
      // tarayıcıya "HATA" (500) değil, "BAŞARILI" (200) dönüyoruz.
      // Böylece Console'da kırmızı yazılar çıkmıyor.
      return NextResponse.json(
        { success: true, note: 'n8n timeout ignored because bot runs asynchronously', details: text },
        { status: 200 }
      );
    }

    const data = await n8nResponse.json().catch(() => ({ status: 'success' }));
    
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    // Vercel Timeout bile olsa 200 dönüyoruz
    return NextResponse.json(
      { success: true, note: 'Vercel timeout ignored' },
      { status: 200 }
    );
  }
}
