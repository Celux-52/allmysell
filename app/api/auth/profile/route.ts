import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const resend = new Resend(process.env.RESEND_API_KEY);
const DATA_FILE = path.join(process.cwd(), '.data', 'users.json');

async function ensureDataFile() {
  try {
    await fs.readFile(DATA_FILE, 'utf-8');
  } catch {
    const dir = path.dirname(DATA_FILE);
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (err) {
      // Dir might already exist
    }
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

async function getUsers() {
  await ensureDataFile();
  const content = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(content || '[]');
}

async function saveUserData(userData: any) {
  await ensureDataFile();
  const users = await getUsers();
  
  // Check if user already exists
  const existingIndex = users.findIndex((u: any) => u.email === userData.email);
  
  if (existingIndex >= 0) {
    // Update existing user
    users[existingIndex] = {
      ...users[existingIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
  } else {
    // Add new user
    users.push({
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

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

    // User verisini JSON dosyaya kaydet
    await saveUserData({
      email,
      platform,
      monthlyOrders,
      fullName,
      password: hashedPassword, // Hashed password
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
