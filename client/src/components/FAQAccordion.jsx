import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '850px', margin: '0 auto' }}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--surface)',
              border: `1.5px solid ${isOpen ? 'var(--border-accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
              boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                backgroundColor: 'transparent',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '1.05rem',
                gap: '1rem',
              }}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                color="var(--accent)"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-normal)',
                  flexShrink: 0,
                }}
              />
            </button>

            {isOpen && (
              <div
                style={{
                  padding: '0 1.5rem 1.35rem',
                  color: 'var(--text)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;

