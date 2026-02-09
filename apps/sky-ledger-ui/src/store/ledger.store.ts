import { create } from 'zustand';
import { fetchLedgers, createLedger, Ledger } from '../api/ledger.api';

interface LedgerState {
  ledgers: Ledger[];
  loading: boolean;
  error?: string;

  loadLedgers: () => Promise<void>;
  addLedger: (payload: Partial<Ledger>) => Promise<void>;
}

export const useLedgerStore = create<LedgerState>((set) => ({
  ledgers: [],
  loading: false,

  loadLedgers: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await fetchLedgers();
      set({ ledgers: data, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },

  addLedger: async (payload) => {
    set({ loading: true });
    try {
      const newLedger = await createLedger(payload);
      set((state) => ({
        ledgers: [...state.ledgers, newLedger],
        loading: false,
      }));
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
}));
