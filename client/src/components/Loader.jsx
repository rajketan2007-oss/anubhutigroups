import React from 'react';

const Loader = ({ message = 'Loading luxury spaces...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '260px',
      gap: '1.25rem',
      padding: '2rem'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.85s linear infinite'
      }} />
      <p style={{
        color: 'var(--muted)',
        fontSize: '0.95rem',
        fontWeight: '500',
        letterSpacing: '0.04em'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;

