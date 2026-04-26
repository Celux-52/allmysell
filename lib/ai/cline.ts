import OpenAI from 'openai'

let clineClient: OpenAI | null = null

export function getCline(): OpenAI {
    if (!clineClient) {
        const apiKey = process.env.CLINE_API_KEY || 'demo'
        clineClient = new OpenAI({
            apiKey,
            baseURL: "https://api.cline.bot/v1"
        })
    }
    return clineClient
}

// ✅ Free AI Models List (completely free, rate-limited)
export const FREE_AI_MODELS = [
    { id: 'cline-free', name: 'Cline AI', provider: 'Cline', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', speed: 'Fast', quality: '🏆 Best Reasoning', free: true },
    { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'llama-4-scout-17b', name: 'Llama 4 Scout 17B', provider: 'Meta', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'Groq', speed: 'Fast', quality: 'Very Good', free: true },
    { id: 'llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct', provider: 'Meta', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', speed: 'Medium', quality: 'Excellent', free: true },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', provider: 'Groq', speed: '⚡ Fastest', quality: 'Good', free: true },
    { id: 'gemini-2.5-flash-preview', name: 'Gemini 2.5 Flash', provider: 'Google', speed: 'Fast', quality: '🏆 Best Overall', free: true },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', speed: 'Fast', quality: 'Excellent', free: true },
    { id: 'gemini-2.0-flash-001', name: 'Gemini 2.0 Flash Latest', provider: 'Google', speed: 'Fast', quality: 'Excellent', free: true },
    { id: 'qwen-3-72b-instruct', name: 'Qwen 3 72B', provider: 'Alibaba', speed: 'Fast', quality: 'Excellent', free: true },
    { id: 'qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', provider: 'Alibaba', speed: 'Fast', quality: 'Very Good', free: true },
    { id: 'qwen-2.5-14b-instruct', name: 'Qwen 2.5 14B', provider: 'Alibaba', speed: 'Very Fast', quality: 'Good', free: true },
    { id: 'mistral-small-3', name: 'Mistral Small 3', provider: 'Mistral', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'mistral-nemo-12b', name: 'Mistral Nemo 12B', provider: 'Mistral', speed: 'Very Fast', quality: 'Good', free: true },
    { id: 'mistral-7b-instruct', name: 'Mistral 7B', provider: 'Groq', speed: '⚡ Fastest', quality: 'Medium', free: true },
    { id: 'phi-4', name: 'Phi 4', provider: 'Microsoft', speed: 'Very Fast', quality: 'Excellent', free: true },
    { id: 'phi-3-medium-128k', name: 'Phi 3 Medium', provider: 'Microsoft', speed: 'Fast', quality: 'Good', free: true },
    { id: 'codestral-24b', name: 'Codestral 24B', provider: 'Mistral', speed: 'Very Fast', quality: 'Best Code', free: true },
    { id: 'glm-4-9b-chat', name: 'GLM 4 9B', provider: 'Zhipu', speed: 'Fast', quality: 'Good', free: true },
]

// Product research function (via Cline)
async function searchWithTavily(query: string) {
    if (!process.env.TAVILY_API_KEY) return null;
    try {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: process.env.TAVILY_API_KEY,
                query: `trending e-commerce products wholesale retail margins competition for: ${query}`,
                search_depth: "basic",
                max_results: 5
            })
        });
        const data = await response.json();
        if (data && data.results) {
            return data.results.map((r: any) => `Source: ${r.url}\nContent: ${r.content}`).join('\n\n');
        }
        return null;
    } catch (e) {
        console.error("Tavily search failed", e);
        return null;
    }
}

export async function researchProductsWithCline(query: string) {
    const cline = getCline()
    
    // Fetch live data from the internet
    const liveInternetData = await searchWithTavily(query);
    const internetContext = liveInternetData 
      ? `\n\n--- LIVE INTERNET DATA ---\nThe following is real-time web search data for this query. You MUST base your analysis, prices, and trends on this data whenever possible:\n${liveInternetData}\n---------------------------\n\n` 
      : "";

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
            model: 'cline-free',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: query }
            ],
            temperature: 0.7
        })

        const text = response.choices[0]?.message?.content || '{}'

        // Safely parse JSON — strip markdown fences if the model wraps it
        const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
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
            model: 'cline-free',
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