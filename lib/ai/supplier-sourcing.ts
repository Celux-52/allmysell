import { getCline } from './cline';
import { extractJSON } from './retry';
import { generateEmbedding, cosineSimilarity, buildProductText } from './embeddings';

// ═══════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════

export interface SupplierProduct {
  title: string;
  description: string;
  price: string;
  rating: number;
  orders: number;
  platform: string;
  url: string;
  imageHint: string;
  shipsToUS: boolean;
}

export interface ScoredSupplierMatch {
  /** Supplier product details */
  product: SupplierProduct;
  /** Cosine similarity score (0-1) */
  similarityScore: number;
  /** Quality score based on rating + orders (0-100) */
  qualityScore: number;
  /** Combined relevance score (0-100) */
  overallScore: number;
  /** Human-readable match label */
  matchLabel: 'Excellent' | 'Good' | 'Partial';
}

export interface SupplierSourceResult {
  /** The original product name this was sourced for */
  forProduct: string;
  /** Supplier matches that passed all filters */
  matches: ScoredSupplierMatch[];
  /** How many candidates were evaluated */
  totalCandidatesEvaluated: number;
  /** How many were rejected by semantic filter */
  rejectedBySemantic: number;
  /** How many were rejected by quality filter */
  rejectedByQuality: number;
  /** Static fallback URLs (always included) */
  fallbackLinks: { name: string; url: string }[];
}

// ═══════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════

const SIMILARITY_THRESHOLD = 0.75;
const MIN_RATING = 4.0;
const MIN_ORDERS = 50;

// ═══════════════════════════════════════════════════════
// AI-POWERED SUPPLIER PRODUCT SEARCH
// ═══════════════════════════════════════════════════════

/**
 * Uses AI to generate realistic supplier product candidates
 * for a given product. This simulates what you'd find on
 * Temu, CJdropshipping, AliExpress, Alibaba, etc.
 */
async function searchSupplierCandidates(
  productName: string,
  searchKeyword: string,
  category: string,
  description: string
): Promise<SupplierProduct[]> {
  try {
    const cline = getCline();

    const prompt = `You are a supplier product database API. Given a product query, return realistic supplier listings that would appear on wholesale/dropshipping platforms.

PRODUCT QUERY: "${productName}"
SEARCH KEYWORD: "${searchKeyword}"
CATEGORY: "${category}"
DESCRIPTION: "${description}"

CRITICAL RULES:
1. Return products that ACTUALLY exist on platforms like AliExpress, Temu, CJdropshipping, Alibaba, DHgate
2. Each product must be a REAL type of product that could be sourced (not fabricated)
3. Include a MIX of quality levels — some excellent matches, some partial matches, and some poor matches
4. Ratings should be realistic (3.5 to 5.0 range, with most at 4.2-4.8)
5. Order counts should be realistic (10 to 50000+ range)
6. Prices should be WHOLESALE prices (significantly below retail)
7. Include at least 2-3 results that are genuinely irrelevant to test our filter

Return ONLY valid JSON in this exact structure:
{
  "products": [
    {
      "title": "Exact product listing title as it would appear on the platform",
      "description": "2-3 sentence product description with key features and materials",
      "price": "$X.XX",
      "rating": 4.5,
      "orders": 2500,
      "platform": "AliExpress|Temu|CJdropshipping|Alibaba|DHgate",
      "shipsToUS": true,
      "imageHint": "Brief description of product image"
    }
  ]
}

Return 8-12 products. Mix of highly relevant, somewhat relevant, and irrelevant products.
ONLY return valid JSON.`;

    const response = await cline.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: `Find supplier products for: ${searchKeyword}` }
      ],
      temperature: 0.6,
    });

    const text = response.choices[0]?.message?.content || '[]';
    const cleaned = extractJSON(text);
    const parsed = JSON.parse(cleaned);

    if (parsed.products && Array.isArray(parsed.products)) {
      return parsed.products.map((p: any) => ({
        title: p.title || '',
        description: p.description || '',
        price: p.price || 'N/A',
        rating: typeof p.rating === 'number' ? p.rating : 4.0,
        orders: typeof p.orders === 'number' ? p.orders : 0,
        platform: p.platform || 'AliExpress',
        url: buildRealSupplierUrl(p.title || searchKeyword, p.platform || 'AliExpress'),
        imageHint: p.imageHint || '',
        shipsToUS: p.shipsToUS !== false,
      }));
    }

    return [];
  } catch (err: any) {
    console.warn('[SupplierSourcing] AI search failed:', err.message);
    return [];
  }
}

// ═══════════════════════════════════════════════════════
// SEMANTIC SCORING & FILTERING
// ═══════════════════════════════════════════════════════

/**
 * Score and filter supplier candidates using semantic matching.
 * This is the core intelligence — it ensures only truly relevant
 * and high-quality products make it through.
 */
