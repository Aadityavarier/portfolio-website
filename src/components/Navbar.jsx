import React, { useState, useEffect, useCallback } from 'react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Presence', href: '#presence' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = useCallback(
    (href) => {
      setMenuOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          padding: 'clamp(16px, 3vw, 24px) clamp(24px, 8vw, 120px)',
          backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #1E1E2E' : '1px solid transparent',
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-semibold text-text-primary z-50 relative"
          style={{ fontSize: '1.1rem' }}
          data-cursor="interactive"
        >
          Aaditya Varier
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="nav-link font-body text-text-secondary hover:text-text-primary transition-colors duration-300"
              style={{ fontSize: '0.9rem' }}
              data-cursor="interactive"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-cursor="interactive"
        >
          <span
            className="block w-6 h-[1.5px] bg-text-primary transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(5px) translateX(2px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[1.5px] bg-text-primary transition-all duration-200"
            style={{
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-[1.5px] bg-text-primary transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-5px) translateX(2px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        style={{
          backgroundColor: 'rgba(10, 10, 15, 0.97)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
      >
        <div className="flex flex-col items-center gap-10">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="font-display text-3xl font-semibold text-text-primary hover:text-accent-glow transition-colors duration-300"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.4s ease ${0.1 + i * 0.08}s, transform 0.4s ease ${0.1 + i * 0.08}s`
              }}
              data-cursor="interactive"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
