import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { prefersReducedMotion } from '../../utils/animationConfig';

const Hero = React.memo(() => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Set initial invisible states via GSAP (not CSS classes)
      gsap.set(sectionRef.current, { opacity: 0, y: 40 });
      gsap.set('.hero-eyebrow', { opacity: 0, y: 20 });
      gsap.set('.hero-name-1', { opacity: 0, x: -60 });
      gsap.set('.hero-name-2', { opacity: 0, x: -60 });
      gsap.set('.hero-subline', { opacity: 0, y: 30 });
      gsap.set('.hero-metadata', { opacity: 0 });
      gsap.set('.hero-scroll', { opacity: 0 });

      // Animating the wrapper itself via ScrollTrigger
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          toggleActions: 'play none none none',
        },
      });

      // Sequenced entry animation on page load for inner content
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to('.hero-name-1', { opacity: 1, x: 0, duration: 1 }, 0.5)
        .to('.hero-name-2', { opacity: 1, x: 0, duration: 1 }, 0.7)
        .to('.hero-subline', { opacity: 1, y: 0, duration: 0.8 }, 1.1)
        .to('.hero-metadata', { opacity: 1, duration: 0.6 }, 1.4)
        .to('.hero-scroll', { opacity: 1, duration: 0.6 }, 1.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-mesh relative min-h-screen flex flex-col justify-center section-padding pt-[20vh] md:pt-0"
    >
      {/* Eyebrow */}
      <motion.div 
        className="hero-anim hero-eyebrow flex items-center gap-2.5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="relative flex h-[6px] w-[6px]">
          <span className="pulse-green absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-green" />
        </span>
        <span className="text-label text-primary">AVAILABLE FOR PROJECTS</span>
      </div>

      {/* Name */}
      <h1 className="mb-6">
        <motion.span 
          className="hero-anim hero-name-1 block text-hero text-text-primary will-change-transform"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          Aaditya
        </motion.span>
        <motion.span 
          className="hero-anim hero-name-2 block text-hero text-text-primary will-change-transform"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          Varier
        </motion.span>
      </h1>

      {/* Subline */}
      <motion.p 
        className="hero-anim hero-subline font-body font-light text-text-secondary will-change-transform"
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        I build products that do the work.
      </p>

      {/* Metadata */}
      <motion.p 
        className="hero-anim hero-metadata text-metadata text-text-tertiary mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Third Year · AI & Data Science · Mumbai University · Google Gemini Campus Ambassador
      </p>

      {/* Scroll Indicator */}
      <motion.div 
        className="hero-anim hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10
      }}>
        <div
          className="w-[1px] h-[60px] pulse-scroll"
          style={{
            background: 'linear-gradient(to bottom, #7B5EA7, transparent)',
          }}
        />
        <span className="font-mono text-text-tertiary" style={{ fontSize: '0.65rem' }}>
          scroll
        </span>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
