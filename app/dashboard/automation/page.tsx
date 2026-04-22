'use client';

import { useState } from 'react';
import { Bot, Search, Loader2, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export default function AutomationPage() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleRunBot = async () => {
    if (!keyword.trim()) {
      alert('Lütfen aramak için İngilizce bir kelime girin!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/run-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });

      if (response.ok) {
        setResult({ type: 'success', message: `"${keyword}" için arama tamamlandı! Bulunan ürünler Google Sheets tablonuza eklendi.` });
        setKeyword('');
      } else {
        setResult({ type: 'error', message: 'Bot hatası oluştu. n8n workflow\'un Active/Published olduğundan emin olun.' });
      }
    } catch (err) {
      setResult({ type: 'error', message: 'Bağlantı hatası. Sunucu veya n8n\'e ulaşılamıyor. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/20">
          <Bot className="text-emerald-600" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Trend Hunter Bot</h1>
          <p className="text-stone-500 text-sm mt-0.5">eBay trend ürünlerini otomatik bul ve analiz et</p>
        </div>
      </div>

      {/* Bot Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Info */}
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-start gap-3">
            <Zap className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-stone-600 leading-relaxed">
              Bu bot, belirlediğiniz İngilizce kelimeyi eBay&apos;de aratır, en çok satan ürünleri tespit eder,
              CJ Dropshipping üzerinde eşleştirir ve kâr marjlarını hesaplayarak Google Sheets tablonuza aktarır.
              İşlem yaklaşık <strong>30 saniye</strong> sürer.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-stone-700 mb-2">
            Aranacak Kelime (İngilizce)
          </label>
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
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Taranıyor...</span>
                </>
              ) : (
                <>
                  <Bot size={18} />
                  <span>Botu Çalıştır</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={`mx-6 mb-6 p-4 rounded-xl flex items-start gap-3 ${
            result.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {result.type === 'success' ? <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" /> : <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />}
            <p className="text-sm">{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
