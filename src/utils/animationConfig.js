/* Animation configuration constants */

export const EASE = {
  entrance: 'power3.out',
  transition: 'power2.inOut',
  smooth: 'power2.out',
};

export const DURATION = {
  major: 1,
  standard: 0.8,
  minor: 0.5,
  micro: 0.3,
};

export const STAGGER = {
  default: 0.12,
  fast: 0.08,
  slow: 0.2,
  pill: 0.05,
};

export const OFFSET = {
  standard: 40,
  large: 60,
  small: 20,
};

/* Returns reduced values for mobile */
export const getMobileConfig = () => ({
  offset: {
    standard: 20,
    large: 30,
    small: 10,
  },
  duration: {
    major: 0.7,
    standard: 0.6,
    minor: 0.4,
    micro: 0.2,
  },
});

export const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