async function scoreAndFilterCandidates(
  originalProduct: {
    name: string;
    description?: string;
    category?: string;
    whyItWorks?: string;
    targetAudience?: string;
  },
  candidates: SupplierProduct[]
): Promise<{
  matches: ScoredSupplierMatch[];
  rejectedBySemantic: number;
  rejectedByQuality: number;
}> {
  if (candidates.length === 0) {
    return { matches: [], rejectedBySemantic: 0, rejectedByQuality: 0 };
  }

  // 1. Generate embedding for the original product
  const originalText = buildProductText(originalProduct);
  const originalEmbedding = await generateEmbedding(originalText);

  if (originalEmbedding.length === 0) {
    console.warn('[SupplierSourcing] Failed to generate original product embedding, falling back');
    return { matches: [], rejectedBySemantic: 0, rejectedByQuality: 0 };
  }

  // 2. Generate embeddings for all candidates in parallel
  const candidateTexts = candidates.map(c => `${c.title}. ${c.description}`);
  const candidateEmbeddings = await Promise.all(
    candidateTexts.map(text => generateEmbedding(text))
  );

  let rejectedBySemantic = 0;
  let rejectedByQuality = 0;
  const matches: ScoredSupplierMatch[] = [];

  // 3. Score each candidate using pre-computed embeddings
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const candidateEmbedding = candidateEmbeddings[i];

    if (!candidateEmbedding || candidateEmbedding.length === 0) continue;

    // Compute cosine similarity
    const similarity = cosineSimilarity(originalEmbedding, candidateEmbedding);

    // GATE 1: Semantic threshold
    if (similarity < SIMILARITY_THRESHOLD) {
      rejectedBySemantic++;
      console.log(`  ❌ REJECTED (semantic ${similarity.toFixed(3)} < ${SIMILARITY_THRESHOLD}): "${candidate.title.substring(0, 50)}..."`);
      continue;
    }

    // GATE 2: Quality filter
    if (candidate.rating < MIN_RATING) {
      rejectedByQuality++;
      console.log(`  ❌ REJECTED (rating ${candidate.rating} < ${MIN_RATING}): "${candidate.title.substring(0, 50)}..."`);
      continue;
    }

    if (candidate.orders < MIN_ORDERS) {
      rejectedByQuality++;
      console.log(`  ❌ REJECTED (orders ${candidate.orders} < ${MIN_ORDERS}): "${candidate.title.substring(0, 50)}..."`);
      continue;
    }

    // Passed all gates — compute scores
    const qualityScore = computeQualityScore(candidate);
    const overallScore = Math.round(similarity * 60 + qualityScore * 0.4);
    const matchLabel: ScoredSupplierMatch['matchLabel'] =
      similarity >= 0.85 ? 'Excellent' :
        similarity >= 0.75 ? 'Good' : 'Partial';

    console.log(`  ✅ MATCHED (similarity: ${similarity.toFixed(3)}, quality: ${qualityScore}, overall: ${overallScore}): "${candidate.title.substring(0, 50)}..."`);

    matches.push({
      product: candidate,
      similarityScore: Math.round(similarity * 100) / 100,
      qualityScore,
      overallScore,
      matchLabel,
    });
  }

  // Sort by overall score (descending)
  matches.sort((a, b) => b.overallScore - a.overallScore);

  return { matches, rejectedBySemantic, rejectedByQuality };
}

/**
 * Compute a quality score (0-100) based on rating and order count.
 */
function computeQualityScore(product: SupplierProduct): number {
  // Rating score: 4.0 = 60, 4.5 = 80, 5.0 = 100
  const ratingScore = Math.min(100, Math.max(0, (product.rating - 3.5) * 66.67));

  // Orders score: logarithmic scale
  // 50 = 20, 500 = 50, 5000 = 75, 50000 = 100
  const orderScore = Math.min(100, Math.max(0, Math.log10(Math.max(product.orders, 1)) * 25));

  // Ships to US bonus
  const shippingBonus = product.shipsToUS ? 10 : 0;

  return Math.round(ratingScore * 0.5 + orderScore * 0.4 + shippingBonus);
}

// ═══════════════════════════════════════════════════════
// REAL URL BUILDERS
// ═══════════════════════════════════════════════════════

/**
 * Build a real, clickable URL for a supplier product search.
 */
function buildRealSupplierUrl(productTitle: string, platform: string): string {
  const encoded = encodeURIComponent(productTitle.substring(0, 100));
  // Use shorter, cleaner keywords for better search results
  const shortKeyword = encodeURIComponent(productTitle.split(' ').slice(0, 5).join(' '));

  switch (platform.toLowerCase()) {
    case 'aliexpress':
      return `https://www.aliexpress.com/wholesale?SearchText=${shortKeyword}&SortType=total_tranpro_desc`;
    case 'temu':
      return `https://www.temu.com/search_result.html?search_key=${shortKeyword}`;
    case 'cjdropshipping':
    case 'cj': {
      // CJ Dropshipping expects: /search/Word+Word.html
      const cjKeyword = productTitle.split(' ').slice(0, 5).join('+');
      return `https://cjdropshipping.com/search/${cjKeyword}.html`;
    }
    case 'alibaba':
      return `https://www.alibaba.com/trade/search?SearchText=${shortKeyword}`;
    case 'dhgate':
      return `https://www.dhgate.com/wholesale/search.do?searchkey=${shortKeyword}&shipcountry=us`;
    case '1688':
      return `https://s.1688.com/selloffer/offer_search.htm?keywords=${shortKeyword}`;
    case 'made-in-china':
      return `https://www.made-in-china.com/products-search/hot-china-products/${shortKeyword}.html`;
    default:
      return `https://www.aliexpress.com/wholesale?SearchText=${shortKeyword}&SortType=total_tranpro_desc`;
  }
}

