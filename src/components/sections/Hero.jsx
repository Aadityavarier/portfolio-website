import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../utils/animationConfig';

const Hero = React.memo(() => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [showEyebrow, setShowEyebrow] = useState(false);
  const [showName1, setShowName1] = useState(false);
  const [showName2, setShowName2] = useState(false);
  const [showSubline, setShowSubline] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShowEyebrow(true);
      setShowName1(true);
      setShowName2(true);
      setShowSubline(true);
      setShowMeta(true);
      return;
    }

    const t1 = setTimeout(() => setShowEyebrow(true), 0);
    const t2 = setTimeout(() => setShowName1(true), 300);
    const t3 = setTimeout(() => setShowName2(true), 500);
    const t4 = setTimeout(() => setShowSubline(true), 800);
    const t5 = setTimeout(() => setShowMeta(true), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowVideo(false);
      } else {
        setShowVideo(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo || prefersReducedMotion()) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      // Wait for video metadata to be loaded so duration is available
      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showVideo]);

  return (
    <section
      ref={sectionRef}
      className="hero-mesh relative min-h-[100vh] flex flex-col justify-center section-padding pt-[20vh] md:pt-0"
    >
      {showVideo && (
        <video
          ref={videoRef}
          src="/hero-bg.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
            opacity: 0.18,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Eyebrow */}
      <div 
        className="flex items-center gap-2.5 mb-8"
        style={{
          opacity: showEyebrow ? 1 : 0,
          transform: showEyebrow ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease'
        }}
      >
        <span className="relative flex h-[6px] w-[6px]">
          <span className="pulse-green absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-green" />
        </span>
        <span className="text-label text-primary">AVAILABLE FOR PROJECTS</span>
      </div>

      {/* Name */}
      <h1 className="mb-6">
        <span 
          className="block text-hero text-text-primary will-change-transform"
          style={{
            opacity: showName1 ? 1 : 0,
            transform: showName1 ? 'translateX(0)' : 'translateX(-60px)',
            transition: 'opacity 1s ease, transform 1s ease'
          }}
        >
          Aaditya
        </span>
        <span 
          className="block text-hero text-text-primary will-change-transform"
          style={{
            opacity: showName2 ? 1 : 0,
            transform: showName2 ? 'translateX(0)' : 'translateX(-60px)',
            transition: 'opacity 1s ease, transform 1s ease'
          }}
        >
          Varier
        </span>
      </h1>

      {/* Subline */}
      <p 
        className="font-body font-light text-text-secondary will-change-transform"
        style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          opacity: showSubline ? 1 : 0,
          transform: showSubline ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        I build products that do the work.
      </p>

      {/* Metadata */}
      <p 
        className="text-metadata text-text-tertiary mt-8"
        style={{
          opacity: showMeta ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}
      >
        Third Year · AI & Data Science · Mumbai University · Google Gemini Campus Ambassador
      </p>

      {/* Scroll Indicator */}
      <div 
        style={{
          opacity: showMeta ? 1 : 0,
          transition: 'opacity 0.6s ease',
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10
        }}
      >
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
