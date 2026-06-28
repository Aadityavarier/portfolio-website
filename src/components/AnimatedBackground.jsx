import React from 'react';

const AnimatedBackground = () => (
  <>
    {/* Floating gradient orbs */}
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Orb 1 */}
      <div
        className="bg-orb"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(123,94,167,0.15) 0%, transparent 70%)',
          willChange: 'transform',
          animation: 'orb1 20s ease-in-out infinite alternate',
        }}
      />
      {/* Orb 2 */}
      <div
        className="bg-orb"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(155,127,212,0.1) 0%, transparent 70%)',
          willChange: 'transform',
          animation: 'orb2 25s ease-in-out infinite alternate',
          animationDelay: '-8s',
        }}
      />
      {/* Orb 3 */}
      <div
        className="bg-orb"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)',
          willChange: 'transform',
          animation: 'orb3 18s ease-in-out infinite alternate',
          animationDelay: '-15s',
        }}
      />
    </div>

    {/* Noise texture overlay */}
    <svg
      className="noise-texture"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.03,
        pointerEvents: 'none',
      }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </>
);

export default AnimatedBackground;
