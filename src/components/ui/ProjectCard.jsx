import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SkillTag from './SkillTag';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const badgeStyles = {
  'AI TOOL': {
    bg: 'rgba(123, 94, 167, 0.1)',
    text: '#9B7FD4',
    border: 'rgba(123, 94, 167, 0.3)',
  },
  FREELANCE: {
    bg: 'rgba(34, 197, 94, 0.1)',
    text: '#22C55E',
    border: 'rgba(34, 197, 94, 0.2)',
  },
  'IN PROGRESS': {
    bg: 'rgba(234, 179, 8, 0.1)',
    text: '#EAB308',
    border: 'rgba(234, 179, 8, 0.2)',
  },
};

const ProjectCard = React.memo(
  ({ title, description, tags, badge, significance }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const style = badgeStyles[badge] || badgeStyles['AI TOOL'];

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

    const BadgeEl = () => (
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider"
        style={{
          backgroundColor: style.bg,
          color: style.text,
          border: `1px solid ${style.border}`,
        }}
      >
        {badge}
      </span>
    );

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
          data-cursor="project"
        >
          <div className="mb-4">
            <BadgeEl />
          </div>
          <h4
            className="font-display text-lg font-semibold text-text-primary mb-2 
            group-hover:text-accent-glow transition-colors duration-300"
          >
            {title}
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <SkillTag key={tag} label={tag} />
            ))}
          </div>
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
                  <BadgeEl />
                </div>

                {/* Title */}
                <h4 className="font-display text-2xl font-semibold text-text-primary mb-3">
                  {title}
                </h4>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag) => (
                    <SkillTag key={tag} label={tag} />
                  ))}
                </div>

                {/* Significance */}
                {significance && (
                  <div>
                    <span className="text-label text-primary block mb-4">
                      WHY THIS MATTERS
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {significance}
                    </p>
                  </div>
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

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
