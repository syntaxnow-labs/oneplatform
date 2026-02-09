import { axiosInstance } from './axiosInstance';

export interface Ledger {
  id: string;
  name: string;
  balance: number;
}

export const fetchLedgers = async (): Promise<Ledger[]> => {
  const res = await axiosInstance.get('/invoices');
  return res.data;
};

export const createLedger = async (payload: Partial<Ledger>) => {
  const res = await axiosInstance.post('/ledgers', payload);
  return res.data;
};
