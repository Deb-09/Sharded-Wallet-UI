import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await api.get('/wallet/balance');
      setWallet(res.data.data);
    } catch (err) {
      setError('Failed to load wallet');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h3>Hi, {user?.username}</h3>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.balanceCard}>
        <p style={styles.label}>Available balance</p>
        <h1 style={styles.balance}>
          {wallet ? `$${wallet.balance.toFixed(2)}` : '...'}
        </h1>
        <p style={styles.upiId}>Your UPI ID: <b>{wallet?.upiId}</b></p>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <Link to="/send" style={styles.sendBtn}>Send money</Link>

      <Link to="/history" style={styles.historyBtn}>View history</Link>

      <button style={styles.refreshBtn} onClick={fetchBalance}>
        Refresh balance
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: '420px', margin: '60px auto', fontFamily: 'sans-serif' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  logoutBtn: { background: 'none', border: '1px solid #ddd', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer' },
  balanceCard: { background: '#4F46E5', color: 'white', borderRadius: '14px', padding: '30px', textAlign: 'center' },
  label: { fontSize: '13px', opacity: 0.8, margin: 0 },
  balance: { fontSize: '40px', margin: '10px 0' },
  upiId: { fontSize: '14px', opacity: 0.9 },
  sendBtn: { display: 'block', textAlign: 'center', background: '#111', color: 'white', padding: '14px', borderRadius: '8px', marginTop: '20px', textDecoration: 'none' },
  refreshBtn: { width: '100%', marginTop: '12px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', background: 'white', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center' },
  historyBtn: { display: 'block', textAlign: 'center', background: 'white', color: '#4F46E5', border: '1px solid #4F46E5', padding: '14px', borderRadius: '8px', marginTop: '10px', textDecoration: 'none' },
};