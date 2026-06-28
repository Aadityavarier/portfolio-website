import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../ui/ProjectCard';
import SkillTag from '../ui/SkillTag';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { EASE, DURATION, STAGGER, OFFSET, isMobile } from '../../utils/animationConfig';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   ABSTRACT DASHBOARD MOCKUP (pure CSS/SVG)
   ============================================ */
const DashboardMockup = () => (
  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-bg">
    {/* Browser chrome */}
    <div className="dashboard-chrome flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
      <div className="ml-4 h-5 w-40 rounded bg-border" />
    </div>
    <div className="flex h-[calc(100%-44px)]">
      {/* Sidebar */}
      <div className="dashboard-sidebar w-16 md:w-20 border-r border-border bg-surface p-3 space-y-4 pt-6">
        <div className="h-2 w-full rounded bg-primary/30" />
        <div className="h-2 w-3/4 rounded bg-border" />
        <div className="h-2 w-3/4 rounded bg-border" />
        <div className="h-2 w-3/4 rounded bg-border" />
      </div>
      {/* Main content */}
      <div className="dashboard-content flex-1 p-3 md:p-5 space-y-4">
        {/* Top bar */}
        <div className="h-4 w-32 rounded bg-border" />
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <div className="h-14 md:h-16 rounded-lg bg-surface border border-border flex items-center justify-center">
            <div className="h-3 w-10 rounded bg-primary/40" />
          </div>
          <div className="h-14 md:h-16 rounded-lg bg-surface border border-border flex items-center justify-center">
            <div className="h-3 w-10 rounded bg-accent-glow/30" />
          </div>
          <div className="h-14 md:h-16 rounded-lg bg-surface border border-border flex items-center justify-center">
            <div className="h-3 w-10 rounded bg-primary/40" />
          </div>
          <div className="h-14 md:h-16 rounded-lg bg-surface border border-border flex items-center justify-center">
            <div className="h-3 w-10 rounded bg-accent-glow/30" />
          </div>
        </div>
        {/* Chart area */}
        <div className="h-20 md:h-28 rounded-lg bg-surface border border-border flex items-end px-3 pb-3 gap-1">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-primary/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {/* Data rows */}
        <div className="space-y-2">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-3 px-2">
              <div className="h-2 w-2 rounded-full bg-primary/40" />
              <div className="h-2 flex-1 rounded bg-border" />
              <div className="h-2 w-12 rounded bg-border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ============================================
   SVG TRADING CHART (animated path)
   ============================================ */
const TradingChart = () => {
  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-bg">
      <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[60, 120, 180, 240].map((y) => (
          <line
            key={`h-${y}`}
            x1="40"
            y1={y}
            x2="380"
            y2={y}
            stroke="#1E1E2E"
            strokeWidth="0.5"
          />
        ))}
        {[100, 160, 220, 280, 340].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="30"
            x2={x}
            y2="270"
            stroke="#1E1E2E"
            strokeWidth="0.5"
          />
        ))}
        {/* Y-axis labels */}
        <text x="30" y="64" fill="#4A4A6A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono">
          400
        </text>
        <text x="30" y="124" fill="#4A4A6A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono">
          300
        </text>
        <text x="30" y="184" fill="#4A4A6A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono">
          200
        </text>
        <text x="30" y="244" fill="#4A4A6A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono">
          100
        </text>
        {/* Price line — trending upward with volatility */}
        <path
          className="trading-chart-line"
          d="M40,240 L65,220 L80,230 L100,200 L120,210 L140,180 L155,190 L170,160 L190,175 L210,140 L225,155 L240,120 L260,135 L275,100 L290,115 L310,80 L330,95 L345,70 L360,60 L380,50"
          fill="none"
          stroke="#9B7FD4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Glow version (underneath) */}
        <path
          d="M40,240 L65,220 L80,230 L100,200 L120,210 L140,180 L155,190 L170,160 L190,175 L210,140 L225,155 L240,120 L260,135 L275,100 L290,115 L310,80 L330,95 L345,70 L360,60 L380,50"
          fill="none"
          stroke="#7B5EA7"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.15"
          filter="blur(4px)"
        />
        {/* Fill area under curve */}
        <path
          d="M40,240 L65,220 L80,230 L100,200 L120,210 L140,180 L155,190 L170,160 L190,175 L210,140 L225,155 L240,120 L260,135 L275,100 L290,115 L310,80 L330,95 L345,70 L360,60 L380,50 L380,270 L40,270 Z"
          fill="url(#chartGradient)"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B5EA7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/* ============================================
   ADDITIONAL PROJECTS DATA
   ============================================ */
