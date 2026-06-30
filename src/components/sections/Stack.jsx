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
  background: 'radial-gradient(circle at 30% 20%, rgba(123,94,167,0.06) 0%, transparent 50%), rgba(17,17,24,0.8)',
  border: '1px solid #1E1E2E',
  borderRadius: '16px',
  padding: '2.5rem',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  cursor: 'default',
  height: '100%',
};

const Stack = () => {
  const [ref, inView] = useInView(0.3);

  const cols = [
    {
      title: 'AI & Data Science',
      pills: [
        'Python', 'SQL', 'TensorFlow', 'Keras', 'pandas', 'NumPy', 
        'Matplotlib', 'LSTM', 'Quantitative Modeling', 
        'Agentic AI Frameworks', 'Prompt Engineering'
      ]
    },
    {
      title: 'Web Development',
      pills: [
        'JavaScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 
        'HTML', 'CSS', 'REST APIs', 'Supabase', 'PostgreSQL', 'Vercel'
      ]
    },
    {
      title: 'Tools & Ecosystem',
      pills: [
        'Git', 'GitHub', 'n8n', 'WhatsApp Cloud API', 
        'Figma', 'Google Gemini API', 'MSG91'
      ]
    }
  ];

  let pillGlobalIndex = 0;
  const touch = isTouchDevice();

  return (
    <section id="stack" className="section" aria-label="Technology Stack" ref={ref}>
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
        <div className="text-center mb-10">
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
              className="stack-category-box card flex flex-col"
              style={{
                ...categoryBoxStyle,
                justifyContent: 'flex-start',
                ...animStyle(inView, 0.3 + (colIdx * 0.1), 30)
              }}
              onMouseEnter={(e) => {
                if (!touch) {
                  e.currentTarget.style.borderColor = '#7B5EA7';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(123,94,167,0.2)';
                  const label = e.currentTarget.querySelector('.stack-category-label');
                  if (label) label.style.color = '#C084FC';
                }
              }}
              onMouseLeave={(e) => {
                if (!touch) {
                  e.currentTarget.style.borderColor = '#1E1E2E';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const label = e.currentTarget.querySelector('.stack-category-label');
                  if (label) label.style.color = '#F8F8FF';
                }
              }}
            >
              <h3 
                className="stack-category-label font-mono uppercase tracking-[0.12em]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: '#F8F8FF',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #1E1E2E',
                  transition: 'color 0.3s ease',
                }}
              >
                {col.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', rowGap: '8px' }}>
                {col.pills.map((pill) => {
                  const currentIndex = pillGlobalIndex++;
                  return (
                    <span
                      key={pill}
                      className="font-mono bg-[#111118] text-[#8B8BA7] border border-[#1E1E2E] rounded-full transition-colors duration-200 cursor-default hover:border-[#7B5EA7] hover:text-[#C084FC] hover:shadow-[0_0_16px_rgba(123,94,167,0.2)]"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.75rem',
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
