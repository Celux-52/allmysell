import OpenAI from 'openai'

let clineClient: OpenAI | null = null

export function getCline(): OpenAI {
    if (!clineClient) {
        const apiKey = process.env.OPENROUTER_API_KEY || process.env.CLINE_API_KEY || 'demo'
        clineClient = new OpenAI({
            apiKey,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": "https://allmysell.com", 
                "X-Title": "AllMySell",
            }
        })
    }
    return clineClient
}

// ✅ Free AI Models List (completely free, rate-limited)
export const FREE_AI_MODELS = [
    { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B (Free)', provider: 'Meta', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'qwen/qwen-2.5-coder-32b-instruct:free', name: 'Qwen 2.5 Coder (Free)', provider: 'Alibaba', speed: 'Very Fast', quality: 'Best Code', free: true },
    { id: 'anthropic/claude-3-haiku:free', name: 'Claude 3 Haiku (Free)', provider: 'Anthropic', speed: 'Very Fast', quality: 'Very Good', free: true },
    { id: 'google/gemini-2.0-flash-lite-preview-02-05:free', name: 'Gemini 2.0 Flash Lite (Free)', provider: 'Google', speed: '⚡ Fastest', quality: 'Excellent', free: true },
    { id: 'deepseek/deepseek-v3:free', name: 'DeepSeek V3 (Free)', provider: 'DeepSeek', speed: 'Very Fast', quality: 'Excellent', free: true },
]

import { fetchInternetDataViaTool } from './consensus';
import { extractJSON } from './retry';

export async function researchProductsWithCline(query: string) {
    const cline = getCline()
    
    // Fetch live data from the internet via n8n native tool calling
    const internetContext = await fetchInternetDataViaTool(query);

    const prompt = `You are an expert e-commerce product research AI for the AllMySell SaaS platform.
  The user is researching: "${query}"${internetContext}
  
  Respond in the following JSON format:
  {
    "products": [
      {
        "name": "Product Name",
        "category": "Category",
        "wholesalePrice": "$X-Y",
        "retailPrice": "$X-Y",
        "profitMargin": "XX-XX%",
        "competition": "Low|Medium|High",
        "trend": "Rising|Stable|Declining",
        "score": 85,
        "description": "Short description",
        "platforms": ["eBay", "Etsy", "Amazon"],
        "whyItWorks": "Why this product sells well",
        "targetAudience": "Target audience",
        "marketingTips": ["Tip 1", "Tip 2"],
        "sources": ["Source 1", "Source 2"]
      }
    ],
    "summary": "Overall market analysis"
  }
  
  Return only valid JSON, nothing else.`

    try {
        const response = await cline.chat.completions.create({
            model: 'meta-llama/llama-3.2-3b-instruct:free', // Using a real model instead of fake cline-free
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: query }
            ],
            temperature: 0.7
        })

        const text = response.choices[0]?.message?.content || '{}'
        const cleaned = extractJSON(text)
        return JSON.parse(cleaned)
    } catch (error) {
        console.error('[Cline] Research error:', error)
        return { products: [], summary: 'AI service is temporarily unavailable. Please try again later.' }
    }
}

// Automation assistant
export async function clineAssistant(message: string, context?: string) {
    const cline = getCline()

    const systemPrompt = `You are the integrated Cline AI assistant for the AllMySell SaaS panel.
  Answer user questions, recommend products, analyze trends, and provide automation advice.
  Always respond in English with clear, actionable insights.
  ${context ? `Additional context: ${context}` : ''}`

    try {
        const response = await cline.chat.completions.create({
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            temperature: 0.8
        })

        return response.choices[0]?.message?.content || 'Sorry, I could not generate a response right now.'
    } catch (error) {
        console.error('[Cline] Assistant error:', error)
        return 'The AI assistant is temporarily unavailable. Please try again shortly.'
    }
}