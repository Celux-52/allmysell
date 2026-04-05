import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, platform, monthlyOrders, fullName } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email gerekli' },
        { status: 400 }
      );
    }

    // Profil tamamlama emaili gönder
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8F00FF;">Profil Başarıyla Tamamlandı! 🎉</h2>
        
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
      from: 'AllMySell <onboarding@resend.dev>',
      to: email,
      subject: 'AllMySell - Profiliniz Tamamlandı',
      html: htmlContent,
    });

    // Yöneticiye de bildir
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8F00FF;">Yeni Kullanıcı Profili Tamamlandı</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Adı:</strong> ${fullName || 'Belirtilmemiş'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Platform:</strong> ${platform}</p>
          <p><strong>Aylık Sipariş Hacmi:</strong> ${monthlyOrders}</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'AllMySell <onboarding@resend.dev>',
      to: 'melihbicak@gmail.com',
      subject: `Yeni Profil: ${fullName || email}`,
      html: adminHtmlContent,
    });

    return NextResponse.json({
      success: true,
      message: 'Profil başarıyla kaydedildi',
      user: { email, platform, monthlyOrders, fullName }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
