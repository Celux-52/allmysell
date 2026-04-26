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

// ✅ ÜCRETSİZ MODELLER LİSTESİ (Tamamen ücretsiz, limitli)
export const FREE_AI_MODELS = [
    { id: 'cline-free', name: 'Cline AI', provider: 'Cline', speed: 'Çok Hızlı', quality: 'Mükemmel', free: true },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', provider: 'Groq', speed: 'En Hızlı', quality: 'İyi', free: true },
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'Groq', speed: 'Hızlı', quality: 'Çok İyi', free: true },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', speed: 'Hızlı', quality: 'Mükemmel', free: true },
    { id: 'mistral-7b-instruct', name: 'Mistral 7B', provider: 'Groq', speed: 'En Hızlı', quality: 'Orta', free: true },
]

// Varsayılan ürün araştırma fonksiyonu (Cline ile)
export async function researchProductsWithCline(query: string) {
    const cline = getCline()

    const prompt = `Sen AllMysell platformu için e-ticaret uzmanı yapay zekasın. 
  Kullanıcı ürünü araştırıyor: "${query}"
  
  Aşağıdaki JSON formatında cevap ver:
  {
    "products": [
      {
        "name": "Ürün Adı",
        "category": "Kategori",
        "wholesalePrice": "TL X-Y",
        "retailPrice": "TL X-Y",
        "profitMargin": "XX-XX%",
        "competition": "Düşük|Orta|Yüksek",
        "trend": "Yükseliyor|Sabit|Düşüyor",
        "score": 85,
        "description": "Kısa açıklama",
        "platforms": ["Trendyol", "Hepsiburada", "AliExpress"],
        "whyItWorks": "Neden bu ürün iyi satar",
        "targetAudience": "Hedef kitle",
        "marketingTips": ["İpucu 1", "İpucu 2"],
        "sources": ["Kaynak 1", "Kaynak 2"]
      }
    ],
    "summary": "Genel piyasa analizi"
  }
  
  Sadece geçerli JSON döndür, başka hiçbir şey ekleme.`

    const response = await cline.chat.completions.create({
        model: 'cline-free',
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: query }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
    })

    const text = response.choices[0]?.message?.content || '{}'
    return JSON.parse(text)
}

// Otomasyon asistanı
export async function clineAssistant(message: string, context?: string) {
    const cline = getCline()

    const systemPrompt = `Sen AllMysell SaaS paneli için entegre Cline asistanısın.
  Kullanıcının sorularına cevap ver, ürün öner, trend analiz et, otomasyon tavsiyeleri ver.
  Daima Türkçe cevap ver, anlaşılır ve pratik bilgiler sun.
  ${context ? `Ek bağlam: ${context}` : ''}`

    const response = await cline.chat.completions.create({
        model: 'cline-free',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
        ],
        temperature: 0.8
    })

    return response.choices[0]?.message?.content
}