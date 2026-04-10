import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 LOGIN REQUEST:', { email, password: '***' });

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email ve şifre gerekli' },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany();
    console.log('📊 USERS IN DB:', users.map((u) => u.email));
    
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('🔍 FOUND USER:', user ? user.email : 'NOT FOUND');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 401 }
      );
    }

    // Compare passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Şifre yanlış' },
        { status: 401 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      { email: user.email, id: user.id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Create response with JWT in cookie
    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: userWithoutPassword,
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `Bir hata oluştu: ${errorMessage}` },
      { status: 500 }
    );
  }
}
