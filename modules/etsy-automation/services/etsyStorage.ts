export const ETSY_SAVED_LIMIT = 20;

export interface SavedEtsyProduct {
  id: string;
  keyword: string;
  title: string;
  price: number;
  currency: string;
  favorites: number;
  views: number;
  url: string;
  imageUrl: string | null;
  shopName: string | null;
  trendScore: number;
  decision: 'SELL' | 'AVOID';
  note: string;
  savedAt: string;
}

export interface EtsySearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  decision: 'SELL' | 'AVOID' | null;
  trendScore: number | null;
}

export const EtsyStorage = {
  getSavedProducts: (userEmail: string): SavedEtsyProduct[] => {
    if (typeof window === "undefined") return [];
    const key = `etsy_saved_${userEmail}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: (userEmail: string, product: Omit<SavedEtsyProduct, "id" | "savedAt" | "note">): boolean => {
    if (typeof window === "undefined") return false;
    const current = EtsyStorage.getSavedProducts(userEmail);
    // Prevent duplicates
    if (current.some(p => p.url === product.url)) return false;
    // Enforce limit
    if (current.length >= ETSY_SAVED_LIMIT) return false;

    const newProduct: SavedEtsyProduct = {
      ...product,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      note: "",
    };

    localStorage.setItem(`etsy_saved_${userEmail}`, JSON.stringify([newProduct, ...current]));
    return true;
  },

  removeProduct: (userEmail: string, id: string): void => {
    if (typeof window === "undefined") return;
    const current = EtsyStorage.getSavedProducts(userEmail);
    localStorage.setItem(`etsy_saved_${userEmail}`, JSON.stringify(current.filter(p => p.id !== id)));
  },

  updateNote: (userEmail: string, id: string, note: string): void => {
    if (typeof window === "undefined") return;
    const current = EtsyStorage.getSavedProducts(userEmail);
    const updated = current.map(p => p.id === id ? { ...p, note } : p);
    localStorage.setItem(`etsy_saved_${userEmail}`, JSON.stringify(updated));
  },

  getHistory: (userEmail: string): EtsySearchHistoryItem[] => {
    if (typeof window === "undefined") return [];
    const key = `etsy_history_${userEmail}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  addHistory: (userEmail: string, query: string, decision: 'SELL' | 'AVOID' | null, trendScore: number | null): void => {
    if (typeof window === "undefined") return;
    const current = EtsyStorage.getHistory(userEmail);
    
    // Don't add if it's the exact same query as the very last one
    if (current.length > 0 && current[0].query.toLowerCase() === query.toLowerCase()) {
      return;
    }

    const newItem: EtsySearchHistoryItem = {
      id: crypto.randomUUID(),
      query,
      timestamp: new Date().toISOString(),
      decision,
      trendScore,
    };

    localStorage.setItem(`etsy_history_${userEmail}`, JSON.stringify([newItem, ...current].slice(0, 50))); // Keep last 50
  },
  
  clearHistory: (userEmail: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`etsy_history_${userEmail}`);
  }
};
