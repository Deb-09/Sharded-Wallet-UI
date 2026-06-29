import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/wallet/history');
      setTransactions(res.data.data);
    } catch (err) {
      setError('Failed to load history');
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/dashboard" style={styles.back}>&larr; Back</Link>
      <h2>Transaction history</h2>

      {error && <p style={styles.error}>{error}</p>}

      {transactions.length === 0 && !error && (
        <p style={styles.empty}>No transactions yet</p>
      )}

      <div style={styles.list}>
        {transactions.map((txn) => (
          <div key={txn.txnId} style={styles.item}>
            <div>
              <span style={
                txn.txnType === 'CREDIT' ? styles.creditTag : styles.debitTag
              }>
                {txn.txnType}
              </span>
              <p style={styles.date}>
                {new Date(txn.createdAt).toLocaleString()}
              </p>
            </div>
            <div style={styles.amountBlock}>
              <p style={
                txn.txnType === 'CREDIT' ? styles.creditAmount : styles.debitAmount
              }>
                {txn.txnType === 'CREDIT' ? '+' : '-'}${txn.amount.toFixed(2)}
              </p>
              <p style={styles.balance}>
                Balance: ${txn.balanceAfter.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '480px', margin: '60px auto', fontFamily: 'sans-serif' },
  back: { textDecoration: 'none', color: '#4F46E5', fontSize: '14px' },
  empty: { color: '#999', textAlign: 'center', marginTop: '40px' },
  error: { color: 'red' },
  list: { marginTop: '20px' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #eee' },
  creditTag: { background: '#DCFCE7', color: '#166534', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' },
  debitTag: { background: '#FEE2E2', color: '#991B1B', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' },
  date: { fontSize: '12px', color: '#999', marginTop: '4px' },
  amountBlock: { textAlign: 'right' },
  creditAmount: { color: '#166534', fontWeight: 'bold', margin: 0 },
  debitAmount: { color: '#991B1B', fontWeight: 'bold', margin: 0 },
  balance: { fontSize: '12px', color: '#999', margin: 0 },
};