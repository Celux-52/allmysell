'use client';

import { useState } from 'react';
import { Bot, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BotsAdminPage() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const runBot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      // Send webhook to n8n
      const response = await fetch('https://n8n.allmysell.com/webhook/ebay-trend-hunter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });

      if (!response.ok) throw new Error('Server error');

      setStatus('success');
      setMessage('Search completed successfully. New products have been added to your Google Sheets.');
      setKeyword('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Failed to run bot. Make sure your n8n workflow is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
          <Bot className="text-purple-400" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Bot Automations</h1>
          <p className="text-gray-400 mt-1">Manage your n8n and Python-based bots from here.</p>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Search className="text-purple-400" size={20} />
          <h2 className="text-xl font-semibold text-white">eBay Trend Hunter Bot</h2>
        </div>
        
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          This bot searches your keyword on eBay, identifies bestselling and high-profit products, 
          matches them with CJ Dropshipping for profit margin calculation, and exports the results to your Google Sheets.
        </p>

        <form onSubmit={runBot} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., necklace, mug, leather jacket..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !keyword.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>AI Scanning... (~30 seconds)</span>
              </>
            ) : (
              <>
                <Bot size={20} />
                <span>Run Bot</span>
              </>
            )}
          </button>
        </form>

        {status !== 'idle' && (
          <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 border ${
            status === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {status === 'success' ? <CheckCircle2 size={20} className="mt-0.5" /> : <AlertCircle size={20} className="mt-0.5" />}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">
                {status === 'success' ? 'Operation Successful' : 'Error Occurred'}
              </h3>
              <p className="text-sm opacity-90">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
