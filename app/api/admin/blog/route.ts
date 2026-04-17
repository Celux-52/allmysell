import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all blog posts (admin)
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const isAdmin = user.user_metadata?.role === 'admin' ||
                     user.email === 'melih@allmysell.com' ||
                     user.email === 'yunus@allmysell.com'
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    let posts: any[] = []
    try {
      posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          publishedAt: true,
          viewCount: true,
          createdAt: true,
        },
      })
    } catch (e) {
      // Table might not exist yet if migration hasn't run
      console.warn('BlogPost table not available:', e)
    }

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Admin blog GET error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const isAdmin = user.user_metadata?.role === 'admin' ||
                     user.email === 'melih@allmysell.com' ||
                     user.email === 'yunus@allmysell.com'
    if (!isAdmin) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, slug, content, excerpt, coverImage, tags, status, publishedAt } = body

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        tags: tags || [],
        status: status || 'DRAFT',
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        authorId: user.id,
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (error: any) {
    console.error('Admin blog POST error:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'A post with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ message: 'Failed to create post' }, { status: 500 })
  }
}
