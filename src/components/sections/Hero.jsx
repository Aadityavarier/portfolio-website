import React, { useEffect, useState } from 'react';
import { smoothScrollTo } from '../../utils/smoothScroll';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth rendering before animation starts
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    smoothScrollTo(id);
  };

  return (
    <section 
      id="hero" 
      className="section relative"
      aria-label="Introduction"
      style={{
        position: 'relative',
        minHeight: '100vh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(70px, 9vh, 90px)',
        paddingBottom: 'clamp(60px, 8vh, 80px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(10, 10, 15, 0.55)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-1 w-full flex flex-col justify-center max-w-7xl mx-auto" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        
        {/* Eyebrow */}
        <div 
          className="flex items-center gap-3 transition-smooth duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0ms',
            marginBottom: 'clamp(12px, 2vw, 18px)'
          }}
        >
          <span className="relative flex h-[6px] w-[6px]">
            <span className="pulse-green absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
          </span>
          <span 
            className="font-mono uppercase text-[#E9D5FF]"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        <h1 
          className="hero-name font-display font-bold text-text-primary tracking-tight"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8.5rem)',
            lineHeight: 0.95,
            marginBottom: 'clamp(14px, 2.5vw, 22px)'
          }}
        >
          <span 
            className="block transition-smooth duration-1000 cubic-bezier(0.16,1,0.3,1)"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateX(0)' : 'translateX(-60px)',
              transitionDelay: '200ms'
            }}
          >
            Aaditya
          </span>
          <span 
            className="block transition-smooth duration-1000 cubic-bezier(0.16,1,0.3,1)"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateX(0)' : 'translateX(-60px)',
              transitionDelay: '380ms'
            }}
          >
            Varier
          </span>
        </h1>

        {/* Subline */}
        <p 
          className="font-body font-light text-[#8B8BA7] transition-smooth duration-1000 cubic-bezier(0.16,1,0.3,1)"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '600ms',
            marginBottom: 'clamp(8px, 1.8vw, 14px)'
          }}
        >
          I build products that do the work.
        </p>

        {/* Metadata */}
        <div 
          className="transition-smooth duration-1000 cubic-bezier(0.16,1,0.3,1) self-start"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '800ms',
            marginBottom: 'clamp(16px, 3vw, 26px)'
          }}
        >
          <p 
            className="hero-metadata-pill font-body font-medium text-[#E9D5FF] leading-relaxed rounded-md md:rounded-lg text-center"
            style={{
              letterSpacing: '0.02em',
              background: 'rgba(123, 94, 167, 0.15)',
              border: '1px solid rgba(123, 94, 167, 0.3)',
              boxShadow: '0 0 20px rgba(123, 94, 167, 0.1)'
            }}
          >
            Third Year · AI & Data Science · Mumbai University · Google Gemini Campus Ambassador
          </p>
        </div>

        <div 
          className="w-full sm:w-auto transition-smooth duration-1000 cubic-bezier(0.16,1,0.3,1)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1000ms',
            display: 'flex',
            flexDirection: 'row',
            gap: 'clamp(10px, 2vw, 18px)',
            flexWrap: 'nowrap',
          }}
        >
          <button
            onClick={() => scrollTo('hotel-manager')}
            className="hero-button w-full sm:w-auto font-body font-medium transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              background: '#7B5EA7',
              color: '#F8F8FF',
              borderRadius: '8px',
              padding: '12px 28px',
            }}
          >
            See Work
          </button>
          
          <button
            onClick={() => scrollTo('contact')}
            className="hero-button w-full sm:w-auto font-body font-medium transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'transparent',
              color: '#8B8BA7',
              border: '1px solid #1E1E2E',
              borderRadius: '8px',
              padding: '12px 28px',
            }}
          >
            Contact
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div 
        className="transition-opacity duration-1000 delay-[1200ms]"
        style={{
          opacity: mounted ? 1 : 0,
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          className="w-[1px] h-[60px] pulse-scroll"
          style={{
            background: 'linear-gradient(to bottom, #7B5EA7, transparent)',
          }}
        />
        <span 
          className="font-mono text-[#4A4A6A]" 
          style={{ fontSize: '0.65rem' }}
        >
          scroll
        </span>
      </div>

    </section>
  );
};

export default Hero;
