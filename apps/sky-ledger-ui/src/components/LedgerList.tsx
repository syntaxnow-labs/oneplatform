import { useEffect } from 'react';
import { useLedgerStore } from '../store';

export const LedgerList = () => {
  const { ledgers, loadLedgers, loading } = useLedgerStore();

  useEffect(() => {
    loadLedgers();
  }, [loadLedgers]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {ledgers.map((l: any) => (
        <li key={l.id}>
          {l.invoiceNumber} — {l.terms}
        </li>
      ))}
    </ul>
  );
};
