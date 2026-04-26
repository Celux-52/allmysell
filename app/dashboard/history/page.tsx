"use client";

import { motion } from "framer-motion";
import { History, CheckCircle2, XCircle, Clock } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const historyLogs = [
  { id: 1, action: "Etsy Scraper Completed", time: "10 mins ago", status: "success", detail: "Scraped 500 listings from top 10 shops." },
  { id: 2, action: "Keyword Analysis Failed", time: "2 hours ago", status: "error", detail: "API rate limit exceeded. Retrying in 1 hour." },
  { id: 3, action: "Shopify Sync Started", time: "5 hours ago", status: "pending", detail: "Syncing 120 new products to store..." },
  { id: 4, action: "Automated Listing Published", time: "1 day ago", status: "success", detail: "Published 'Vintage Leather Bag' to eBay." },
  { id: 5, action: "Database Backup", time: "2 days ago", status: "success", detail: "Full system backup completed successfully." },
];

export default function HistoryPage() {
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
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-[#080c16] overflow-hidden"
      >
        <div className="p-4 border-b border-white/5 flex gap-4 bg-white/[0.02]">
          <button className="text-sm font-medium text-white bg-white/10 px-3 py-1.5 rounded-md">All Logs</button>
          <button className="text-sm font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors">Success</button>
          <button className="text-sm font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors">Errors</button>
        </div>
        
        <div className="divide-y divide-white/5">
          {historyLogs.map((log, i) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center gap-4"
            >
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
              
              <div>
                <button className="text-sm text-orange-400 hover:text-orange-300 font-medium">View Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
