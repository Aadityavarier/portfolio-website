import React, { useEffect, useState } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

const sections = [
  'hero',
  'what-i-build',
  'hotel-manager',
  'trading-bot',
  'also-shipped',
  'stack',
  'how-i-operate',
  'lab',
  'contact'
];

const ScrollDots = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    smoothScrollTo(id);
  };

  return (
    <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
      {sections.map((id) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            aria-label={`Scroll to ${id}`}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isActive ? '#7B5EA7' : 'rgba(255,255,255,0.25)',
              transform: isActive ? 'scale(1.4)' : 'scale(1)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          />
        );
      })}
    </div>
  );
};

export default ScrollDots;
