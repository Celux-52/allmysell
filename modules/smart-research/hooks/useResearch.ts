// Smart Research — Custom Hooks
import { useState } from 'react';
import * as researchApi from '../services/researchApi';
import type { ConsensusResult, TrendData } from '../types/research.d';

export function useSmartResearch() {
  const [result, setResult] = useState<ConsensusResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const research = async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await researchApi.runSmartResearch(keyword);
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, research };
}

export function useTrendAnalysis() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async (keyword: string) => {
    setLoading(true);
    try {
      const data = await researchApi.fetchTrends(keyword);
      setTrends(data.trends || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { trends, loading, fetchTrends };
}
