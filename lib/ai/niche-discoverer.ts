import { getCline } from './cline';
import { withRetry, extractJSON, FREE_MODEL_CHAINS } from './retry';

export interface DiscoveredNiche {
  name: string;
  category: string;
  potentialScore: number;
  competitionLevel: 'Low' | 'Medium';
  whyItWorks: string;
  targetAudience: string;
  recommendedProducts: string[];
}

export class NicheDiscoverer {
  async discover(strategy: 'mashup' | 'arbitrage' | 'problem-solver' = 'mashup') {
    const cline = getCline();
    const [primaryModel, ...fallbacks] = FREE_MODEL_CHAINS.analysis;

    const systemPrompt = `You are a world-class e-commerce trend hunter and niche strategist. 
Your goal is to discover "hidden gem" niches on Etsy that have high demand but low to medium competition.

STRATEGY: ${strategy}

- MASHUP: Combine two unrelated popular categories/aesthetics into a new micro-niche.
- ARBITRAGE: Find rising search trends in general culture (TikTok, News) that haven't fully saturated Etsy yet.
- PROBLEM-SOLVER: Identify specific customer pain points and suggest products that solve them.

STRICT RULES:
1. Be extremely specific. Instead of "Wedding decor", suggest "Gothic celestial sustainable wedding table centerpieces".
2. Avoid generic suggestions.
3. Focus on "Handmade" or "Print on Demand" friendly ideas.
4. Output MUST be a valid JSON array of 4 objects.`;

    const userPrompt = `Discover 4 high-potential Etsy niches using the ${strategy} strategy.
    
For each niche, provide:
- name: (Creative specific name)
- category: (Main Etsy category)
- potentialScore: (0-100)
- competitionLevel: ("Low" or "Medium")
- whyItWorks: (Brief strategic analysis)
- targetAudience: (Who is the specific buyer?)
- recommendedProducts: (3 specific product examples)

Return ONLY JSON.`;

    return withRetry(
      async (overrideModel?: string) => {
        // Llama 3 8B is one of the most stable free models on OpenRouter
        const modelToUse = overrideModel || 'meta-llama/llama-3-8b-instruct:free';
        console.log(`[NicheDiscoverer] Attempting discovery with: ${modelToUse}`);

        try {
          const response = await cline.chat.completions.create({
            model: modelToUse,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 1000,
          });

          const content = response.choices[0]?.message?.content || '';
          if (!content) throw new Error("AI response was empty. OpenRouter might be overloaded.");

          const cleanedJson = extractJSON(content);
          return JSON.parse(cleanedJson) as DiscoveredNiche[];
        } catch (apiError: any) {
          console.error(`[NicheDiscoverer] API Call failed:`, apiError.message);
          throw new Error(`AI Error: ${apiError.message}`);
        }
      },
      { maxRetries: 1, baseDelayMs: 500, fallbackModels: ['google/gemini-2.0-flash-001'] }
    );
  }
}
