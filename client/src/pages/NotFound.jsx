import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
          Error 404
        </span>
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontFamily: 'var(--font-heading)',
            color: 'var(--primary)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '1rem' }}>
          Architectural Landmark Not Found
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          The requested page could not be located in our master directory. It may have been relocated or updated as part of our platform enhancements.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

