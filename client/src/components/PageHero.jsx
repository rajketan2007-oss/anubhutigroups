import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const PageHero = ({
  title,
  subtitle,
  badge = 'Anubhuti Group',
  badgeClass = 'badge-gold',
  bgImage = 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1920&q=80',
  breadcrumbs = [],
}) => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '5.5rem 0 4.5rem',
        backgroundColor: 'var(--primary)',
        color: 'var(--white)',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Deep Luxury Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(135deg, rgba(31, 61, 54, 0.94) 0%, rgba(31, 61, 54, 0.78) 55%, rgba(184, 147, 90, 0.25) 100%), url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.82rem',
            color: '#B4C0BA',
            marginBottom: '1.25rem',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#B4C0BA',
            }}
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={13} color="var(--accent)" />
              {crumb.path ? (
                <Link to={crumb.path} style={{ color: '#B4C0BA' }}>
                  {crumb.name}
                </Link>
              ) : (
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
                  {crumb.name}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Hero Content */}
        <div style={{ maxWidth: '820px' }}>
          <span className={`badge ${badgeClass}`}>{badge}</span>
          <h1
            style={{
              color: 'var(--white)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                color: '#D1DAD5',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                maxWidth: '680px',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;

