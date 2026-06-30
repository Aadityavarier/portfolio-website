import React from 'react';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const pillAnimStyle = (inView, index) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'scale(1)' : 'scale(0.85)',
  transition: `opacity 0.4s ease ${index * 0.035}s, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.035}s`,
  willChange: 'opacity, transform',
});

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const categoryBoxStyle = {
  background: 'rgba(17,17,24,0.8)',
  border: '1px solid #1E1E2E',
  borderRadius: '16px',
  padding: '2rem',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%',
};

const Stack = () => {
  const [ref, inView] = useInView(0.3);

  const cols = [
    {
      title: 'AI & DATA SCIENCE',
      pills: [
        'Python', 'SQL', 'TensorFlow', 'Keras', 'pandas', 'NumPy', 
        'Matplotlib', 'LSTM', 'Quantitative Modeling', 
        'Agentic AI Frameworks', 'Prompt Engineering'
      ]
    },
    {
      title: 'WEB DEVELOPMENT',
      pills: [
        'JavaScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 
        'HTML', 'CSS', 'REST APIs', 'Supabase', 'PostgreSQL', 'Vercel'
      ]
    },
    {
      title: 'TOOLS & ECOSYSTEM',
      pills: [
        'Git', 'GitHub', 'n8n', 'WhatsApp Cloud API', 
        'Figma', 'Google Gemini API', 'MSG91'
      ]
    }
  ];

  let pillGlobalIndex = 0;
  const touch = isTouchDevice();

  return (
    <section id="stack" className="section" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(10, 10, 20, 0.70)',
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
            TOOLS OF THE TRADE
          </p>
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', ...animStyle(inView, 0.15, 40) }}
          >
            The Stack
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cols.map((col, colIdx) => (
            <div 
              key={col.title} 
              className="card flex flex-col"
              style={{
                ...categoryBoxStyle,
                ...animStyle(inView, 0.3 + (colIdx * 0.1), 30)
              }}
              onMouseEnter={(e) => {
                if (!touch) {
                  e.currentTarget.style.borderColor = '#7B5EA7';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(123,94,167,0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!touch) {
                  e.currentTarget.style.borderColor = '#1E1E2E';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <h3 
                className="font-mono text-[#4A4A6A] mb-4 uppercase tracking-[0.12em]"
                style={{ fontSize: '0.68rem' }}
              >
                {col.title}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {col.pills.map((pill) => {
                  const currentIndex = pillGlobalIndex++;
                  return (
                    <span
                      key={pill}
                      className="font-mono text-[0.75rem] bg-[#111118] text-[#8B8BA7] border border-[#1E1E2E] rounded-full px-3 py-1.5 md:px-4 md:py-2 transition-colors duration-200 cursor-default hover:border-[#7B5EA7] hover:text-[#C084FC] hover:shadow-[0_0_16px_rgba(123,94,167,0.2)]"
                      style={{
                        ...pillAnimStyle(inView, currentIndex)
                      }}
                    >
                      {pill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stack;
