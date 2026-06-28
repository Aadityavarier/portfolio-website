import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger hook with automatic cleanup.
 * @param {Function} animationFn - receives (container) — define GSAP animations inside
 * @param {Array} deps - dependency array
 */
export const useScrollAnimation = (animationFn, deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const section = containerRef.current;

      // 1. Every section element starts invisible (opacity: 0, translateY: 40px)
      // and animates in when scrolled into view using GSAP ScrollTrigger
      gsap.set(section, { opacity: 0, y: 40 });
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Run section's custom inner animations
      animationFn(containerRef.current);
    }, containerRef);

    // Recalculate trigger positions after all animations are registered
    ScrollTrigger.refresh();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
};

export default useScrollAnimation;
