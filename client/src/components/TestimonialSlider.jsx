import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialSlider = ({ testimonials = [] }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 45 && touchEndX.current > 0) {
      // Swiped Left -> Next
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 45 && touchEndX.current > 0) {
      // Swiped Right -> Prev
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const active = testimonials[current];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        maxWidth: '850px',
        margin: '0 auto',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 3.5vw, 2.5rem)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        touchAction: 'pan-y',
      }}
    >
      {/* Decorative Luxury Quote Icon */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2.5rem',
          color: 'var(--tint)',
          opacity: 0.8,
        }}
      >
        <Quote size={64} color="var(--border-accent)" />
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
        {[...Array(active.rating || 5)].map((_, i) => (
          <Star key={i} size={18} fill="var(--star)" color="var(--star)" />
        ))}
      </div>

      {/* Testimonial Quote */}
      <p
        style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          color: 'var(--primary)',
          lineHeight: 1.6,
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        "{active.comment}"
      </p>

      {/* Client Identity & Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={active.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
            alt={active.clientName}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--accent)',
            }}
          />
          <div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '2px' }}>
              {active.clientName}
            </h4>
            <div style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>
              {active.role} • <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{active.division}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={prevSlide}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Previous testimonial"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--tint)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Next testimonial"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--tint)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Dots */}
      {testimonials.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '1.75rem',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === current ? 'var(--accent)' : 'var(--border)',
                transition: 'all var(--transition-fast)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;

