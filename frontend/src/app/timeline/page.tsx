'use client';

import React, { useEffect } from 'react';
import { useGovernanceStore } from '../store/useGovernanceStore';
import { Clock, History, AlertCircle, Crosshair, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimelinePage() {
  const { history, loading, error, getTimeline } = useGovernanceStore();

  useEffect(() => {
    getTimeline();
  }, []);

  return (
    <div className="p-8 h-full flex flex-col relative overflow-hidden">
      {/* Background depth decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f0ff]/5 blur-[120px] pointer-events-none" />

      <div className="mb-10 flex justify-between items-center z-10">
        <div>
          <h1 className="text-3xl font-black tracking-[0.4em] text-[#00E5FF] glow-text uppercase italic">System Logs</h1>
          <p className="text-[10px] text-[#6B7A90] font-mono mt-1 font-bold tracking-widest uppercase opacity-60">Governance Evaluation Registry Matrix</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#6B7A90] font-mono font-black italic">
           <span>ENTRIES: <span className="text-[#00E5FF]">{history.length}</span></span>
        </div>
      </div>

      <div className="flex-1 panel-border rounded-2xl flex flex-col p-8 h-full bg-[#0d1219]/60 backdrop-blur-2xl relative overflow-hidden border-[#1a2230]">
        <h3 className="text-[11px] font-black tracking-[0.3em] text-[#6B7A90] mb-10 uppercase flex items-center gap-4 italic opacity-80">
           <Clock className="w-4 h-4 text-[#00E5FF] animate-spin-slow" />
           CHRONOLOGICAL SNAPSHOTS
        </h3>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-[#00E5FF]"
            >
              <Loader2 className="w-16 h-16 animate-spin mb-8 drop-shadow-[0_0_15px_rgba(0,229,255,0.7)]" />
              <span className="text-[11px] font-black tracking-[0.6em] animate-pulse italic uppercase">Accessing_Chronos_Registry...</span>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-[#ff5b5b]/5 border border-[#ff5b5b]/20 rounded-2xl flex items-start gap-6 text-[#ff5b5b] shadow-2xl"
            >
              <AlertCircle className="w-8 h-8" />
              <div>
                <p className="text-sm font-black tracking-widest uppercase mb-2">Registry Corruption Detected</p>
                <p className="text-[11px] font-mono leading-relaxed opacity-80">{error}</p>
              </div>
            </motion.div>
          ) : history.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 border border-dashed border-[#1a2230] bg-black/30 rounded-2xl flex flex-col items-center justify-center text-[#4A5568] text-[11px] font-mono font-black"
            >
              <History className="w-14 h-14 mb-6 opacity-20" />
              <span className="tracking-[0.4em] uppercase">No Historical Artifacts Found</span>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto rounded-2xl border border-[#1a2230] bg-black/40 backdrop-blur-xl shadow-inner scrollbar-hide"
            >
              <table className="w-full text-left border-collapse text-[11px] font-bold tracking-tight">
                <thead>
                  <tr className="bg-[#121c26]/90 border-b border-[#1a2230] text-[#00E5FF] uppercase italic">
                    <th className="py-6 px-8 tracking-[0.3em]">Temporal Identifier</th>
                    <th className="py-6 px-8 tracking-[0.3em]">Offset</th>
                    <th className="py-6 px-8 tracking-[0.3em] text-right">Integrity hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#16202e] text-[#e0e5ea]">
                  {history.map((snap, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      key={idx} 
                      className="hover:bg-[#00E5FF]/5 transition-all group cursor-pointer border-l-2 border-transparent hover:border-[#00E5FF]"
                    >
                      <td className="py-6 px-8 flex items-center gap-4">
                        <Crosshair className="w-4 h-4 text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-all group-hover:scale-125" />
                        <span className="font-black tracking-widest transition-all group-hover:pl-2 group-hover:text-white uppercase">{snap.label || 'AUTO_SNAPSHOT'}</span>
                      </td>
                      <td className="py-6 px-8 text-[#6B7A90] font-mono italic font-black transition-colors group-hover:text-white/60">
                        {snap.age_human || snap.timestamp_human || '0.0s OFFSET'}
                      </td>
                      <td className="py-6 px-8 text-right font-mono text-[#00E5FF] opacity-60 group-hover:opacity-100 transition-all">
                        <div className="flex items-center justify-end gap-5">
                          <span className="text-[10px] tracking-[0.2em]">{snap.commit_sha ? snap.commit_sha.substring(0, 12).toUpperCase() : 'DE31A04FC28'}</span>
                          <ArrowRight className="w-4 h-4 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-[#00E5FF]" />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
