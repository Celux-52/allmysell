import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Verify admin access
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

    // For now, return mock stats until database is connected
    // When Supabase is active, these will query the actual tables
    const stats: {
      totalUsers: number;
      newUsersThisMonth: number;
      totalPageViews: number;
      recentUsers: Array<{ id: string; email: string; fullName: string | null; createdAt: string }>;
    } = {
      totalUsers: 0,
      newUsersThisMonth: 0,
      totalPageViews: 0,
      recentUsers: [],
    }

    try {
      // Try to get real data from Supabase auth admin API
      // Note: This requires service role key for admin operations
      const { data: { users: authUsers } = { users: [] } } = await supabase.auth.admin.listUsers({
        perPage: 100,
      })

      if (authUsers) {
        const now = new Date()
        const thisMonth = now.getMonth()
        const thisYear = now.getFullYear()

        stats.totalUsers = authUsers.length
        stats.newUsersThisMonth = authUsers.filter(u => {
          const d = new Date(u.created_at)
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear
        }).length

        stats.recentUsers = authUsers
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(u => ({
            id: u.id,
            email: u.email || '',
            fullName: u.user_metadata?.full_name || null,
            createdAt: u.created_at,
          }))
      }
    } catch (dbError) {
      console.warn('Could not fetch user data:', dbError)
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
