import { create } from 'zustand';
import { EvaluationResult, evaluateSentinel, fetchTimeline } from '../lib/api';

interface GovernanceState {
  result: EvaluationResult | null;
  history: any[];
  loading: boolean;
  error: string | null;
  optimizationPreview: { before: number; after: number } | null;
  
  // Actions
  runEvaluation: (payload?: any) => Promise<void>;
  getTimeline: () => Promise<void>;
  applyOptimization: () => void;
  reset: () => void;
}

export const useGovernanceStore = create<GovernanceState>((set, get) => ({
  result: null,
  history: [],
  loading: false,
  error: null,
  optimizationPreview: null,

  runEvaluation: async (payload = {}) => {
    set({ loading: true, error: null });
    try {
      const results = await evaluateSentinel(payload);
      if (results && results.length > 0) {
        set({ result: results[0], loading: false });
      } else {
        set({ error: "No results returned from engine.", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to run sentinel", loading: false });
    }
  },

  getTimeline: async () => {
    try {
      const timeline = await fetchTimeline();
      set({ history: Array.isArray(timeline) ? timeline : timeline.snapshots || [] });
    } catch (err) {
      console.error("Timeline fetch failed", err);
    }
  },

  applyOptimization: () => {
    const currentScore = get().result?.fgs?.score || 0;
    // Simulate optimization by increasing score slightly
    set({ 
      optimizationPreview: { 
        before: currentScore, 
        after: Math.min(currentScore + 12.4, 100) 
      } 
    });
  },

  reset: () => set({ result: null, error: null, optimizationPreview: null }),
}));
