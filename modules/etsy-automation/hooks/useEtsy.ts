// Etsy Automation — Custom Hooks
import { useState } from 'react';
import * as etsyApi from '../services/etsyApi';
import type { EtsyAnalysisResult, EtsyListing, EtsySupplier } from '../types/etsy.d';

export function useEtsyAnalysis() {
  const [result, setResult] = useState<EtsyAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await etsyApi.analyzeProduct(keyword);
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}

export function useEtsyListing() {
  const [listing, setListing] = useState<EtsyListing | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async (productId: string, title: string, tags: string[]) => {
    setLoading(true);
    try {
      const data = await etsyApi.generateListing(productId, title, tags);
      setListing(data.listing);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { listing, loading, generate };
}

export function useEtsySupplier() {
  const [supplier, setSupplier] = useState<EtsySupplier | null>(null);
  const [loading, setLoading] = useState(false);

  const find = async (productId: string, title: string, tags: string[], price: number) => {
    setLoading(true);
    try {
      const data = await etsyApi.findSupplier(productId, title, tags, price);
      setSupplier(data.supplier);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { supplier, loading, find };
}
