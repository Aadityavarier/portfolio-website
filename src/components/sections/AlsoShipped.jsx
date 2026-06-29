import React from 'react';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const cards = [
  {
    badge: 'AI TOOL',
    badgeColor: '#C084FC',
    badgeBorder: 'rgba(192,132,252,0.3)',
    title: 'InternShield',
    line: 'AI-powered fake internship offer letter detector.',
    tags: ['FastAPI', 'Next.js', 'RoBERTa', 'NLP'],
    link: '#',
  },
  {
    badge: 'FREELANCE',
    badgeColor: '#22C55E',
    badgeBorder: 'rgba(34,197,94,0.3)',
    title: 'Client Web Projects',
    line: 'Portfolio and business websites for local clients. Built, delivered, watermarked.',
    tags: ['React', 'Vite', 'Next.js', 'Tailwind', 'Supabase'],
    link: '#',
  },
  {
    badge: 'IN PROGRESS',
    badgeColor: '#F59E0B',
    badgeBorder: 'rgba(245,158,11,0.3)',
    title: 'Business Automation Suite',
    line: 'Multi-tenant micro-SaaS for local service businesses.',
    tags: ['Next.js', 'n8n', 'Supabase', 'WhatsApp API'],
    link: '#',
  }
];

const AlsoShipped = () => {
  const [ref, inView] = useInView(0.3);

  return (
    <section id="also-shipped" className="section" ref={ref}>
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
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className="group flex flex-col no-underline transition-all duration-300"
              style={{
                background: 'rgba(17,17,24,0.95)',
                border: '1px solid #1E1E2E',
                borderRadius: '16px',
                padding: '2rem',
                ...animStyle(inView, 0.3 + (idx * 0.12), 50)
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = card.badgeColor;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E1E2E';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="mb-6">
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

              <h3 className="font-display font-semibold text-text-primary text-xl mb-3 group-hover:text-accent-glow transition-colors duration-300">
                {card.title}
              </h3>
              
              <p className="font-body text-text-secondary text-sm leading-relaxed flex-1 mb-8">
                {card.line}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono"
                    style={{
                      border: '1px solid #1E1E2E',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      background: '#111118',
                      color: '#8B8BA7',
                      fontSize: '0.65rem'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AlsoShipped;
