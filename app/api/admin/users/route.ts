import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin as checkAdmin } from '@/lib/isAdmin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const isAdmin = user.email ? checkAdmin(user.email) : false
    
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    let users: any[] = []

    try {
      const { data: { users: authUsers } = { users: [] } } = await supabase.auth.admin.listUsers({
        perPage: 500,
      })

      if (authUsers) {
        users = authUsers.map(u => ({
          id: u.id,
          email: u.email || '',
          fullName: u.user_metadata?.full_name || null,
          avatarUrl: u.user_metadata?.avatar_url || null,
          role: u.user_metadata?.role || 'user',
          provider: u.app_metadata?.provider || 'email',
          emailConfirmed: !!u.email_confirmed_at,
          lastSignIn: u.last_sign_in_at,
          createdAt: u.created_at,
        }))
      }
    } catch (dbError) {
      console.warn('Could not fetch users:', dbError)
    }

    return NextResponse.json({ success: true, count: users.length, users })
  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
