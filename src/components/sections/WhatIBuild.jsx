import React from 'react';
import PillarCard from '../ui/PillarCard';
import { useInView } from '../../hooks/useInView';

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
    approachBullets: [
      'I start with the data pipeline before touching any model',
      'Every model gets backtested or validated before it ships',
      'I document failure modes, not just results',
    ],
  },
  {
    icon: <BrowserIcon />,
    title: 'Web Development',
    description:
      'Full-stack production applications. From real-time dashboards and business management systems to client-facing interfaces that convert.',
    tags: ['React', 'Next.js', 'Supabase', 'Tailwind', 'Framer Motion'],
    approachBullets: [
      'Production-first thinking from day one — not prototype mentality',
      'Every UI decision is made with the client\'s end user in mind',
      'I don\'t hand over code, I hand over a working product',
    ],
  },
  {
    icon: <AutomationIcon />,
    title: 'Business Automation',
    description:
      'Systems that replace manual work. WhatsApp workflows, automated pipelines, and backend logic that runs while you focus elsewhere.',
    tags: ['n8n', 'WhatsApp API', 'Vercel', 'API Integration'],
    approachBullets: [
      'I map the manual process fully before automating anything',
      'Automation should be invisible to the end user',
      'Every workflow gets a fallback for when things break',
    ],
  },
];

const WhatIBuild = React.memo(() => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} id="what-i-build" className="section-padding">
      <div 
        className="mb-16"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <span className="text-label text-primary block mb-3">WHAT I DO</span>
        <h2 className="text-section-title text-text-primary">Domains & Systems</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div
          className="hidden lg:block absolute top-[50%] left-0 w-full h-[1px] -z-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(123,94,167,0.3) 50%, transparent)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s'
          }}
        />

        {pillars.map((pillar, i) => (
          <div 
            key={pillar.title} 
            className="will-change-transform"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`
            }}
          >
            <PillarCard {...pillar} />
          </div>
        ))}
      </div>
    </section>
  );
});

WhatIBuild.displayName = 'WhatIBuild';

export default WhatIBuild;
