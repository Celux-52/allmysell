/**
 * Google Generative AI Integration
 * Uses personal Google AI Pro token for Gemini models
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.warn('[Google AI] GOOGLE_AI_API_KEY not set, Google models will be unavailable');
}

const client = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface GoogleAIOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
}

export async function callGoogleModel(
  modelName: string,
  prompt: string,
  options?: GoogleAIOptions
): Promise<string> {
  if (!client) {
    throw new Error('Google AI API key not configured');
  }

  try {
    const model = client.getGenerativeModel({ model: modelName });
    
    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 2048,
      topP: options?.topP ?? 0.95,
      topK: options?.topK ?? 64,
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error: any) {
    console.error('[Google AI] Error calling', modelName, ':', error.message);
    throw error;
  }
}

/**
 * Stream content from Google model (for real-time responses)
 */
export async function streamGoogleModel(
  modelName: string,
  prompt: string,
  onChunk: (chunk: string) => void,
  options?: GoogleAIOptions
): Promise<string> {
  if (!client) {
    throw new Error('Google AI API key not configured');
  }

  try {
    const model = client.getGenerativeModel({ model: modelName });
    
    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 2048,
      topP: options?.topP ?? 0.95,
      topK: options?.topK ?? 64,
    };

    const stream = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
    });

    let fullText = '';
    for await (const chunk of stream.stream) {
      const text = chunk.text();
      onChunk(text);
      fullText += text;
    }

    return fullText;
  } catch (error: any) {
    console.error('[Google AI] Streaming error for', modelName, ':', error.message);
    throw error;
  }
}

export const GOOGLE_MODELS = {
  GEMINI_35_FLASH: 'gemini-3.5-flash',
  GEMINI_35_FLASH_8B: 'gemini-3.5-flash-8b',
  GEMINI_31_PRO: 'gemini-1.5-pro',
  GEMINI_31_FLASH: 'gemini-1.5-flash',
  GEMINI_2_FLASH: 'gemini-2.0-flash-exp',
};
