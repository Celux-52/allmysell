'use client';

import { useState, useEffect } from 'react';
import { Bot, Search, Loader2, CheckCircle2, AlertCircle, Zap, TrendingUp, Package, ExternalLink, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface TrendProduct {
  id: number;
  product_name: string;
  cj_price: number;
  shipping_cost: number;
  total_cost: number;
  ebay_avg_price: number;
  sell_price: number;
  net_profit_percent: number;
  competition: number;
  stock_status: string;
  category: string;
  supplier_link: string;
  image_urls: string;
  keyword: string;
  created_at: string;
}

export default function AutomationPage() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string; note?: string } | null>(null);
  const [products, setProducts] = useState<TrendProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const supabase = createClient();

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from('trend_products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setProducts(data);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRunBot = async () => {
    const searchKeyword = keyword.trim();
    if (!searchKeyword) {
      alert('Lütfen aramak için İngilizce bir kelime girin!');
      return;
    }
    setLoading(true);
    setResult(null);
    setProducts([]); // Eski ürünleri ekrandan temizle

    fetch('/api/run-bot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: searchKeyword }),
    }).catch(console.error);

    setResult({
      type: 'success',
      message: `"${searchKeyword}" için arama arka planda devam ediyor... Lütfen bekleyin.`,
      note: 'Not: "Airpods" gibi markalı kelimeler veya hatalı yazımlarda CJ Dropshipping sonuç vermez. Sonuç gelmesi 1 dakikadan uzun sürerse farklı (genel) bir kelime deneyin.',
    });

    // Akıllı Bekleme (Polling): Her 5 saniyede bir yeni veri gelmiş mi diye kontrol et
    let attempts = 0;
    const pollInterval = setInterval(async () => {
      attempts++;
      
      const { data } = await supabase
        .from('trend_products')
        .select('*')
        .eq('keyword', searchKeyword)
        .order('created_at', { ascending: false })
        .limit(1);

      // Eğer aradığımız kelimeyle eşleşen yeni bir ürün düştüyse
      if (data && data.length > 0) {
        clearInterval(pollInterval);
        fetchProducts(); // Tabloyu tam güncelle
        setResult({
          type: 'success',
          message: `Harika! "${searchKeyword}" için sonuçlar başarıyla yüklendi.`,
        });
        setKeyword('');
        setLoading(false);
      } 
      // 1 dakika (12 deneme) geçtiyse pes et (Timeout)
      else if (attempts >= 12) {
        clearInterval(pollInterval);
        setResult({
          type: 'error',
          message: `Zaman Aşımı: "${searchKeyword}" için ürün bulunamadı.`,
          note: 'Muhtemelen ürün markalı (örn: Apple) veya kârlı değil. Lütfen "necklace, phone case, wallet" gibi genel kelimeler deneyin.',
        });
        setLoading(false);
      }
    }, 5000); // 5 saniyede bir kontrol et
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/20">
          <Bot className="text-emerald-600" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Trend Hunter Bot</h1>
          <p className="text-stone-500 text-sm mt-0.5">eBay trend ürünlerini otomatik bul, CJ ile eşleştir, kâr analizi yap</p>
        </div>
      </div>

      {/* Bot Trigger Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-100 bg-amber-50/50">
          <div className="flex items-start gap-3">
            <Zap className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-stone-600 leading-relaxed">
              İngilizce bir kelime girin. Bot eBay'de en çok satanları arar, CJ Dropshipping ile eşleştirir,
              kâr marjlarını hesaplar ve sonuçları aşağıdaki tabloya kaydeder. <strong>~40 saniye</strong> sürer.
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleRunBot()}
                placeholder="Örn: necklace, mug, leather jacket..."
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                disabled={loading}
              />
            </div>
            <button
              type="button"
              onClick={handleRunBot}
              disabled={loading || !keyword.trim()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /><span>Başlatılıyor...</span></>
              ) : (
                <><Bot size={18} /><span>Botu Çalıştır</span></>
              )}
            </button>
          </div>

          {result && (
            <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
              result.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {result.type === 'success'
                ? <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" />
                : <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />}
              <div>
                <p className="text-sm font-medium">{result.message}</p>
                {result.note && <p className="text-sm mt-1 opacity-90">{result.note}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-600" size={20} />
            <h2 className="font-semibold text-stone-800">Bulunan Kârlı Ürünler</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
              {products.length} ürün
            </span>
          </div>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <RefreshCw size={15} className={loadingProducts ? 'animate-spin' : ''} />
            Yenile
          </button>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
              <Bot className="absolute inset-0 m-auto text-emerald-500" size={28} />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-1 animate-pulse">Bot Arka Planda Çalışıyor...</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto">
               Lütfen bekleyin. eBay satış verileri analiz ediliyor ve en kârlı ürünler CJ Dropshipping ile eşleştiriliyor. Bu işlem yaklaşık 40-60 saniye sürebilir.
            </p>
          </div>
        ) : loadingProducts ? (
          <div className="p-12 text-center text-stone-400">
            <Loader2 size={24} className="animate-spin mx-auto mb-2" />
            <p className="text-sm">Tablo güncelleniyor...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-stone-400">
            <Package size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Henüz ürün bulunamadı. Aramaya başlamak için yukarıdan bir kelime girin!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium">Ürün Adı</th>
                  <th className="text-center px-4 py-3 font-medium">Maliyet</th>
                  <th className="text-center px-4 py-3 font-medium">Satış</th>
                  <th className="text-center px-4 py-3 font-medium">Kâr %</th>
                  <th className="text-center px-4 py-3 font-medium">Rekabet</th>
                  <th className="text-center px-4 py-3 font-medium">Kelime</th>
                  <th className="text-center px-4 py-3 font-medium">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-medium text-stone-800 truncate">{p.product_name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{p.category}</p>
                    </td>
                    <td className="px-4 py-3 text-center text-stone-600">${p.total_cost}</td>
                    <td className="px-4 py-3 text-center font-semibold text-stone-800">${p.sell_price}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                        p.net_profit_percent >= 100
                          ? 'bg-emerald-100 text-emerald-700'
                          : p.net_profit_percent >= 50
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        %{p.net_profit_percent}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-stone-500">{p.competition}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.keyword}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={p.supplier_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
