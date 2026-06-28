import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

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
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center section-padding relative"
    >
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <motion.span
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-label text-primary block mb-6"
        >
          LET'S WORK TOGETHER
        </motion.span>

        {/* Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-text-primary font-display font-bold mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            Got something
            <br />
            <motion.span variants={fadeUp}>that needs building?</motion.span>
          </motion.h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-text-secondary font-light mb-12"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
        >
          Reach out. Tell me what you need. I'll tell you how I'd build it.
        </motion.p>

        {/* Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-20"
        >
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
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        className="mt-auto border-t border-border bg-[rgba(10,10,15,0.8)] px-[clamp(24px,8vw,120px)] py-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-col">
            <span className="font-display font-semibold text-sm text-[#F8F8FF]">
              Aaditya Varier
            </span>
            <span className="font-mono text-xs text-[#4A4A6A]">
              © 2026 — All rights reserved
            </span>
          </div>

          {/* Center - Social Icons (desktop only) */}
          <div className="hidden sm:flex gap-4">
            <a 
              href="https://github.com/Aadityavarier" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B8BA7" className="hover:stroke-accent">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/aaditya-varier-91486b352/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B8BA7" className="hover:stroke-accent">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="4" y="9" width="4" height="12"/>
                <circle cx="6" cy="4" r="2"/>
              </svg>
            </a>
            <a
              href="mailto:aadityav1703@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B8BA7" className="hover:stroke-accent">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
            </a>
          </div>

          {/* Right side */}
          <a 
            href="/" 
            className="font-mono text-xs text-[#4A4A6A] hover:text-accent transition-colors"
          >
            Designed & Built by Aaditya Varier
          </a>
        </div>
      </motion.footer>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
