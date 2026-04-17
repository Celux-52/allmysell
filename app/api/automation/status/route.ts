import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Verify authentication
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real app, you would fetch the FastAPI url from .env
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const secretKey = process.env.API_SECRET_KEY || 'dev_secret_key';

    try {
      const response = await fetch(`${pythonApiUrl}/api/bots/status`, {
        headers: {
          'x-api-key': secretKey,
        },
        // We set a very short timeout so the UI doesn't hang if Python backend is offline
        signal: AbortSignal.timeout(3000), 
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
      
      throw new Error(`Python API returned ${response.status}`);
      
    } catch (apiError) {
      // If FastAPI isn't running, return mock data to prevent UI crashing during demo
      console.warn('Python Backend Offline. Returning fallback status.');
      return NextResponse.json({
        "trend_hunter": {"status": "idle", "last_run": null, "items_processed": 0},
        "ebay_sync": {"status": "idle", "last_run": null, "items_processed": 0}
      });
    }

  } catch (error) {
    console.error('Automation API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
