import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Abone olan kişiyi size mail olarak bildiriyoruz
    const { error } = await resend.emails.send({
      from: 'Allmysell Newsletter <contact@allmysell.com>',
      to: ['info@allmysell.com'],
      subject: `[Bülten] Yeni Abone: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Yeni Bülten Aboneliği 🎉</h2>
          <p>Web sitenizdeki bültene yeni biri abone oldu:</p>
          <p style="font-size: 18px; font-weight: bold; color: #4f46e5;">${email}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter Subscription Error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
