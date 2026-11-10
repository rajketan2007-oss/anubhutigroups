import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@anubhutigroup.com');
  const [password, setPassword] = useState('Admin@Anubhuti2026#');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Administrative Access Portal | Anubhuti Group';
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid administrative credentials.');
      }
    } catch (err) {
      setError(err.message || 'Connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2.5rem',
          boxShadow: 'var(--shadow-xl)',
          border: '1.5px solid var(--border-accent)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <Lock size={26} />
          </div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            Restricted System
          </span>
          <h2 style={{ fontSize: '1.85rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
            Administrative Portal
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: 0 }}>
            Sign in to manage client inquiries, property listings, and projects.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: 'var(--error-bg)',
              color: 'var(--error)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
            }}
          >
            <AlertCircle size={18} flexShrink={0} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Administrative Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="admin@anubhutigroup.com"
                required
              />
              <Mail
                size={18}
                color="var(--muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••••••"
                required
              />
              <Lock
                size={18}
                color="var(--muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '1.5rem' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div
            style={{
              padding: '0.75rem',
              backgroundColor: 'var(--tint)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--primary)',
              textAlign: 'center',
            }}
          >
            <ShieldCheck size={16} color="var(--accent)" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Demo Credentials Pre-filled: <strong>admin@anubhutigroup.com</strong> / <strong>Admin@Anubhuti2026#</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

