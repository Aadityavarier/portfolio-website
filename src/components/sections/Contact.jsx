import React from 'react';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0, y = 50) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const Contact = () => {
  const [ref, inView] = useInView(0.3);

  const links = [
    { label: 'GitHub', url: 'https://github.com/aadityavarier' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/aaditya-varier' },
    { label: 'Email', url: 'mailto:aadityav1703@gmail.com' }
  ];

  const githubIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );

  const linkedinIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );

  const mailIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  return (
    <section id="contact" className="section relative" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(10, 10, 15, 0.60)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-1 w-full h-full flex flex-col justify-center items-center text-center">
        
        {/* Main content */}
        <div className="max-w-4xl w-full px-4 mb-20">
          <p
            className="font-mono text-[#7B5EA7] mb-6 tracking-[0.1em] uppercase text-sm"
            style={animStyle(inView, 0, 30)}
          >
            LET'S WORK TOGETHER
          </p>
          
          <h2
            className="font-display font-bold text-text-primary mb-8 leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', ...animStyle(inView, 0.15, 60) }}
          >
            Got something<br/>that needs building?
          </h2>
          
          <p 
            className="font-body font-light text-[#8B8BA7] mb-12"
            style={{ fontSize: '1.1rem', ...animStyle(inView, 0.3, 40) }}
          >
            Reach out. Tell me what you need. I'll tell you how I'd build it.
          </p>
          
          {/* Links */}
          <div 
            className="flex flex-wrap justify-center gap-8"
            style={animStyle(inView, 0.45, 30)}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link font-mono text-[#8B8BA7] hover:text-[#F8F8FF] transition-colors duration-300"
                style={{ fontSize: '0.95rem' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Footer bar */}
      <div 
        className="absolute bottom-0 left-0 w-full z-10 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{
          borderTop: '1px solid #1E1E2E',
          padding: '20px clamp(24px, 8vw, 120px)',
          background: 'rgba(10,10,15,0.95)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 1s ease 0.6s'
        }}
      >
        <div className="text-center md:text-left flex flex-col gap-1">
          <span className="font-display font-semibold text-[#F8F8FF]" style={{ fontSize: '0.9rem' }}>
            Aaditya Varier
          </span>
          <span className="font-mono text-[#4A4A6A]" style={{ fontSize: '0.65rem' }}>
            © 2026 — All rights reserved
          </span>
        </div>

        <div className="hidden md:flex gap-4">
          {[
            { icon: githubIcon, url: links[0].url },
            { icon: linkedinIcon, url: links[1].url },
            { icon: mailIcon, url: links[2].url }
          ].map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid #1E1E2E',
                color: '#8B8BA7',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#7B5EA7';
                e.currentTarget.style.background = 'rgba(123,94,167,0.1)';
                e.currentTarget.style.color = '#C084FC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E1E2E';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#8B8BA7';
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>

        <div className="text-center md:text-right font-mono text-[#4A4A6A]" style={{ fontSize: '0.65rem' }}>
          Designed & Built by Aaditya Varier
        </div>
      </div>
    </section>
  );
};

export default Contact;
