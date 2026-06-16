import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // This is where you would integrate with Resend Audience, Mailchimp, or save to your DB.
    // E.g. using Resend:
    // await resend.contacts.create({
    //   email: email,
    //   unsubscribed: false,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    // });
    
    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter Subscription Error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
