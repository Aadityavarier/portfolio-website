import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom cursor hook for desktop only.
 * Tracks mouse position with lerp for outer ring, exact for inner dot.
 */
export const useCursor = () => {
  const [isTouch, setIsTouch] = useState(true);
  const [hoverState, setHoverState] = useState('default'); // 'default' | 'interactive' | 'project'
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    /* Detect touch device */
    const checkTouch = () => {
      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouch(isTouchDevice);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const animate = useCallback(() => {
    outerPos.current.x = lerp(outerPos.current.x, target.current.x, 0.12);
    outerPos.current.y = lerp(outerPos.current.y, target.current.y, 0.12);
    innerPos.current.x = target.current.x;
    innerPos.current.y = target.current.y;
    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHoverState(el.dataset.cursor);
      } else if (e.target.closest('.expandable-card')) {
        setHoverState('expandable');
      } else if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label')
      ) {
        setHoverState('interactive');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch, animate]);

  return { isTouch, hoverState, outerPos, innerPos };
};

export default useCursor;
