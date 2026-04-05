import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir email adresi girin' },
        { status: 400 }
      );
    }

    // Verification linki oluştur
    const verificationToken = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15);
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    // Verification email gönder
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8F00FF;">AllMySell'e Hoş Geldiniz!</h2>
        <p>Kaydınızı tamamlamak için aşağıdaki butona tıklayın:</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${verificationLink}" 
             style="background: #8F00FF; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 6px; 
                    display: inline-block; font-weight: bold;">
            Email'imi Doğrula
          </a>
        </div>
        
        <p style="color: #666; font-size: 12px;">
          Ya da bu linki tarayıcınıza yapıştırın:<br>
          <small>${verificationLink}</small>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'AllMySell <onboarding@resend.dev>',
      to: email,
      subject: 'AllMySell - Email Doğrulama',
      html: htmlContent,
    });

    // User data'sı sessionStorage'da tutulacak (client-side)
    // Token backendde tutmak isterseniz database'e yazabilirsiniz
    
    return NextResponse.json({
      success: true,
      message: 'Doğrulama emiali gönderildi',
      verificationToken, // Development için, production'da bunu saklamayın
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
