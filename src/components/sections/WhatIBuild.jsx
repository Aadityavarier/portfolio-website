import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const ServiceCard = ({ icon, title, line, tags, bullets, styleAnim }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const touch = isTouchDevice();
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (!isExpanded) return;
    const handle = (e) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  return (
    <>
      <div
        onClick={() => setIsExpanded(true)}
        className="group flex flex-col cursor-pointer transition-all duration-300"
        style={{
          flex: 1,
          maxWidth: mobile ? '100%' : '340px',
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid #1E1E2E',
          borderRadius: '16px',
          padding: '2rem',
          ...styleAnim
        }}
        onMouseEnter={(e) => {
          if (!touch) {
            e.currentTarget.style.borderColor = '#7B5EA7';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(123,94,167,0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!touch) {
            e.currentTarget.style.borderColor = '#1E1E2E';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        <div className="mb-6 flex items-center justify-center w-10 h-10">
          {icon}
        </div>
        <h3 className="font-display font-semibold text-text-primary text-[1.1rem] mb-2">
          {title}
        </h3>
        <p className="font-body text-text-secondary text-[0.85rem] mb-6 flex-1">
          {line}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[#4A4A6A] text-[0.7rem]"
            >
              {tag}{tag !== tags[tags.length - 1] && ' ·'}
            </span>
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
          {/* Overlay */}
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
            <div
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

              <div className="mb-6 w-16 h-16 flex items-center justify-center">
                {icon}
              </div>

              <h3 className="font-display text-2xl font-semibold text-text-primary mb-4">
                {title}
              </h3>

              <p className="font-body text-text-secondary text-sm leading-relaxed mb-6">
                {line}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[#8B8BA7] text-[0.72rem] bg-[#111118] border border-[#1E1E2E] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <span className="font-mono text-[#7B5EA7] text-[0.75rem] uppercase tracking-widest block mb-4">
                  HOW I APPROACH THIS
                </span>
                <ul className="space-y-3">
                  {bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="font-body text-[#8B8BA7] text-sm leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-[#7B5EA7] mt-1.5 text-[6px]">●</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const WhatIBuild = () => {
  const [ref, inView] = useInView(0.3);

  const icons = {
    ai: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
    ),
    web: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    auto: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        <polygon points="13 2 13 10 17 10 11 22 11 14 7 14 13 2" fill="#111118"></polygon>
      </svg>
    )
  };

  return (
    <section id="what-i-build" className="section" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(10, 10, 25, 0.65)',
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
            WHAT I DO
          </p>
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', ...animStyle(inView, 0.15, 40) }}
          >
            What I Build
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 justify-center items-stretch">
          <ServiceCard
            icon={icons.ai}
            title="AI & Data Science"
            line="Algorithmic systems, quantitative models, machine learning pipelines."
            tags={['Python', 'SQL', 'TensorFlow', 'pandas']}
            bullets={[
              "I start with the data pipeline before touching any model",
              "Every model gets backtested or validated before it ships",
              "I document failure modes, not just results"
            ]}
            styleAnim={animStyle(inView, 0.3, 50)}
          />
          <ServiceCard
            icon={icons.web}
            title="Web Development"
            line="Full-stack production apps. Real clients. Deployed and running."
            tags={['React', 'Next.js', 'Supabase', 'Tailwind']}
            bullets={[
              "Production-first thinking from day one — not prototype mentality",
              "Every UI decision is made with the client's end user in mind",
              "I don't hand over code, I hand over a working product"
            ]}
            styleAnim={animStyle(inView, 0.42, 50)}
          />
          <ServiceCard
            icon={icons.auto}
            title="Business Automation"
            line="WhatsApp workflows, automated pipelines, backend logic that runs itself."
            tags={['n8n', 'WhatsApp API', 'Vercel']}
            bullets={[
              "I map the manual process fully before automating anything",
              "Automation should be invisible to the end user",
              "Every workflow gets a fallback for when things break"
            ]}
            styleAnim={animStyle(inView, 0.54, 50)}
          />
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;
