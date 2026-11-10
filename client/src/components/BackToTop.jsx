import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progressOffset, setProgressOffset] = useState(157);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollPos / docHeight : 0;

      setScrollPercent(progress);
      setVisible(scrollPos > 320);

      // SVG circumference is 2 * PI * 25 ≈ 157
      const offset = 157 - progress * 157;
      setProgressOffset(Math.max(0, offset));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Top scroll reading progress line */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollPercent * 100}%` }}
      />

      {/* Floating circular back to top button */}
      <button
        type="button"
        className={`btn-back-to-top ${visible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 54 54">
          <circle
            cx="27"
            cy="27"
            r="25"
            style={{ strokeDashoffset: progressOffset }}
          />
        </svg>
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default BackToTop;

