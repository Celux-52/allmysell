import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET single blog post for editing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.blogPost.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, excerpt, coverImage, tags, status, publishedAt } = body

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        tags: tags || [],
        status: status || 'DRAFT',
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    console.error('Blog PUT error:', error)
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 })
  }
}

// DELETE blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blog DELETE error:', error)
    return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 })
  }
}
