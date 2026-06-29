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
    <section id="hero" className="section relative min-h-screen">
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
      <div className="relative z-1 w-full flex flex-col justify-center max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <div 
          className="flex items-center gap-3 mb-8 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0ms'
          }}
        >
          <span className="relative flex h-[6px] w-[6px]">
            <span className="pulse-green absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
          </span>
          <span 
            className="font-mono uppercase text-[#7B5EA7]"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display font-bold text-text-primary leading-[0.95] tracking-tight mb-8">
          <span 
            className="block transition-all duration-1000 cubic-bezier(0.16,1,0.3,1)"
            style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateX(0)' : 'translateX(-60px)',
              transitionDelay: '200ms'
            }}
          >
            Aaditya
          </span>
          <span 
            className="block transition-all duration-1000 cubic-bezier(0.16,1,0.3,1)"
            style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
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
          className="font-body font-light text-[#8B8BA7] mb-6 transition-all duration-1000 cubic-bezier(0.16,1,0.3,1)"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '600ms'
          }}
        >
          I build products that do the work.
        </p>

        {/* Metadata */}
        <div 
          className="mb-12 transition-all duration-1000 cubic-bezier(0.16,1,0.3,1) self-start"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '800ms'
          }}
        >
          <p 
            className="font-mono text-[#C084FC]"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              background: 'rgba(123, 94, 167, 0.15)',
              border: '1px solid rgba(123, 94, 167, 0.3)',
              borderRadius: '8px',
              padding: '10px 16px',
              boxShadow: '0 0 20px rgba(123, 94, 167, 0.1)'
            }}
          >
            Third Year · AI & Data Science · Mumbai University · Google Gemini Campus Ambassador
          </p>
        </div>

        {/* Buttons */}
        <div 
          className="flex gap-4 transition-all duration-1000 cubic-bezier(0.16,1,0.3,1)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1000ms'
          }}
        >
          <button
            onClick={() => scrollTo('hotel-manager')}
            className="font-body font-medium transition-transform duration-200 hover:scale-105 active:scale-95"
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
            className="font-body font-medium transition-transform duration-200 hover:scale-105 active:scale-95"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-1000 delay-[1200ms]"
        style={{ opacity: mounted ? 1 : 0, zIndex: 1 }}
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
