import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, product, rating, review } = body;

    // Email içeriği
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">New Customer Review</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Product:</strong> ${product || 'Not specified'}</p>
          <p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
        </div>
        
        <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin-top: 0;">Review:</h3>
          <p style="line-height: 1.6;">${review}</p>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
          Submitted from AllMySell Website<br>
          ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    // Resend ile email gönder (sadece sana bildirim)
    const { data, error } = await resend.emails.send({
      from: 'AllMySell <onboarding@resend.dev>',
      to: 'melihbicak@gmail.com',
      replyTo: email, // Müşterinin emaili reply-to'da olacak
      subject: `New Review: ${name} - ${rating} Stars`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email', error: error.message },
        { status: 400 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Review submitted successfully',
      data 
    });

  } catch (error: any) {
    console.error('Error processing review:', error);
    return NextResponse.json(
      { success: false, message: 'Error submitting review', error: error.message },
      { status: 500 }
    );
  }
}
