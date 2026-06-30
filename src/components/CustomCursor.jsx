import React, { useEffect, useRef, useState } from 'react';
import useCursor from '../hooks/useCursor';

const CustomCursor = () => {
  const { isTouch, hoverState, outerPos, innerPos } = useCursor();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    setMounted(true);
  }, [isTouch]);

  useEffect(() => {
    if (isTouch || !mounted) return;

    let animId;

    const render = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerPos.current.x}px, ${innerPos.current.y}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isTouch, mounted, outerPos, innerPos]);

  if (isTouch || !mounted) return null;

  const isInteractive = hoverState === 'interactive';
  const isProject = hoverState === 'project';
  const isExpandable = hoverState === 'expandable';
  const isEnlarged = isInteractive || isProject || isExpandable;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200"
        style={{
          width: isEnlarged ? 40 : 32,
          height: isEnlarged ? 40 : 32,
          border: `1.5px solid rgba(155, 127, 212, ${isEnlarged ? 0.8 : 0.6})`,
          backgroundColor:
            isEnlarged ? 'rgba(123, 94, 167, 0.1)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isProject && (
          <span
            className="font-mono text-accent-glow"
            style={{ fontSize: '8px', letterSpacing: '0.05em' }}
          >
            VIEW
          </span>
        )}
        {isExpandable && (
          <span
            className="font-mono text-[#C084FC]"
            style={{ fontSize: '10px' }}
          >
            +
          </span>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: '#C084FC',
        }}
      />
    </>
  );
};

export default CustomCursor;
