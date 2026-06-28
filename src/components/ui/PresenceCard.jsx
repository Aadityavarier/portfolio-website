import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const MAX_ITEMS_NORMAL = 3;

const PresenceCard = React.memo(
  ({ badge, title, items, footer, closingLine }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    /* ESC key handler */
    useEffect(() => {
      if (!isExpanded) return;
      const handle = (e) => {
        if (e.key === 'Escape') setIsExpanded(false);
      };
      window.addEventListener('keydown', handle);
      return () => window.removeEventListener('keydown', handle);
    }, [isExpanded]);

    /* Body scroll lock */
    useEffect(() => {
      if (isExpanded) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return () => {
        document.body.style.overflow = '';
      };
    }, [isExpanded]);

    const touch = isTouchDevice();
    const mobile =
      typeof window !== 'undefined' && window.innerWidth < 768;
    const hasMore = items.length > MAX_ITEMS_NORMAL;
    const visibleItems = items.slice(0, MAX_ITEMS_NORMAL);

    return (
      <>
        <div
          className="card group"
          onClick={() => setIsExpanded(true)}
          style={{ cursor: 'pointer', transition: 'transform 0.3s ease, border-color 0.3s ease' }}
          onMouseEnter={(e) => {
            if (!touch) {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.borderColor = '#7B5EA7';
            }
          }}
          onMouseLeave={(e) => {
            if (!touch) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = '#1E1E2E';
            }
          }}
          data-cursor="interactive"
        >
          <div className="mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono 
              tracking-wider bg-[rgba(123,94,167,0.1)] text-accent-glow border border-[rgba(123,94,167,0.2)]"
            >
              {badge}
            </span>
          </div>
          <h4 className="font-display text-lg font-semibold text-text-primary mb-4">
            {title}
          </h4>
          <ul className="space-y-2.5 mb-4">
            {visibleItems.map((item, i) => (
              <li
                key={i}
                className="text-text-secondary text-sm leading-relaxed flex items-start gap-2"
              >
                <span className="text-primary mt-1.5 text-[6px]">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <p className="text-text-tertiary text-xs font-mono mb-4">
              +{items.length - MAX_ITEMS_NORMAL} more…
            </p>
          )}
          {footer && (
            <p className="text-text-tertiary text-xs font-mono italic mt-4 pt-4 border-t border-border">
              {footer}
            </p>
          )}
        </div>

        {createPortal(
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              pointerEvents: isExpanded ? 'auto' : 'none',
              visibility: isExpanded ? 'visible' : 'hidden',
              transition: 'visibility 0.3s',
            }}
          >
            {/* Dark overlay */}
            <div
              onClick={() => setIsExpanded(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: isExpanded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
            {/* Centered card */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                className={isExpanded ? 'open' : ''}
                style={{
                  width: mobile ? '95vw' : 'min(700px, 90vw)',
                  maxHeight: mobile ? '90vh' : '85vh',
                  overflowY: 'auto',
                  background: '#111118',
                  border: '1px solid #7B5EA7',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  boxShadow: '0 0 80px rgba(123,94,167,0.3)',
                  pointerEvents: isExpanded ? 'auto' : 'none',
                  position: 'relative',
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? 'scale(1)' : 'scale(0.95)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'none',
                    border: '1px solid #1E1E2E',
                    color: '#8B8BA7',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>

                {/* Badge */}
                <div className="mb-5">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono 
                    tracking-wider bg-[rgba(123,94,167,0.1)] text-accent-glow border border-[rgba(123,94,167,0.2)]"
                  >
                    {badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-display text-2xl font-semibold text-text-primary mb-5">
                  {title}
                </h4>

                {/* ALL items — no truncation */}
                <ul className="space-y-3 mb-6">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="text-text-secondary text-sm leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5 text-[6px]">
                        ●
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Closing line */}
                {closingLine && (
                  <p
                    className="text-text-tertiary text-sm font-mono italic pt-5 border-t border-border"
                    style={{ lineHeight: 1.8 }}
                  >
                    {closingLine}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }
);

PresenceCard.displayName = 'PresenceCard';

export default PresenceCard;
