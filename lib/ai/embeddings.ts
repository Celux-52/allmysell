/**
 * Embedding Service — Semantic Matching Engine
 * 
 * Uses Gemini's text-embedding-004 model to generate embeddings
 * and compute cosine similarity between product descriptions.
 * 
 * This powers the semantic matching between competitor products
 * and supplier products to ensure high relevance.
 */

import { getGemini } from './gemini';

/**
 * Generate an embedding vector for a single text string.
 * Uses Gemini's text-embedding-004 model (free tier, 768 dimensions).
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const gemini = getGemini();
    const model = gemini.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (err: any) {
    console.error('[Embeddings] Failed to generate embedding:', err.message);
    return [];
  }
}

/**
 * Generate embeddings for multiple texts in batch.
 * Processes sequentially to avoid rate limiting.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  for (const text of texts) {
    const embedding = await generateEmbedding(text);
    embeddings.push(embedding);
  }
  return embeddings;
}

/**
 * Compute cosine similarity between two embedding vectors.
 * Returns a score between -1 and 1 (higher = more similar).
 * 
 * For product matching:
 *   >= 0.85 → Excellent match (near-identical products)
 *   >= 0.75 → Good match (highly relevant)
 *   >= 0.60 → Partial match (somewhat relevant)
 *   <  0.60 → Poor match (likely irrelevant)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0 || a.length !== b.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

/**
 * Build a rich text description of a product for embedding.
 * Combines title, description, category, and other attributes
 * into a single string optimized for semantic comparison.
 */
export function buildProductText(product: {
  name: string;
  description?: string;
  category?: string;
  whyItWorks?: string;
  targetAudience?: string;
}): string {
  const parts = [
    product.name,
    product.description || '',
    product.category ? `Category: ${product.category}` : '',
    product.whyItWorks || '',
    product.targetAudience ? `For: ${product.targetAudience}` : '',
  ].filter(Boolean);

  return parts.join('. ').substring(0, 2000); // Cap at 2000 chars for embedding
}
