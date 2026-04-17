import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const secretKey = process.env.API_SECRET_KEY || 'dev_secret_key';

    try {
      const response = await fetch(`${pythonApiUrl}/api/bots/${botId}/stop`, {
        method: 'POST',
        headers: {
          'x-api-key': secretKey,
        },
        signal: AbortSignal.timeout(5000),
      });

      const data = await response.json();

      if (response.ok) {
        return NextResponse.json(data);
      }
      
      return NextResponse.json({ error: data.detail || 'Service Error' }, { status: response.status });
      
    } catch (apiError) {
      console.error('Python API Connection Failed:', apiError);
      return NextResponse.json(
        { error: 'Connection to automation engine failed.' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Stop Bot Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
