import React from 'react';
import StatusDot from '../ui/StatusDot';
import { useInView } from '../../hooks/useInView';

const currentItems = [
  {
    variant: 'active',
    title: 'Agentic AI Systems',
    description:
      'Building autonomous AI agents that chain tools, make decisions, and complete multi-step tasks without human input.',
  },
  {
    variant: 'active',
    title: 'Business Automation Suite',
    description:
      'Developing a multi-tenant SaaS product for local businesses using WhatsApp API and n8n workflow automation.',
  },
  {
    variant: 'learning',
    title: 'Japanese Language',
    description:
      'Working toward proficiency for long-term goal of working and settling in Japan.',
  },
  {
    variant: 'learning',
    title: 'Quantitative Finance',
    description:
      'Going deeper into quant systems, market microstructure, and algorithmic strategy development for Indian equity markets.',
  },
];

const Currently = React.memo(() => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className="section-padding">
      {/* Section Header */}
      <div 
        className="mb-16"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <span className="text-label text-primary block mb-3">RIGHT NOW</span>
        <h2 className="text-section-title text-text-primary">What's In The Lab</h2>
      </div>

      {/* Items */}
      <div className="max-w-3xl space-y-8">
        {currentItems.map((item, i) => (
          <div
            key={item.title}
            className="flex items-start gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`
            }}
          >
            <div className="mt-1.5">
              <StatusDot variant={item.variant} />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-text-primary mb-1">
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

Currently.displayName = 'Currently';

export default Currently;
