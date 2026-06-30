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

const OperateCard = ({ badge, title, tagline, bullets, closing, styleAnim }) => {
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
        className="card expandable-card group flex flex-col cursor-pointer transition-all duration-300 h-full relative"
        style={{
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid #1E1E2E',
          borderRadius: '16px',
          padding: '2rem',
          ...styleAnim
        }}
        onMouseEnter={(e) => {
          if (!touch) {
            e.currentTarget.style.borderColor = '#7B5EA7';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 40px rgba(123,94,167,0.2)';
            const icon = e.currentTarget.querySelector('.card-expand-icon');
            if (icon) {
              icon.style.opacity = '1';
              icon.style.borderColor = '#7B5EA7';
              icon.style.transform = 'translate(2px, -2px)';
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!touch) {
            e.currentTarget.style.borderColor = '#1E1E2E';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            const icon = e.currentTarget.querySelector('.card-expand-icon');
            if (icon) {
              icon.style.opacity = '0.5';
              icon.style.borderColor = '#1E1E2E';
              icon.style.transform = 'translate(0, 0)';
            }
          }
        }}
      >
        <ExpandIcon />
        <div style={{ marginBottom: '0.75rem' }}>
          <span className="font-mono text-[#7B5EA7]" style={{ fontSize: '0.68rem' }}>
            {badge}
          </span>
        </div>
        <h3 className="font-display font-semibold text-text-primary text-[1.1rem]" style={{ marginBottom: '0.85rem' }}>
          {title}
        </h3>
        
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          color: '#8B8BA7',
          lineHeight: 1.6,
        }}>
          {tagline}
        </p>
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

              <div style={{ marginBottom: '0.75rem' }}>
                <span className="font-mono text-[#7B5EA7] text-[0.85rem]">
                  {badge}
                </span>
              </div>

              <h3 className="font-display text-3xl font-semibold text-text-primary" style={{ marginBottom: '1.25rem' }}>
                {title}
              </h3>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {bullets.map((bullet, i) => (
                  <li key={i} className="font-body text-[#8B8BA7]" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', lineHeight: 1.6, fontSize: '1rem' }}>
                    <span className="text-[#7B5EA7]" style={{ marginTop: '0.5rem', fontSize: '8px' }}>●</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <p className="font-mono text-[#4A4A6A] italic pt-6 border-t border-[#1E1E2E]" style={{ fontSize: '0.9rem' }}>
                {closing}
              </p>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const Presence = () => {
  const [ref, inView] = useInView(0.3);

  return (
    <section id="how-i-operate" className="section" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(15, 10, 25, 0.68)',
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
            BEYOND THE SCREEN
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', ...animStyle(inView, 0.15, 40) }}
          >
            How I Operate
          </h2>
          <p 
            className="font-body font-light text-[#8B8BA7]"
            style={{ fontSize: '1.1rem', marginBottom: 'clamp(40px, 6vw, 64px)', ...animStyle(inView, 0.25, 40) }}
          >
            Code is one output. This is the rest.
          </p>
        </div>

        {/* Grid - Equal Height */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          <OperateCard
            badge="Google Student Ambassador 2025–26"
            title="Google Gemini Campus Ambassador"
            tagline="Running AI-powered events and campus campaigns for Google."
            bullets={[
              'Organized "Battle of the Bands: AI Music Night" — 100% submission rate',
              'Built end-to-end AI workflow using Gemini Pro, Lyria, Nano Banana',
              'Automated certificate distribution and community onboarding',
              'Conducted structured campus interviews for Google\'s research'
            ]}
            closing="Three weeks in. One event run. 100% submission rate."
            styleAnim={animStyle(inView, 0.35, 50)}
          />

          <OperateCard
            badge="Rotaract Club Member"
            title="Community Service"
            tagline="Blood drives, workshops, and showing up for people who need it."
            bullets={[
              'Hosted blood donation campaigns',
              'Conducted self-defense workshops at Rotary Adivasi School',
              'Organized health checkups for old age homes',
              'Distributed free books to orphanages'
            ]}
            closing="Showing up for people is a skill. I practice it."
            styleAnim={animStyle(inView, 0.47, 50)}
          />

          <OperateCard
            badge="SHAIDS · Students Hive of AI & Data Science"
            title="Tech & Sports Teams"
            tagline="Helping run hackathons and tech events on campus."
            bullets={[
              'Volunteered in organizing Hack-Hive hackathon',
              'Supported Technitude tech event',
              'Helped host AI Halloween Heist event',
              'Assisted in Design Thinking and Prompt Engineering workshops'
            ]}
            closing="The best way to learn tech is to put it in front of real people."
            styleAnim={animStyle(inView, 0.59, 50)}
          />

        </div>
      </div>
    </section>
  );
};

export default Presence;
