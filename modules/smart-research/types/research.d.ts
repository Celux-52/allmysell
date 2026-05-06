// Smart Research Module Types

export interface TrendData {
  keyword: string;
  volume: number;
  trend: 'rising' | 'stable' | 'declining';
  region: string;
}

export interface ProductResearch {
  id: string;
  title: string;
  price: number;
  source: string;
  margin: number;
  score: number;
  tags: string[];
}

export interface ConsensusResult {
  keyword: string;
  models: {
    name: string;
    score: number;
    decision: string;
    reasoning: string;
  }[];
  finalDecision: string;
  confidence: number;
}
