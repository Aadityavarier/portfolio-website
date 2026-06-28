import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { EASE, DURATION, STAGGER, OFFSET, isMobile } from '../../utils/animationConfig';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Aadityavarier',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aaditya-varier-91486b352/',
  },
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/u/0/?fs=1&to=aadityav1703@gmail.com&tf=cm',
  },
];

const Contact = React.memo(() => {
  const containerRef = useScrollAnimation((container) => {
    const mobile = isMobile();
    const offset = mobile ? OFFSET.small : OFFSET.standard;
    const elements = container.querySelectorAll('.contact-anim');

    /* Set initial states immediately */
    gsap.set(elements, { opacity: 0, y: offset });

    /* Elements fade up with stagger */
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: DURATION.standard,
      stagger: STAGGER.default,
      ease: EASE.entrance,
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen flex flex-col justify-center section-padding"
    >
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <span className="contact-anim text-label text-primary block mb-6">
          LET'S WORK TOGETHER
        </span>

        {/* Headline */}
        <h2
          className="contact-anim text-text-primary font-display font-bold mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
        >
          Got something
          <br />
          that needs building?
        </h2>

        {/* Subtext */}
        <p className="contact-anim text-text-secondary font-light mb-12" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}>
          Reach out. Tell me what you need. I'll tell you how I'd build it.
        </p>

        {/* Links */}
        <div className="contact-anim flex flex-col sm:flex-row gap-6 sm:gap-10 mb-20">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link font-mono text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
              data-cursor="interactive"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="w-full h-[1px] bg-border mb-6" />
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <span className="text-metadata text-text-tertiary">
            Aaditya Varier © 2026
          </span>
          <span className="text-metadata text-text-tertiary">
            Designed & Built by Aaditya Varier
          </span>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
