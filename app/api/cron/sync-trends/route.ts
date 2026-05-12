import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * 🚀 ALLMYSELL SELF-RELIANT AUTOMATION ENGINE
 * This route is triggered every 4 hours by Vercel Cron.
 * It directly calls Apify, fetches viral TikToks, and processes them.
 */

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Verify Cron Secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const APIFY_TOKEN = 'apify_api_x9IBgdsWmFRsW4qQo6KmkN1KMHvCFf0gLclC';
  const PROCESS_API_URL = `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.allmysell.com'}/api/automation/process-trend`;

  try {
    console.log('[Cron] Starting 4-hour viral trend sync...');

    // 1. Fetch latest viral TikToks directly from Apify
    const apifyResponse = await fetch('https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${APIFY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "hashtags": ["etsyfinds", "amazonfinds", "tiktokmademebuyit"],
        "resultsLimit": 5
      })
    });

    if (!apifyResponse.ok) {
      throw new Error(`Apify fetch failed: ${apifyResponse.statusText}`);
    }

    const items = await apifyResponse.json();
    console.log(`[Cron] Found ${items.length} potential trends from Apify.`);

    const results = [];

    // 2. Process each item through our internal automation API
    for (const item of items) {
      try {
        const processRes = await fetch(PROCESS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: item.text,
            videoUrl: item.webVideoUrl,
            thumbnailUrl: item.videoMeta?.coverUrl,
            platform: 'TikTok',
            viewsText: item.diggCount?.toString(),
            platformId: item.id
          })
        });

        if (processRes.ok) {
          const data = await processRes.json();
          results.push({ id: item.id, status: 'success', blogId: data.id });
        } else {
          results.push({ id: item.id, status: 'failed' });
        }
      } catch (err) {
        console.error(`[Cron] Error processing item ${item.id}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      processedCount: results.length,
      details: results
    });

  } catch (error: any) {
    console.error('[Cron Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
