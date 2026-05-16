import { RESEARCH_MODELS, ETSY_MODELS } from './models';

interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
}

export async function withRetry<T>(
  fn: (modelId?: string) => Promise<T>,
  options?: number | RetryOptions
): Promise<T> {
  let lastError: any;
  const maxRetries = typeof options === 'number' ? options : (options?.maxRetries || 1);
  
  // PROFESYONEL ZİNCİR: Önce ücretsizler, olmazsa ultra-stabil ücretli modeller
  const models = [
    RESEARCH_MODELS.PRIMARY.id, // Gemini 2.0 Flash Free
    "google/gemini-2.0-flash-001", // Gemini 2.0 Flash (Ücretli - Ultra Stabil/Hızlı)
    ETSY_MODELS.MIMO.id, // MiMo Flash
    "openai/gpt-4o-mini" // GPT-4o Mini (En Garanti Fallback)
  ];

  for (const modelId of models) {
    for (let i = 0; i <= maxRetries; i++) {
      try {
        console.log(`[AI] Attempting ${modelId} (Try ${i+1})...`);
        return await fn(modelId);
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI] ${modelId} failed: ${err.message}`);
        
        // Anahtar hatası varsa (401), direkt dur ve hata fırlat
        if (err.status === 401) {
          throw new Error("API Key is invalid or not found in Vercel.");
        }
        
        if (i < maxRetries) await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  throw lastError || new Error("All AI providers failed. Check OpenRouter status.");
}

export function extractJSON(content: string): string {
  if (!content) return '{}';
  let cleaned = content
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim();
    
  const startIndex = cleaned.indexOf('{');
  const lastIndex = cleaned.lastIndexOf('}');
  
  if (startIndex !== -1 && lastIndex !== -1) {
    return cleaned.substring(startIndex, lastIndex + 1);
  }
  return cleaned;
}
