import React, { useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const TradingBot = () => {
  const [ref, inView] = useInView(0.3);
  const pathRef = useRef(null);

  useEffect(() => {
    if (pathRef.current && inView) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
      
      // Trigger reflow
      pathRef.current.getBoundingClientRect();
      
      pathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out 0.2s';
      pathRef.current.style.strokeDashoffset = '0';
    }
  }, [inView]);

  return (
    <section id="trading-bot" className="section" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(10, 15, 20, 0.68)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Content wrapper - Right side content, left side SVG */}
      <div className="relative z-1 w-full h-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-[100px] md:pt-0">
        
        {/* Project number watermark */}
        <div 
          className="absolute top-8 right-8 font-display font-bold leading-none select-none"
          style={{ fontSize: '8rem', color: 'rgba(123,94,167,0.1)' }}
        >
          02
        </div>

        {/* Left Content - SVG Chart */}
        <div 
          className="flex-1 w-full max-w-xl block mt-12 md:mt-0"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-60px)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >
          <svg viewBox="0 0 600 300" className="w-full h-auto drop-shadow-xl">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(123,94,167,0.6)" />
                <stop offset="100%" stopColor="rgba(123,94,167,0)" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="125" x2="600" y2="125" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="275" x2="600" y2="275" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Y-axis labels */}
            <text x="10" y="45" fill="#4A4A6A" fontSize="11" className="font-mono">400</text>
            <text x="10" y="120" fill="#4A4A6A" fontSize="11" className="font-mono">300</text>
            <text x="10" y="195" fill="#4A4A6A" fontSize="11" className="font-mono">200</text>
            <text x="10" y="270" fill="#4A4A6A" fontSize="11" className="font-mono">100</text>

            {/* Area fill */}
            <path 
              d="M0,220 C50,200 100,180 150,160 C200,140 220,170 260,130 C300,90 340,110 380,70 C420,40 460,60 500,30 C530,15 560,20 600,5 L600,300 L0,300 Z" 
              fill="url(#chartGradient)" 
              opacity={inView ? 0.15 : 0}
              style={{ transition: 'opacity 1s ease 1s' }}
            />

            {/* Chart line */}
            <path 
              ref={pathRef}
              d="M0,220 C50,200 100,180 150,160 C200,140 220,170 260,130 C300,90 340,110 380,70 C420,40 460,60 500,30 C530,15 560,20 600,5" 
              stroke="#9B7FD4" 
              strokeWidth="2.5" 
              fill="none" 
            />
          </svg>
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full max-w-xl">
          <div style={animStyle(inView, 0, 30)} className="mb-6">
            <span
              className="font-mono inline-block rounded-full"
              style={{
                background: 'rgba(123,94,167,0.1)',
                color: '#9B7FD4',
                border: '1px solid rgba(123,94,167,0.3)',
                fontSize: '0.7rem',
                padding: '4px 12px',
                letterSpacing: '0.05em'
              }}
            >
              ALGORITHMIC SYSTEMS EXPERIMENT
            </span>
          </div>

          <h2
            className="font-display font-bold text-text-primary mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', ...animStyle(inView, 0, 60) }}
          >
            Algorithmic Trading System
          </h2>

          <p
            className="font-body font-light text-text-secondary mb-8"
            style={{ fontSize: '1.1rem', ...animStyle(inView, 0.15, 40) }}
          >
            200+ trades backtested. Built to understand how quant systems actually work.
          </p>

          <div
            className="flex flex-wrap gap-2 mb-10"
            style={animStyle(inView, 0.3, 30)}
          >
            {['Python', 'LSTM', 'pandas-ta', 'Yahoo Finance', 'vectorbt', 'NumPy'].map((tag) => (
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

      </div>
    </section>
  );
};

export default TradingBot;
