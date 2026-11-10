import React from 'react';

const SectionHeading = ({
  badge,
  badgeClass = 'badge-gold',
  title,
  subtitle,
  center = true,
  dark = false,
}) => {
  return (
    <div
      className={`section-header ${center ? 'text-center' : ''}`}
      style={{ marginBottom: '3.5rem' }}
    >
      {badge && <span className={`badge ${badgeClass}`}>{badge}</span>}
      <h2
        style={{
          color: dark ? 'var(--white)' : 'var(--primary)',
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          lineHeight: 1.2,
          marginBottom: '0.85rem',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="section-subtitle"
          style={{
            color: dark ? '#BAC7C1' : 'var(--muted)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            maxWidth: center ? '720px' : '650px',
            margin: center ? '0 auto' : '0',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

