import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    )
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name || null,
      avatarUrl: user.user_metadata?.avatar_url || null,
      role: user.user_metadata?.role || 'user',
      provider: user.app_metadata?.provider || 'email',
    },
  })
}
