"use client";

import { motion } from "framer-motion";
import { History, CheckCircle2, XCircle, Clock, RefreshCw, Trash2, Filter } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { useState } from "react";

interface LogEntry {
  id: number;
  action: string;
  time: string;
  status: string;
  detail: string;
}

const initialLogs: LogEntry[] = [
  { id: 1, action: "Etsy Scraper Completed", time: "10 mins ago", status: "success", detail: "Scraped 500 listings from top 10 shops." },
  { id: 2, action: "Keyword Analysis Failed", time: "2 hours ago", status: "error", detail: "API rate limit exceeded. Retrying in 1 hour." },
  { id: 3, action: "Shopify Sync Started", time: "5 hours ago", status: "pending", detail: "Syncing 120 new products to store..." },
  { id: 4, action: "Automated Listing Published", time: "1 day ago", status: "success", detail: "Published 'Vintage Leather Bag' to eBay." },
  { id: 5, action: "Database Backup", time: "2 days ago", status: "success", detail: "Full system backup completed successfully." },
];

export default function HistoryPage() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [filter, setFilter] = useState<string>("all");
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const filteredLogs = filter === "all" 
    ? logs 
    : logs.filter(l => l.status === filter);

  const clearLogs = () => {
    setLogs([]);
  };

  const retryFailed = (id: number) => {
    setLogs(prev => prev.map(l => 
      l.id === id ? { ...l, status: "pending", detail: l.detail + " (Retrying...)" } : l
    ));
    setTimeout(() => {
      setLogs(prev => prev.map(l => 
        l.id === id ? { ...l, status: "success", detail: "Retry successful." } : l
      ));
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <AnimatedGradientText className="mb-2 !mx-0 !justify-start">
            <span className="flex items-center gap-2">
              <History className="h-4 w-4 text-orange-400" />
              Activity Log
            </span>
          </AnimatedGradientText>
          <h1 className="text-3xl font-bold text-white">System History</h1>
          <p className="text-slate-400 mt-1">Track all automated tasks, syncs, and system events.</p>
        </div>
        {logs.length > 0 && (
          <button 
            onClick={clearLogs}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors text-slate-400"
          >
            <Trash2 className="h-4 w-4" /> Clear History
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-2xl border border-white/10 bg-[#080c16] p-12 text-center"
        >
          <History className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">History Cleared</h3>
          <p className="text-sm text-slate-400">New activity will appear here automatically.</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-[#080c16] overflow-hidden"
        >
          <div className="p-4 border-b border-white/5 flex gap-2 bg-white/[0.02]">
            {["all", "success", "error", "pending"].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors capitalize ${
                  filter === f 
                    ? "text-white bg-white/10" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {f === "all" ? "All Logs" : f}
              </button>
            ))}
          </div>
          
          <div className="divide-y divide-white/5">
            {filteredLogs.map((log, i) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors cursor-pointer"
                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    {log.status === "success" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                    {log.status === "error" && <XCircle className="h-6 w-6 text-red-500" />}
                    {log.status === "pending" && <Clock className="h-6 w-6 text-amber-500 animate-pulse" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-medium text-white">{log.action}</h4>
                      <span className="text-xs text-slate-500 hidden sm:inline-block">• {log.time}</span>
                    </div>
                    <p className="text-sm text-slate-400">{log.detail}</p>
                    <span className="text-xs text-slate-500 sm:hidden mt-2 block">{log.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {log.status === "error" && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); retryFailed(log.id); }}
                        className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 font-medium px-3 py-1.5 rounded-lg hover:bg-orange-500/10 transition-colors"
                      >
                        <RefreshCw className="h-3 w-3" /> Retry
                      </button>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); setExpandedLog(expandedLog === log.id ? null : log.id); }}
                      className="text-sm text-orange-400 hover:text-orange-300 font-medium"
                    >
                      {expandedLog === log.id ? "Hide" : "Details"}
                    </button>
                  </div>
                </div>

                {expandedLog === log.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Status</p>
                        <p className={`font-medium capitalize ${
                          log.status === 'success' ? 'text-green-400' : 
                          log.status === 'error' ? 'text-red-400' : 'text-amber-400'
                        }`}>{log.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Timestamp</p>
                        <p className="text-slate-300">{log.time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-slate-500 mb-1">Full Log</p>
                        <p className="text-slate-400">{log.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
