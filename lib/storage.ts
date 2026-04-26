export interface SavedProduct {
  id: string;
  name: string;
  category: string;
  wholesalePrice: string;
  retailPrice: string;
  profitMargin: string;
  competition: string;
  score: number;
  description: string;
  savedAt: string; // ISO date string
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string; // ISO date string
  resultCount: number;
}

export const Storage = {
  getSavedProducts: (userEmail: string): SavedProduct[] => {
    if (typeof window === "undefined") return [];
    const key = `allmysell_saved_${userEmail}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: (userEmail: string, product: Omit<SavedProduct, "id" | "savedAt">): boolean => {
    if (typeof window === "undefined") return false;
    const current = Storage.getSavedProducts(userEmail);
    // Prevent duplicates by name
    if (current.some(p => p.name === product.name)) return false;

    const newProduct: SavedProduct = {
      ...product,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(`allmysell_saved_${userEmail}`, JSON.stringify([newProduct, ...current]));
    return true;
  },

  removeProduct: (userEmail: string, id: string): void => {
    if (typeof window === "undefined") return;
    const current = Storage.getSavedProducts(userEmail);
    localStorage.setItem(`allmysell_saved_${userEmail}`, JSON.stringify(current.filter(p => p.id !== id)));
  },

  getHistory: (userEmail: string): SearchHistoryItem[] => {
    if (typeof window === "undefined") return [];
    const key = `allmysell_history_${userEmail}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  addHistory: (userEmail: string, query: string, resultCount: number): void => {
    if (typeof window === "undefined") return;
    const current = Storage.getHistory(userEmail);
    
    // Don't add if it's the exact same query as the very last one
    if (current.length > 0 && current[0].query.toLowerCase() === query.toLowerCase()) {
      return;
    }

    const newItem: SearchHistoryItem = {
      id: crypto.randomUUID(),
      query,
      timestamp: new Date().toISOString(),
      resultCount,
    };

    localStorage.setItem(`allmysell_history_${userEmail}`, JSON.stringify([newItem, ...current].slice(0, 50))); // Keep last 50
  },
  
  clearHistory: (userEmail: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`allmysell_history_${userEmail}`);
  }
};
