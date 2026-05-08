import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { leads, template } = body;

        // Demo email sending logic
        const results = leads.map((lead: any) => ({
            ...lead,
            status: 'sent',
            sentAt: new Date().toISOString()
        }));

        return NextResponse.json({
            success: true,
            sent: results.length,
            results
        });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { success: false, error: 'Email sending failed' },
            { status: 500 }
        );
    }
}
