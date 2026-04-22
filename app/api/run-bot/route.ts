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
      console.error('N8N Error:', text);
      return NextResponse.json(
        { error: 'n8n workflow error', details: text },
        { status: 500 }
      );
    }

    const data = await n8nResponse.json().catch(() => ({ status: 'success' }));
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