const additionalProjects = [
  {
    title: 'InternShield',
    description:
      'AI-powered fake internship offer letter detector. Three-layer weighted ensemble — rule engine, NLP classifier, and NER extractor.',
    tags: ['FastAPI', 'Next.js', 'Supabase', 'RoBERTa', 'NLP'],
    badge: 'AI TOOL',
    significance:
      'Thousands of students fall victim to fake internship scams every year. InternShield provides an instant, AI-driven credibility check that protects students from wasting time, money, and trust on fraudulent offers — turning a real-world vulnerability into a solved problem.',
  },
  {
    title: 'RTTI Website',
    description:
      'Commercial single-page site for a teacher training institute. Delivered with watermark-protected preview system before client payment.',
    tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    badge: 'FREELANCE',
    significance:
      'This was a real freelance delivery for a working educational institution. The watermark-preview system solved a trust problem common in freelance web development — clients see their site before paying, but can\'t use it without the final handoff. Real business, real revenue.',
  },
  {
    title: 'Business Automation Suite',
    description:
      'Multi-tenant micro-SaaS for local service businesses. WhatsApp Cloud API automation, booking workflows, and client communication pipelines.',
    tags: ['Next.js', 'n8n', 'Supabase', 'WhatsApp API'],
    badge: 'IN PROGRESS',
    significance:
      'Local service businesses — salons, repair shops, tutors — lose hours every week on manual booking and client follow-ups. This suite automates the entire communication pipeline through WhatsApp, the platform their customers already use. It\'s infrastructure for businesses that can\'t afford a tech team.',
  },
];

/* ============================================
   MAIN WORK SECTION
   ============================================ */
