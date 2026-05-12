import { getCline } from './cline';
import { withRetry, extractJSON } from './retry';
import { AI_MODELS } from './models';

export class EtsyListingGenerator {
  async generateListing(productTitle: string, tags: string[] = []) {
    const cline = getCline();
    const [primaryModel, ...fallbacks] = FREE_MODEL_CHAINS.creative;

    const prompt = `
      You are an Etsy SEO expert and professional copywriter. Your target audience is the end consumer.
      Write an Etsy listing title and description for this product:
      PRODUCT: ${productTitle}
      TAGS: ${tags.join(', ')}

      RULES (STRICTLY FOLLOW):
      1. NEVER write like an AI. Avoid robotic phrases. NEVER use: "In conclusion", "Dive into", "Tapestry", "Elevate", "Discover", "Unleash", "Whether you...", "Perfect for".
      2. Use a warm, authentic, handmade-feeling, honest seller voice.
      3. Title must be SEO-optimized (first 40 characters are most important for Etsy algorithm), weave keywords naturally without spamming.
      4. Keep description concise with readable short paragraphs and bullet points. Answer customer questions (size, material, shipping).
      5. Provide exactly 13 high-search-volume Etsy tags at the end.

      Output MUST be in the following JSON format:
      {
        "seoTitle": "Etsy Title (Max 140 characters)",
        "description": "Authentic seller-voice product description (HTML format with P and BR tags allowed)",
        "tags": ["tag1", "tag2", "tag3"]
      }
    `;

    return withRetry(
      async () => {
        const response = await getCline().chat.completions.create({
          model: AI_MODELS.CREATIVE.id, // DeepSeek V3
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No content received from AI");

        return JSON.parse(extractJSON(content));
      }
    );
  }
}
