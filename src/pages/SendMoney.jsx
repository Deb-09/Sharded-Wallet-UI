import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function SendMoney() {
  const { user } = useAuth();
  const [receiverUpiId, setReceiverUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(null);   // saga status object
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateIdempotencyKey = () => {
    return crypto.randomUUID();   // built into modern browsers
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus(null);
    setLoading(true);

    try {
      const res = await api.post('/transfer', {
        idempotencyKey: generateIdempotencyKey(),
        senderUpiId: user.upiId,
        receiverUpiId,
        amount: parseFloat(amount),
      });

      const result = res.data.data;
      setStatus(result);

      // If completed, redirect back to dashboard after a short pause
      if (result.status === 'COMPLETED') {
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/dashboard" style={styles.back}>&larr; Back</Link>
      <h2>Send money</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Recipient UPI ID</label>
        <input
          style={styles.input}
          placeholder="alex@wallet"
          value={receiverUpiId}
          onChange={(e) => setReceiverUpiId(e.target.value)}
          required
        />

        <label style={styles.label}>Amount</label>
        <input
          style={styles.input}
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Send'}
        </button>
      </form>

      {error && (
        <div style={styles.errorBox}>{error}</div>
      )}

      {status && (
        <div style={
          status.status === 'COMPLETED' ? styles.successBox : styles.failBox
        }>
          <p><b>Saga ID:</b> {status.sagaId}</p>
          <p><b>Status:</b> {status.status}</p>
          <p><b>Step:</b> {status.currentStep}</p>
          {status.failureReason && <p><b>Reason:</b> {status.failureReason}</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '420px', margin: '60px auto', fontFamily: 'sans-serif' },
  back: { textDecoration: 'none', color: '#4F46E5', fontSize: '14px' },
  form: { marginTop: '20px' },
  label: { display: 'block', fontSize: '13px', marginBottom: '6px', color: '#444' },
  input: { width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
  errorBox: { marginTop: '16px', padding: '12px', background: '#FEE2E2', color: '#991B1B', borderRadius: '8px', fontSize: '14px' },
  successBox: { marginTop: '16px', padding: '12px', background: '#DCFCE7', color: '#166534', borderRadius: '8px', fontSize: '14px' },
  failBox: { marginTop: '16px', padding: '12px', background: '#FEF3C7', color: '#92400E', borderRadius: '8px', fontSize: '14px' },
};