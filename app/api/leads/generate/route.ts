import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { country, niche, count } = body;

        // Demo lead data - gerçek entegrasyon sonra eklenecek
        const mockLeads = Array.from({ length: Math.min(count, 10) }, (_, i) => ({
            id: `lead-${i}`,
            name: `${niche} Owner ${i + 1}`,
            email: `contact${i + 1}@${niche.replace(/\s/g, '')}${country}.com`,
            company: `${niche.charAt(0).toUpperCase() + niche.slice(1)} Company ${i + 1}`,
            website: `https://www.${niche.replace(/\s/g, '')}${i + 1}.com`,
            status: 'pending',
            country,
            niche
        }));

        return NextResponse.json({
            success: true,
            leads: mockLeads,
            count: mockLeads.length
        });

    } catch (error) {
        console.error('Lead generation error:', error);
        return NextResponse.json(
            { success: false, error: 'Lead generation failed' },
            { status: 500 }
        );
    }
}
