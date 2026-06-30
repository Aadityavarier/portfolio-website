import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useInView } from '../../hooks/useInView';
import ExpandIcon from '../ui/ExpandIcon';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const cards = [
  {
    id: 'internshield',
    badge: 'Detection Engine',
    badgeColor: '#C084FC',
    badgeBorder: 'rgba(192,132,252,0.3)',
    title: 'InternShield',
    line: 'AI-powered fake internship offer letter detector.',
    tags: ['FastAPI', 'Next.js', 'RoBERTa', 'NLP'],
    bullets: [
      'Three-layer ensemble: rule engine catches obvious red flags, NLP classifier scores language patterns, NER extractor validates company/role entities',
      'Built to reduce false positives that simple keyword filters miss',
      'Designed as a standalone API others can integrate into hiring platforms'
    ]
  },
  {
    id: 'clientweb',
    badge: 'Client Freelancing',
    badgeColor: '#22C55E',
    badgeBorder: 'rgba(34,197,94,0.3)',
    title: 'Client Web Projects',
    line: 'Portfolio and business websites for local clients. Built, delivered, watermarked.',
    tags: ['React', 'Vite', 'Next.js', 'Tailwind', 'Supabase'],
    bullets: [
      'Each site includes a watermark-protected preview mode shown before final payment',
      'Built with conversion-focused UX — WhatsApp redirect contact, masonry galleries, fast load times',
      'Delivered end-to-end: design, development, deployment, and handoff'
    ]
  },
  {
    id: 'bas',
    badge: 'IN PROGRESS',
    badgeColor: '#F59E0B',
    badgeBorder: 'rgba(245,158,11,0.3)',
    title: 'Business Automation Suite',
    line: 'Multi-tenant micro-SaaS for local service businesses.',
    tags: ['Next.js', 'n8n', 'Supabase', 'WhatsApp API'],
    bullets: [
      'Multi-tenant architecture using Supabase Row Level Security per client',
      'Human-in-the-loop message review queue before anything sends to customers',
      'Currently in active development for a real client (phonics institute)'
    ]
  }
];

const AlsoShipped = () => {
  const [ref, inView] = useInView(0.3);
  const [expandedCard, setExpandedCard] = useState(null);
  const touch = isTouchDevice();

  useEffect(() => {
    document.body.style.overflow = expandedCard ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [expandedCard]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setExpandedCard(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const expandedData = expandedCard ? cards.find(c => c.id === expandedCard) : null;

  return (
    <section id="also-shipped" className="section" aria-label="Other Projects" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(12, 10, 20, 0.65)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-1 w-full flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="font-mono text-text-tertiary mb-3 tracking-widest uppercase text-sm"
            style={animStyle(inView, 0, 30)}
          >
            SELECTED WORK
          </p>
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', ...animStyle(inView, 0.15, 40) }}
          >
            Also Shipped
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="card expandable-card group flex flex-col relative"
              onClick={() => setExpandedCard(card.id)}
              style={{
                background: 'rgba(17,17,24,0.95)',
                border: '1px solid #1E1E2E',
                borderRadius: '16px',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%',
                minHeight: '220px',
                ...animStyle(inView, 0.3 + (idx * 0.12), 50)
              }}
              onMouseEnter={(e) => {
                if (!touch) {
                  const title = e.currentTarget.querySelector('.card-title');
                  if (title) title.style.color = '#C084FC';
                  
                  const icon = e.currentTarget.querySelector('.card-icon');
                  if (icon) icon.style.filter = 'brightness(1.3)';
                  
                  e.currentTarget.style.borderColor = '#7B5EA7';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(123,94,167,0.2)';
                  
                  const arrow = e.currentTarget.querySelector('.card-expand-icon');
                  if (arrow) {
                    arrow.style.opacity = '1';
                    arrow.style.transform = 'translate(2px, -2px)';
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!touch) {
                  const title = e.currentTarget.querySelector('.card-title');
                  if (title) title.style.color = '#F8F8FF';
                  
                  const icon = e.currentTarget.querySelector('.card-icon');
                  if (icon) icon.style.filter = 'brightness(1)';
                  
                  e.currentTarget.style.borderColor = '#1E1E2E';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  
                  const arrow = e.currentTarget.querySelector('.card-expand-icon');
                  if (arrow) {
                    arrow.style.opacity = '0';
                    arrow.style.transform = 'translate(0, 0)';
                  }
                }
              }}
            >
              <ExpandIcon />
              <div style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>
                <span
                  className="font-mono text-xs rounded-full inline-block"
                  style={{
                    color: card.badgeColor,
                    border: `1px solid ${card.badgeBorder}`,
                    padding: '4px 12px',
                    letterSpacing: '0.05em'
                  }}
                >
                  {card.badge}
                </span>
              </div>

              <h3 
                className="card-title font-display font-semibold text-text-primary text-xl group-hover:text-accent-glow transition-colors duration-300" 
                style={{ marginBottom: '0.75rem', transition: 'color 0.3s ease' }}
              >
                {card.title}
              </h3>
              
              <p className="font-body text-text-secondary text-sm leading-relaxed" style={{ flexGrow: 1 }}>
                {card.line}
              </p>


            </div>
          ))}
        </div>

      </div>

      {createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            pointerEvents: expandedCard ? 'auto' : 'none',
          }}
        >
          {/* Overlay */}
          <div
            onClick={() => setExpandedCard(null)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              opacity: expandedCard ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          {/* Modal content */}
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
            {expandedData && (
              <div
                style={{
                  width: 'min(600px, 90vw)',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  background: '#111118',
                  border: '1px solid #7B5EA7',
                  borderRadius: '16px',
                  padding: '2.75rem',
                  boxShadow: '0 0 80px rgba(123,94,167,0.3)',
                  pointerEvents: expandedCard ? 'auto' : 'none',
                  position: 'relative',
                  opacity: expandedCard ? 1 : 0,
                  transform: expandedCard ? 'scale(1)' : 'scale(0.95)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard(null);
                  }}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'none',
                    border: '1px solid #1E1E2E',
                    color: '#8B8BA7',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span
                    className="font-mono text-xs rounded-full inline-block"
                    style={{
                      color: expandedData.badgeColor,
                      border: `1px solid ${expandedData.badgeBorder}`,
                      padding: '4px 12px',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {expandedData.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-text-primary" style={{ marginBottom: '1rem' }}>
                  {expandedData.title}
                </h3>

                <p className="font-body text-text-secondary text-sm" style={{ marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  {expandedData.line}
                </p>

                <div style={{
                  marginBottom: '1.75rem',
                  paddingBottom: '1.75rem',
                  borderBottom: '1px solid #1E1E2E',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  {expandedData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[#8B8BA7] text-[0.72rem] bg-[#111118] border border-[#1E1E2E] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <span className="font-mono text-[#7B5EA7] uppercase tracking-widest block" style={{ marginBottom: '1rem', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                    MORE DETAIL
                  </span>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {expandedData.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="font-body text-[#8B8BA7]"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', lineHeight: 1.6, fontSize: '0.88rem' }}
                      >
                        <span className="text-[#7B5EA7]" style={{ marginTop: '0.45rem', fontSize: '6px' }}>●</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default AlsoShipped;
