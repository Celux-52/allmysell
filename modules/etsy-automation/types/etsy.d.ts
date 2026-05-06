// Etsy Automation Module Types

export interface EtsyProduct {
  listingId: string;
  title: string;
  price: number;
  currency: string;
  views: number;
  favorites: number;
  url: string;
  tags: string[];
  imageUrl: string | null;
  shopName: string | null;
}

export interface EtsyAnalysis {
  trendScore: number;
  competitionLevel: 'Low' | 'Medium' | 'High';
  decision: 'SELL' | 'AVOID';
  summary: string;
  isHandmade: boolean;
  isCustomizable: boolean;
}

export interface EtsyListing {
  seoTitle: string;
  description: string;
  tags: string[];
}

export interface EtsySupplier {
  sourceType: 'POD' | 'AliExpress' | 'PrivateLabel' | 'Wholesale';
  supplierName: string;
  estimatedCost: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  notes: string;
}

export interface EtsyAnalysisResult {
  product: EtsyProduct;
  analysis: EtsyAnalysis;
}
