import { NextResponse } from 'next/server'
import { clineAssistant, researchProductsWithCline, FREE_AI_MODELS } from '@/lib/ai/cline'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { action, message, query, context } = body

        if (action === 'chat') {
            const response = await clineAssistant(message, context)
            return NextResponse.json({ success: true, response })
        }

        if (action === 'research') {
            const results = await researchProductsWithCline(query)
            return NextResponse.json({ success: true, data: results })
        }

        if (action === 'models') {
            return NextResponse.json({ success: true, models: FREE_AI_MODELS })
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })

    } catch (error) {
        console.error('[Cline API] Error:', error)
        return NextResponse.json(
            { success: false, error: 'AI service is currently unavailable. Please try again later.' },
            { status: 500 }
        )
    }
}