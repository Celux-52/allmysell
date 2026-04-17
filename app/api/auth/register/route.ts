import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password || undefined,
      options: {
        data: {
          full_name: fullName || '',
          role: 'user',
        },
      },
    })

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please check your email for verification.',
      user: data.user ? {
        id: data.user.id,
        email: data.user.email,
      } : null,
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
