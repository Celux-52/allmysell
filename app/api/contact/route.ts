import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
    }

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Resend API key kontrolü
    if (!RESEND_API_KEY || RESEND_API_KEY === 're_dummy_key') {
      console.error('Contact API Error: RESEND_API_KEY is not configured. Please set it in .env.local');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly at info@allmysell.com' },
        { status: 503 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const escapeHtml = (unsafe: string) => {
      return (unsafe || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeMessage = escapeHtml(message);

    // Send email via Resend
    // Not: Resend'de domain doğrulanmamışsa "onboarding@resend.dev" kullanılmalı
    // Domain doğrulandıktan sonra "contact@allmysell.com" kullanılabilir
    const { data, error } = await resend.emails.send({
      from: 'Allmysell Contact Form <onboarding@resend.dev>',
      to: ['info@allmysell.com'],
      replyTo: email,
      subject: `[Allmysell] New Contact: ${safeName} — ${safeCompany || 'No Company'}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 16px;">
          <div style="background: #0A192F; padding: 24px 32px; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🚀 New Contact Request</h1>
          </div>
          <div style="background: white; padding: 24px 32px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px; width: 140px;"><strong>Name</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0A192F; font-size: 14px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;"><strong>Company</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0A192F; font-size: 14px;">${safeCompany || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;"><strong>Email</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0A192F; font-size: 14px;"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;"><strong>Message</strong></p>
              <p style="color: #0A192F; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <p style="color: #94a3b8; font-size: 11px; text-align: center; margin-top: 16px;">This email was sent from the allmysell.com contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', JSON.stringify(error));
      
      // Domain doğrulama hatası kontrolü
      const errorMessage = (error as any)?.message || JSON.stringify(error);
      if (errorMessage.includes('verify') || errorMessage.includes('domain') || errorMessage.includes('not allowed')) {
        return NextResponse.json(
          { error: 'Email delivery is temporarily unavailable. Please contact us directly at info@allmysell.com' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to send your message. Please try again or contact us at info@allmysell.com' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please contact us directly at info@allmysell.com' },
      { status: 500 }
    );
  }
}