/**
 * Build static fallback supplier search URLs.
 * These are always included even if semantic matching fails.
 */
function buildFallbackLinks(keyword: string): { name: string; url: string }[] {
  const encoded = encodeURIComponent(keyword);
  return [
    {
      name: `AliExpress — "${keyword}"`,
      url: `https://www.aliexpress.com/wholesale?SearchText=${encoded}&SortType=total_tranpro_desc`,
    },
    {
      name: `CJ Dropshipping — "${keyword}"`,
      url: `https://cjdropshipping.com/search/${keyword.split(' ').join('+')}.html`,
    },
    {
      name: `Temu — "${keyword}"`,
      url: `https://www.temu.com/search_result.html?search_key=${encoded}`,
    },
    {
      name: `Alibaba (Wholesale) — "${keyword}"`,
      url: `https://www.alibaba.com/trade/search?SearchText=${encoded}`,
    },
    {
      name: `DHgate — "${keyword}"`,
      url: `https://www.dhgate.com/wholesale/search.do?searchkey=${encoded}&shipcountry=us`,
    },
    {
      name: `1688 (China Factory) — "${keyword}"`,
      url: `https://s.1688.com/selloffer/offer_search.htm?keywords=${encoded}`,
    },
    {
      name: `Made-in-China — "${keyword}"`,
      url: `https://www.made-in-china.com/products-search/hot-china-products/${encoded}.html`,
    },
  ];
}

// ═══════════════════════════════════════════════════════
// MAIN EXPORT: SOURCE SUPPLIERS FOR A PRODUCT
// ═══════════════════════════════════════════════════════

/**
 * Main entry point: Find and rank supplier products for a given consensus product.
 * 
 * Pipeline:
 *   1. AI generates supplier candidate listings
 *   2. Embeddings generated for original + candidates
 *   3. Cosine similarity computed
 *   4. Semantic threshold gate (≥ 0.75)
 *   5. Quality gate (rating ≥ 4.0, orders ≥ 50)
 *   6. Results ranked by combined score
 */
export async function sourceSupplierProducts(product: {
  name: string;
  searchKeyword?: string;
  category?: string;
  description?: string;
  whyItWorks?: string;
  targetAudience?: string;
}): Promise<SupplierSourceResult> {
  const keyword = product.searchKeyword || product.name;
  console.log(`\n🔍 [SupplierSourcing] Sourcing for: "${product.name}" (keyword: "${keyword}")`);

  // Step 1: Search for supplier candidates via AI
  const candidates = await searchSupplierCandidates(
    product.name,
    keyword,
    product.category || 'General',
    product.description || ''
  );

  console.log(`  📦 Found ${candidates.length} supplier candidates`);

  // Step 2: Score and filter using semantic matching
  const { matches, rejectedBySemantic, rejectedByQuality } = await scoreAndFilterCandidates(
    product,
    candidates
  );

  console.log(`  ✅ ${matches.length} passed | ❌ ${rejectedBySemantic} semantic reject | ❌ ${rejectedByQuality} quality reject`);

  // Step 3: Build fallback links (always available)
  const fallbackLinks = buildFallbackLinks(keyword);

  return {
    forProduct: product.name,
    matches: matches.slice(0, 6), // Top 6 matches max
    totalCandidatesEvaluated: candidates.length,
    rejectedBySemantic,
    rejectedByQuality,
    fallbackLinks,
  };
}

/**
 * Source suppliers for multiple products in parallel (with concurrency limit).
 * Used by the consensus engine to enrich all products at once.
 */
export async function sourceSuppliersBatch(products: Array<{
  name: string;
  searchKeyword?: string;
  category?: string;
  description?: string;
  whyItWorks?: string;
  targetAudience?: string;
}>): Promise<Map<string, SupplierSourceResult>> {
  const results = new Map<string, SupplierSourceResult>();

  // Process max 4 in parallel to avoid rate limits
  const BATCH_SIZE = 4;
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    const settled = await Promise.allSettled(
      batch.map(p => sourceSupplierProducts(p))
    );

    settled.forEach((result, j) => {
      const product = batch[j];
      if (result.status === 'fulfilled') {
        results.set(product.name, result.value);
      } else {
        // Fallback: just provide static links
        results.set(product.name, {
          forProduct: product.name,
          matches: [],
          totalCandidatesEvaluated: 0,
          rejectedBySemantic: 0,
          rejectedByQuality: 0,
          fallbackLinks: buildFallbackLinks(product.searchKeyword || product.name),
        });
      }
    });
  }

  return results;
}
