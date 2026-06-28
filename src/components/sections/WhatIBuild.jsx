import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillarCard from '../ui/PillarCard';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { EASE, DURATION, STAGGER, OFFSET, isMobile } from '../../utils/animationConfig';

gsap.registerPlugin(ScrollTrigger);

/* Minimal SVG Icons */
const NeuralNetworkIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <circle cx="12" cy="12" r="4" />
    <circle cx="36" cy="12" r="4" />
    <circle cx="12" cy="36" r="4" />
    <circle cx="36" cy="36" r="4" />
    <circle cx="24" cy="24" r="4" />
    <line x1="16" y1="12" x2="20" y2="22" />
    <line x1="32" y1="12" x2="28" y2="22" />
    <line x1="16" y1="36" x2="20" y2="26" />
    <line x1="32" y1="36" x2="28" y2="26" />
    <line x1="16" y1="14" x2="32" y2="34" />
    <line x1="32" y1="14" x2="16" y2="34" />
  </svg>
);

const BrowserIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <rect x="4" y="8" width="40" height="32" rx="4" />
    <line x1="4" y1="16" x2="44" y2="16" />
    <circle cx="10" cy="12" r="1.5" fill="currentColor" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    <circle cx="22" cy="12" r="1.5" fill="currentColor" />
    <line x1="12" y1="24" x2="28" y2="24" />
    <line x1="12" y1="28" x2="36" y2="28" />
    <line x1="12" y1="32" x2="22" y2="32" />
  </svg>
);

const AutomationIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <circle cx="24" cy="24" r="14" />
    <path d="M24 14v4l3 3" />
    <path d="M20 8l4-4 4 4" />
    <path d="M24 4v6" />
    <circle cx="24" cy="24" r="6" />
    <path d="M28 20l4-4" />
    <path d="M32 16l-1 3 3-1" />
  </svg>
);

const pillars = [
  {
    icon: <NeuralNetworkIcon />,
    title: 'AI & Data Science',
    description:
      'Algorithmic systems, quantitative models, machine learning pipelines, and agentic AI workflows — built to process, predict, and automate.',
    tags: ['Python', 'SQL', 'TensorFlow', 'Quantitative Modeling', 'Agentic AI'],
  },
  {
    icon: <BrowserIcon />,
    title: 'Web Development',
    description:
      'Full-stack production applications. From real-time dashboards and business management systems to client-facing interfaces that convert.',
    tags: ['React', 'Next.js', 'Supabase', 'Tailwind', 'Framer Motion'],
  },
  {
    icon: <AutomationIcon />,
    title: 'Business Automation',
    description:
      'Systems that replace manual work. WhatsApp workflows, automated pipelines, and backend logic that runs while you focus elsewhere.',
    tags: ['n8n', 'WhatsApp API', 'Vercel', 'API Integration'],
  },
];

const WhatIBuild = React.memo(() => {
  const containerRef = useScrollAnimation((container) => {
    const mobile = isMobile();
    const offset = mobile ? OFFSET.small : OFFSET.standard;
    const line = container.querySelector('.connector-line');
    const cards = container.querySelectorAll('.pillar-card');

    /* Set initial states immediately */
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(cards, { opacity: 0, y: offset });

    /* Create timeline triggered when container is scrolled into view */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(line, {
      scaleX: 1,
      duration: DURATION.standard,
      ease: EASE.entrance,
    })
    .to(cards, {
      opacity: 1,
      y: 0,
      duration: DURATION.standard,
      stagger: 0.15,
      ease: EASE.entrance,
    }, '+=0.05'); // small delay after line draws before cards drop
  });

  return (
    <section ref={containerRef} className="section-padding">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-label text-primary block mb-3">WHAT I DO</span>
        <h2 className="text-section-title text-text-primary">What I Build</h2>
      </div>

      {/* Connector Line (desktop only) */}
      <div className="hidden lg:block mb-10">
        <div
          className="connector-line h-[1px] w-full origin-left"
          style={{ background: 'linear-gradient(to right, #7B5EA7, #1E1E2E)' }}
        />
      </div>

      {/* Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="pillar-card will-change-transform">
            <PillarCard {...pillar} />
          </div>
        ))}
      </div>
    </section>
  );
});

WhatIBuild.displayName = 'WhatIBuild';

export default WhatIBuild;
