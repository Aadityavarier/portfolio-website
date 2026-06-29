import React from 'react';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const HotelManager = () => {
  const [ref, inView] = useInView(0.3);

  return (
    <section id="hotel-manager" className="section" ref={ref}>
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
      <div className="relative z-1 w-full h-full flex flex-col md:flex-row items-center justify-between gap-12 pt-[100px] md:pt-0">
        
        {/* Project number watermark */}
        <div 
          className="absolute top-8 right-8 font-display font-bold leading-none select-none"
          style={{ fontSize: '8rem', color: 'rgba(123,94,167,0.1)' }}
        >
          01
        </div>

        {/* Left Content */}
        <div className="flex-1 w-full max-w-xl">
          <div style={animStyle(inView, 0, 30)} className="mb-6">
            <span
              className="font-mono inline-block rounded-full"
              style={{
                background: 'rgba(34,197,94,0.1)',
                color: '#22C55E',
                border: '1px solid rgba(34,197,94,0.2)',
                fontSize: '0.7rem',
                padding: '4px 12px',
                letterSpacing: '0.05em'
              }}
            >
              LIVE CLIENT PROJECT
            </span>
          </div>

          <h2
            className="font-display font-bold text-text-primary mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', ...animStyle(inView, 0, 60) }}
          >
            Catering Operations Dashboard
          </h2>

          <p
            className="font-body font-light text-text-secondary mb-8"
            style={{ fontSize: '1.1rem', ...animStyle(inView, 0.15, 40) }}
          >
            Full-stack. Real client. Mumbai. Running in production.
          </p>

          <div
            className="flex flex-wrap gap-2 mb-10"
            style={animStyle(inView, 0.3, 30)}
          >
            {['Next.js', 'Supabase', 'PostgreSQL', 'Vercel', 'MSG91', 'Row Level Security'].map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{
                  border: '1px solid #1E1E2E',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  background: '#111118',
                  color: '#8B8BA7',
                  fontSize: '0.72rem'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* Right Content - Abstract Dashboard Mockup */}
        <div 
          className="flex-1 w-full max-w-xl block mt-12 md:mt-0"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(60px)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          <div
            className="w-full aspect-[4/3] flex flex-col"
            style={{
              background: '#0A0A0F',
              borderRadius: '8px',
              border: '1px solid #1E1E2E',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            {/* Top Bar */}
            <div className="h-8 border-b border-border flex items-center px-4 gap-2" style={{ background: '#111118' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-16 border-r border-border p-4 flex flex-col gap-4" style={{ background: 'rgba(17,17,24,0.5)' }}>
                <div className="w-full h-2 rounded bg-[#1E1E2E]" />
                <div className="w-full h-2 rounded bg-[#1E1E2E]" />
                <div className="w-full h-2 rounded bg-[#1E1E2E]" />
              </div>
              
              {/* Main Area */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                {/* 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 rounded border border-border" style={{ background: 'rgba(123,94,167,0.05)' }} />
                  <div className="h-20 rounded border border-border" style={{ background: 'rgba(123,94,167,0.1)' }} />
                  <div className="h-20 rounded border border-border" style={{ background: 'rgba(123,94,167,0.1)' }} />
                  <div className="h-20 rounded border border-border" style={{ background: 'rgba(123,94,167,0.05)' }} />
                </div>
                
                {/* Bar Chart */}
                <div className="flex-1 border border-border rounded p-4 flex items-end gap-3" style={{ background: 'rgba(17,17,24,0.3)' }}>
                  <div className="flex-1 bg-primary opacity-20 rounded-t h-[40%]" />
                  <div className="flex-1 bg-primary opacity-40 rounded-t h-[70%]" />
                  <div className="flex-1 bg-primary opacity-30 rounded-t h-[50%]" />
                  <div className="flex-1 bg-primary opacity-60 rounded-t h-[90%]" />
                  <div className="flex-1 bg-primary opacity-50 rounded-t h-[80%]" />
                  <div className="flex-1 bg-primary opacity-80 rounded-t h-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HotelManager;
