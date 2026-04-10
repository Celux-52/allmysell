import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
    // Create test user with password "test123"
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    // Use upsert to avoid duplicate email errors if setup is run multiple times
    const testUser = await prisma.user.upsert({
      where: { email: 'test@gmail.com' },
      update: {},
      create: {
        email: 'test@gmail.com',
        password: hashedPassword,
        fullName: 'Test Kullanıcı',
        platform: 'amazon',
        monthlyOrders: 'high',
        emailVerified: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Test kullanıcı oluşturuldu',
      testUser: {
        email: testUser.email,
        password: 'test123',
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `Hata: ${errorMessage}` },
      { status: 500 }
    );
  }
}
