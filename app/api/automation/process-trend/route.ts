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
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 7)

    // 2. Perform Multi-AI Consensus Research
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
    const blog = await generateBlogContent(`Viral Trending Product Analysis: ${title}`)

    // 4. Clean up views text to integer
    const views = parseInt(viewsText?.replace(/[^0-9]/g, '') || '0')
    const multiplier = viewsText?.toLowerCase().includes('k') ? 1000 : viewsText?.toLowerCase().includes('m') ? 1000000 : 1

    // 5. Save to Database
    const trend = await prisma.autoTrend.create({
      data: {
        title: blog.title || title,
        slug,
        content: blog.content || "Analysis in progress...",
        videoUrl,
        thumbnailUrl: thumbnailUrl || null,
        platform: platform || 'TikTok',
        views: views * multiplier,
        consensusScore: topProduct.score || 80,
        insights: {
          whyItWorks: topProduct.whyItWorks,
          targetAudience: topProduct.targetAudience,
          marketingTips: topProduct.marketingTips,
          aiSummary: analysis.summary
        },
        platformId: platformId || `auto-${Date.now()}`,
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
