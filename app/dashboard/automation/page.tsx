'use client';

import { useState, useEffect } from 'react';
import { Bot, Play, Square, RefreshCw, Activity, Terminal, ExternalLink, Settings, Download, Trash2, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface BotConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'idle' | 'running' | 'error';
  lastRun: string | null;
  itemsProcessed: number;
}

export default function AutomationDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  
  // Local state representation of bots
  const [bots, setBots] = useState<BotConfig[]>([
    {
      id: 'trend_hunter',
      name: 'Trend Hunter Bot',
      description: 'eBay\'de en çok satan ürünleri bulur, CJ Dropshipping ile eşleştirir ve kâr marjlarını hesaplayarak Google Sheets tablonuza aktarır.',
      icon: ExternalLink,
      status: 'idle',
      lastRun: null,
      itemsProcessed: 0,
    },
  ]);

  const [logs, setLogs] = useState([
    { time: new Date().toISOString(), message: 'Automation Dashboard initialized. Waiting for FastAPI connection...', type: 'info' }
  ]);

  useEffect(() => {
    fetchBotStatus();
    // In a real app we would use EventSource / WebSocket for live updates
    const interval = setInterval(fetchBotStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [{ time: new Date().toISOString(), message, type }, ...prev].slice(0, 50));
  };

  const fetchBotStatus = async () => {
    setRefreshing(true);
    try {
      // In production, this would call your Next.js API, which forwards to FastAPI
      const res = await fetch('/api/automation/status');
      if (res.ok) {
        const data = await res.json();
        setConnectionError(false);
        
        setBots(prev => prev.map(bot => {
          if (data[bot.id]) {
            return {
              ...bot,
              status: data[bot.id].status,
              lastRun: data[bot.id].last_run,
              itemsProcessed: data[bot.id].items_processed,
            };
          }
          return bot;
        }));
      } else {
        setConnectionError(true);
      }
    } catch (err) {
      setConnectionError(true);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleStartBot = async (botId: string) => {
    if (botId === 'trend_hunter') {
      const keyword = prompt('Aramak istediğiniz İngilizce kelimeyi girin (Örn: necklace, mug, shoes):');
      if (!keyword || !keyword.trim()) return;
      
      addLog(`Trend Hunter Bot başlatılıyor: "${keyword}"...`, 'info');
      setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'running' } : b));
      
      try {
        const res = await fetch('https://n8n.allmysell.com/webhook/ebay-trend-hunter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keyword: keyword.trim() }),
        });
        
        if (res.ok) {
          addLog(`"${keyword}" için arama tamamlandı! Sonuçlar Google Sheets'e eklendi.`, 'success');
          setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'idle', lastRun: new Date().toISOString(), itemsProcessed: b.itemsProcessed + 1 } : b));
        } else {
          addLog(`Bot hatası: n8n workflow'un Active olduğundan emin olun.`, 'error');
          setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'error' } : b));
        }
      } catch (err) {
        addLog(`Bağlantı hatası: Sunucu veya n8n'e ulaşılamıyor.`, 'error');
        setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'error' } : b));
      }
      return;
    }
    
    addLog(`Sending launch command to ${botId}...`, 'info');
    setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'running' } : b));
    
    try {
      const res = await fetch(`/api/automation/${botId}/start`, {
        method: 'POST',
      });
      
      const data = await res.json();
      if (res.ok) {
        addLog(`${botId} started successfully.`, 'success');
        fetchBotStatus();
      } else {
        addLog(`Failed to start ${botId}: ${data.error || 'Unknown error'}`, 'error');
        setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'idle' } : b));
      }
    } catch (err) {
      addLog(`Connection error attempting to start ${botId}.`, 'error');
      setBots(prev => prev.map(b => b.id === botId ? { ...b, status: 'idle' } : b));
    }
  };

  const handleStopBot = async (botId: string) => {
    addLog(`Sending stop command to ${botId}...`, 'info');
    try {
      const res = await fetch(`/api/automation/${botId}/stop`, {
        method: 'POST',
      });
      
      if (res.ok) {
        addLog(`${botId} stopped successfully.`, 'success');
        fetchBotStatus();
      } else {
        const data = await res.json();
        addLog(`Failed to stop ${botId}: ${data.error || 'Unknown error'}`, 'error');
      }
    } catch (err) {
      addLog(`Connection error attempting to stop ${botId}.`, 'error');
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-1">Automation Bots</h1>
          <p className="text-stone-500 text-sm">Control Python web scrapers and auto-listers</p>
        </div>
        <button 
          onClick={fetchBotStatus}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-stone-50 border border-white/10 rounded-lg text-stone-600 hover:bg-white/5 transition-colors text-sm"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          Refresh Status
        </button>
      </div>

      {connectionError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
          <Activity className="text-red-400 flex-shrink-0" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-red-400">FastAPI Backend Disconnected</h3>
            <p className="text-xs text-red-300/80">
              Cannot connect to the Python automation engine. Ensure start.cmd or uvicorn is running. 
              UI is in fallback proxy mode.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bot Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {bots.map(bot => (
            <div key={bot.id} className="bg-stone-50 rounded-xl border border-white/5 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-white/5 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      bot.status === 'running' ? 'bg-emerald-500/10 text-emerald-400 animate-pulse' : 
                      bot.status === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      <Bot size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900">{bot.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${
                          bot.status === 'running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 
                          bot.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <p className="text-[10px] text-stone-400 uppercase tracking-wider">{bot.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-500 line-clamp-2">{bot.description}</p>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-[#FAFAF9] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Clock size={12} className="text-purple-400" />
                      <span className="text-[10px] text-stone-400 uppercase">Last Run</span>
                    </div>
                    <p className="text-xs text-stone-900 font-medium">
                      {bot.lastRun ? new Date(bot.lastRun).toLocaleString() : 'Never'}
                    </p>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Activity size={12} className="text-stone-800" />
                      <span className="text-[10px] text-stone-400 uppercase">Processed</span>
                    </div>
                    <p className="text-xs text-stone-900 font-medium">{bot.itemsProcessed} items</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  {bot.status === 'running' ? (
                    <button
                      onClick={() => handleStopBot(bot.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
                    >
                      <Square size={16} /> Stop Bot
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartBot(bot.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors text-sm font-medium border border-emerald-500/20"
                    >
                      <Play size={16} /> Launch Bot
                    </button>
                  )}
                  <button className="p-2.5 bg-white/5 text-stone-500 rounded-lg hover:bg-white/10 transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal/Logs */}
        <div className="bg-[#FAFAF9] rounded-xl border border-white/10 flex flex-col h-[500px] overflow-hidden font-mono">
          <div className="px-4 py-3 border-b border-white/5 bg-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-stone-500" />
              <span className="text-xs font-semibold text-stone-600">Terminal Output</span>
            </div>
            <button onClick={() => setLogs([])} className="text-stone-400 hover:text-red-400" title="Clear logs">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto w-full max-h-full scrollbar-thin scrollbar-thumb-gray-800">
            {logs.length === 0 ? (
              <p className="text-xs text-gray-600 italic">No output yet...</p>
            ) : (
              <div className="space-y-1.5 flex flex-col-reverse">
                {logs.map((log, i) => (
                  <div key={i} className="text-xs break-words">
                    <span className="text-gray-600 mr-2">[{new Date(log.time).toLocaleTimeString()}]</span>
                    <span className={`
                      ${log.type === 'error' ? 'text-red-400' : 
                        log.type === 'success' ? 'text-emerald-400' : 'text-stone-600'}
                    `}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
