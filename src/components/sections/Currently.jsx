import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatusDot from '../ui/StatusDot';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { EASE, DURATION, STAGGER, OFFSET, isMobile } from '../../utils/animationConfig';

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useScrollAnimation((container) => {
    const mobile = isMobile();
    const offset = mobile ? OFFSET.small : OFFSET.standard;
    const items = container.querySelectorAll('.current-item');

    /* Set initial states immediately */
    gsap.set(items, { opacity: 0, x: -(mobile ? offset : OFFSET.standard) });

    /* Items slide in from left with stagger */
    gsap.to(items, {
      opacity: 1,
      x: 0,
      duration: DURATION.standard,
      stagger: 0.2,
      ease: EASE.entrance,
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={containerRef} className="section-padding">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-label text-primary block mb-3">RIGHT NOW</span>
        <h2 className="text-section-title text-text-primary">What's In The Lab</h2>
      </div>

      {/* Items */}
      <div className="max-w-3xl space-y-8">
        {currentItems.map((item) => (
          <div
            key={item.title}
            className="current-item flex items-start gap-4 will-change-transform"
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