const Work = React.memo(() => {
  const containerRef = useScrollAnimation((container) => {
    const mobile = isMobile();
    const offset = mobile ? OFFSET.small : OFFSET.large;

    /* ---- Project 1: CaterEase ---- */
    const proj1 = container.querySelector('.project-1');
    if (proj1) {
      const proj1Text = proj1.querySelector('.proj1-text');
      const proj1Mockup = proj1.querySelector('.proj1-mockup');
      const proj1MobileEls = proj1.querySelectorAll('.proj1-mobile-anim');
      const dashboardEls = proj1.querySelectorAll(
        '.dashboard-chrome, .dashboard-sidebar, .dashboard-content'
      );

      if (!mobile) {
        /* Set initial states */
        gsap.set(proj1Text, { opacity: 0, x: -offset });
        gsap.set(proj1Mockup, { opacity: 0, x: offset });
        gsap.set(dashboardEls, { opacity: 0 });

        /* Text slides from left, mockup slides from right — simultaneously */
        gsap.to(proj1Text, {
          opacity: 1,
          x: 0,
          duration: DURATION.major,
          ease: EASE.entrance,
          scrollTrigger: {
            trigger: proj1,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
        gsap.to(proj1Mockup, {
          opacity: 1,
          x: 0,
          duration: DURATION.major,
          ease: EASE.entrance,
          scrollTrigger: {
            trigger: proj1,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      } else {
        /* Mobile: stacked, slide up */
        gsap.set(proj1MobileEls, { opacity: 0, y: offset });
        gsap.to(proj1MobileEls, {
          opacity: 1,
          y: 0,
          duration: DURATION.standard,
          stagger: STAGGER.default,
          ease: EASE.entrance,
          scrollTrigger: {
            trigger: proj1,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        gsap.set(dashboardEls, { opacity: 0 });
      }

      /* Dashboard assembly animation */
      gsap.to(dashboardEls, {
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: proj1,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    }

    /* ---- Project 2: Trading Bot ---- */
    const proj2 = container.querySelector('.project-2');
    if (proj2) {
      /* SVG chart line draws itself using stroke-dashoffset */
      const chartLine = proj2.querySelector('.trading-chart-line');
      if (chartLine) {
        const length = chartLine.getTotalLength();
        gsap.set(chartLine, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(chartLine, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: proj2,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (!mobile) {
        const proj2Chart = proj2.querySelector('.proj2-chart');
        const proj2Text = proj2.querySelector('.proj2-text');

        gsap.set(proj2Chart, { opacity: 0, x: -offset });
        gsap.set(proj2Text, { opacity: 0, x: offset });

        gsap.to(proj2Chart, {
          opacity: 1,
          x: 0,
          duration: DURATION.major,
          ease: EASE.entrance,
          scrollTrigger: {
            trigger: proj2,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
        gsap.to(proj2Text, {
          opacity: 1,
          x: 0,
          duration: DURATION.major,
          ease: EASE.entrance,
          scrollTrigger: {
            trigger: proj2,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      } else {
        const proj2MobileEls = proj2.querySelectorAll('.proj2-mobile-anim');
        gsap.set(proj2MobileEls, { opacity: 0, y: offset });
        gsap.to(proj2MobileEls, {
          opacity: 1,
          y: 0,
          duration: DURATION.standard,
          stagger: STAGGER.default,
          ease: EASE.entrance,
          scrollTrigger: {
            trigger: proj2,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }

    /* ---- Additional Project Cards ---- */
    const additionalCards = container.querySelectorAll('.additional-card');
    gsap.set(additionalCards, { opacity: 0, y: mobile ? OFFSET.small : OFFSET.standard });
    gsap.to(additionalCards, {
      opacity: 1,
      y: 0,
      duration: DURATION.standard,
      stagger: STAGGER.default,
      ease: EASE.entrance,
      scrollTrigger: {
        trigger: container.querySelector('.additional-grid'),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  const caterEaseTags = [
    'Next.js',
    'Supabase',
    'PostgreSQL',
    'Vercel',
    'MSG91',
    'Row Level Security',
  ];

  const tradingTags = [
    'Python',
    'LSTM',
    'pandas-ta',
    'Yahoo Finance API',
    'vectorbt',
    'NumPy',
    'Matplotlib',
  ];

  return (
    <section ref={containerRef} id="work" className="section-padding">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-label text-primary block mb-3">SELECTED WORK</span>
        <h2 className="text-section-title text-text-primary">Things I've Shipped</h2>
      </div>

      {/* ========== PROJECT 1 — CaterEase ========== */}
      <div className="project-1 card mb-10 !p-0 overflow-hidden" data-cursor="project">
        <div className="relative">
          {/* Project number watermark */}
          <span className="absolute top-6 right-8 font-mono text-text-tertiary text-[4rem] leading-none font-bold opacity-50 select-none">
            01
          </span>

          {/* Desktop: side by side. Mobile: stacked */}
          <div className="flex flex-col lg:flex-row">
            {/* Text content */}
            <div className="proj1-text proj1-mobile-anim lg:w-1/2 p-8 lg:p-12 will-change-transform">
              {/* Badge */}
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider mb-6"
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22C55E',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                }}
              >
                LIVE CLIENT PROJECT
              </span>

              <h3 className="font-display text-2xl lg:text-3xl font-semibold text-text-primary mb-8">
                Catering Operations Dashboard
              </h3>

              {/* The Problem */}
              <div className="mb-6">
                <span className="text-label text-text-tertiary block mb-2">THE PROBLEM</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  A large Mumbai-based catering business had no central system to track payments,
                  stock levels, and staff across operations. Everything lived in spreadsheets and
                  memory.
                </p>
              </div>

              {/* The Build */}
              <div className="mb-6">
                <span className="text-label text-text-tertiary block mb-2">THE BUILD</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  A full-stack management dashboard built on Next.js and Supabase. Real-time
                  inventory tracking, payment management, staff oversight, event scheduling, and
                  role-based access for warehouse vs owner views. Deployed to production and
                  actively used by a real client.
                </p>
              </div>

              {/* The Outcome */}
              <div className="mb-8">
                <span className="text-label text-text-tertiary block mb-2">THE OUTCOME</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Complete operational visibility in a single dashboard. The client now manages
                  everything from one screen — payments, stock, staff, and events — with no
                  manual tracking.
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {caterEaseTags.map((tag) => (
                  <SkillTag key={tag} label={tag} />
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="proj1-mockup proj1-mobile-anim lg:w-1/2 p-6 lg:p-10 flex items-center will-change-transform">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>

      {/* ========== PROJECT 2 — Trading Bot ========== */}
      <div className="project-2 card mb-16 !p-0 overflow-hidden" data-cursor="project">
        <div className="relative">
          {/* Project number watermark */}
          <span className="absolute top-6 right-8 font-mono text-text-tertiary text-[4rem] leading-none font-bold opacity-50 select-none">
            02
          </span>

          {/* Desktop: chart left, text right. Mobile: stacked */}
          <div className="flex flex-col lg:flex-row">
            {/* Chart (appears first on mobile, left on desktop) */}
            <div className="proj2-chart proj2-mobile-anim lg:w-1/2 p-6 lg:p-10 flex items-center will-change-transform order-1 lg:order-1">
              <TradingChart />
            </div>

            {/* Text content */}
            <div className="proj2-text proj2-mobile-anim lg:w-1/2 p-8 lg:p-12 will-change-transform order-2 lg:order-2">
              {/* Badge */}
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider mb-6"
                style={{
                  backgroundColor: 'rgba(123, 94, 167, 0.1)',
                  color: '#9B7FD4',
                  border: '1px solid rgba(123, 94, 167, 0.3)',
                }}
              >
                ALGORITHMIC SYSTEMS EXPERIMENT
              </span>

              <h3 className="font-display text-2xl lg:text-3xl font-semibold text-text-primary mb-8">
                Algorithmic Trading System
              </h3>

              {/* The Experiment */}
              <div className="mb-6">
                <span className="text-label text-text-tertiary block mb-2">THE EXPERIMENT</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  A personal deep-dive into quantitative finance. Built an end-to-end automated
                  pipeline that ingests Indian equity market data, applies signal detection logic,
                  backtests across 200+ trades, and outputs performance metrics including Sharpe
                  ratio analysis.
                </p>
              </div>

              {/* The Build */}
              <div className="mb-6">
                <span className="text-label text-text-tertiary block mb-2">THE BUILD</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  An LSTM-based prediction system using Yahoo Finance data and pandas-ta for
                  technical indicators. Ensemble learning for signal confidence, market regime
                  detection, and a risk management layer — all engineered from scratch to
                  understand how production quant systems actually work.
                </p>
              </div>

              {/* The Insight */}
              <div className="mb-8">
                <span className="text-label text-text-tertiary block mb-2">THE INSIGHT</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Statistical validation matters more than strategy elegance. The system revealed
                  that without 200+ trade sample sizes, performance metrics are meaningless noise.
                  Built to learn. Documented to prove it.
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {tradingTags.map((tag) => (
                  <SkillTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ADDITIONAL PROJECTS ========== */}
      <div className="additional-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {additionalProjects.map((project) => (
          <div key={project.title} className="additional-card will-change-transform">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
});

Work.displayName = 'Work';

export default Work;
