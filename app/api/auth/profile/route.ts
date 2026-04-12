import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import path from 'path';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, platform, monthlyOrders, fullName, password } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email gerekli' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Şifre gerekli ve en az 6 karakter olmalı' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Profil tamamlama emaili gönder
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #808000;">Profil Başarıyla Tamamlandı! 🎉</h2>
        
        <div style="background: #f0f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Adı:</strong> ${fullName || 'Kullanıcı'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Platform:</strong> ${platform}</p>
          <p><strong>Aylık Sipariş Hacmi:</strong> ${monthlyOrders}</p>
        </div>
        
        <p style="color: #333; line-height: 1.6;">
          Bilgilerinizi sakladık. Bundan sonra sana daha iyi hizmet verebileceğiz!
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          AllMySell Ekibi<br>
          ${new Date().toLocaleString('tr-TR')}
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'AllMySell <hello@allmysell.com>',
      to: email,
      subject: 'AllMySell - Profiliniz Tamamlandı',
      html: htmlContent,
    });

    // Yöneticiye de bildir
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #808000;">Yeni Kullanıcı Profili Tamamlandı</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Adı:</strong> ${fullName || 'Belirtilmemiş'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Platform:</strong> ${platform}</p>
          <p><strong>Aylık Sipariş Hacmi:</strong> ${monthlyOrders}</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'AllMySell <hello@allmysell.com>',
      to: 'melihbicak@gmail.com',
      subject: `Yeni Profil: ${fullName || email}`,
      html: adminHtmlContent,
    });

    // Save user data to Postgres DB using Prisma
    await prisma.user.upsert({
      where: { email },
      update: {
        platform,
        monthlyOrders,
        fullName,
        password: hashedPassword,
        emailVerified: true
      },
      create: {
        email,
        platform,
        monthlyOrders,
        fullName,
        password: hashedPassword,
        emailVerified: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Profil başarıyla kaydedildi',
      user: { email, platform, monthlyOrders, fullName }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `Bir hata oluştu: ${errorMessage}` },
      { status: 500 }
    );
  }
}
