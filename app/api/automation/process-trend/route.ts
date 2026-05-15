import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { consensusResearch } from '@/lib/ai/consensus'
import { generateBlogContent } from '@/lib/ai/groq'

/**
 * API Route for Autonomous Trend Processing
 * Receives trend data from n8n/scraper, analyzes with AI, and publishes.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse incoming trend data
    const data = await request.json()
    const { title, videoUrl, thumbnailUrl, platform, viewsText, platformId } = data

    if (!videoUrl || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log(`[Automation] Processing trend: ${title} (${platform})`)

    // Generate SEO Slug
    const safeTitle = (title || 'Viral Trend').toString()
    const slug = safeTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 7)

    // 2. Perform AI Market Research (Powered by Nemotron 3 Super)
    // This analyzes the product's market potential, competition, and scoring
    const analysis = await consensusResearch(title)
    const topProduct = analysis.products[0] || {
      score: 80,
      whyItWorks: "Trending on social media with high engagement.",
      targetAudience: "General consumers",
      marketingTips: ["Use the viral video as an ad creative", "Focus on the problem-solving aspect"]
    }

    // 3. Generate Blog Content
    // Uses Llama 3.3 70B via Groq for high-quality, long-form content
    // We pass the analysis summary and top product info for a more data-driven article
    const blog = await generateBlogContent(`
      TOPIC: Viral Trending Product Analysis - ${title}
      PLATFORM: ${platform}
      VIEWS: ${viewsText}
      CONSENSUS SCORE: ${analysis.products[0]?.score || 80}%
      MARKET ANALYSIS: ${analysis.summary}
      WHY IT WORKS: ${topProduct.whyItWorks}
      TARGET AUDIENCE: ${topProduct.targetAudience}
    `);

    // 4. Clean up views text to integer (Handle both string and number)
    const rawViews = (viewsText || '0').toString();
    const views = parseInt(rawViews.replace(/[^0-9]/g, '') || '0')
    const multiplier = rawViews.toLowerCase().includes('k') ? 1000 : rawViews.toLowerCase().includes('m') ? 1000000 : 1

    // 5. Save to Database (Upsert: Update if exists, Create if not)
    const trend = await prisma.autoTrend.upsert({
      where: {
        platform_platformId: {
          platform: (platform || 'TikTok').toString(),
          platformId: (platformId || `auto-${Date.now()}`).toString(),
        }
      },
      update: {
        title: (blog.title || title || "Viral Trend Analysis").toString(),
        content: (blog.content || "Analysis in progress...").toString(),
        views: views * multiplier,
        consensusScore: topProduct.score || 80,
        insights: {
          whyItWorks: topProduct.whyItWorks || "High engagement viral content.",
          targetAudience: topProduct.targetAudience || "General Audience",
          marketingTips: topProduct.marketingTips || [],
          aiSummary: analysis.summary || ""
        },
        status: 'published'
      },
      create: {
        title: (blog.title || title || "Viral Trend Analysis").toString(),
        slug,
        content: (blog.content || "Analysis in progress...").toString(),
        videoUrl: (videoUrl || "").toString(),
        thumbnailUrl: (thumbnailUrl || null)?.toString(),
        platform: (platform || 'TikTok').toString(),
        views: views * multiplier,
        consensusScore: topProduct.score || 80,
        insights: {
          whyItWorks: topProduct.whyItWorks || "High engagement viral content.",
          targetAudience: topProduct.targetAudience || "General Audience",
          marketingTips: topProduct.marketingTips || [],
          aiSummary: analysis.summary || ""
        },
        platformId: (platformId || `auto-${Date.now()}`).toString(),
        status: 'published'
      }
    })

    console.log(`[Automation] Successfully published trend ID: ${trend.id}`)

    return NextResponse.json({ 
      success: true, 
      id: trend.id, 
      title: trend.title,
      score: trend.consensusScore
    })

  } catch (error: any) {
    console.error('[Automation Error]', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
