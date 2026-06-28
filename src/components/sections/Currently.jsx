import React from 'react';
import { motion } from 'framer-motion';
import StatusDot from '../ui/StatusDot';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const currentItems = [
  {
    variant: 'active',
    title: 'Agentic AI Systems',
    description:
      'Building autonomous AI agents that chain tools, make decisions, and complete multi-step tasks without human input.',
  },
  {
    variant: 'active',
    title: 'Business Automation Suite',
    description:
      'Developing a multi-tenant SaaS product for local businesses using WhatsApp API and n8n workflow automation.',
  },
  {
    variant: 'learning',
    title: 'Japanese Language',
    description:
      'Working toward proficiency for long-term goal of working and settling in Japan.',
  },
  {
    variant: 'learning',
    title: 'Quantitative Finance',
    description:
      'Going deeper into quant systems, market microstructure, and algorithmic strategy development for Indian equity markets.',
  },
];

const Currently = React.memo(() => {
  return (
    <section className="section-padding">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <span className="text-label text-primary block mb-3">RIGHT NOW</span>
        <h2 className="text-section-title text-text-primary">What's In The Lab</h2>
      </motion.div>

      {/* Items */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl space-y-8"
      >
        {currentItems.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeLeft}
            className="flex items-start gap-4"
          >
            <div className="mt-1.5">
              <StatusDot variant={item.variant} />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-text-primary mb-1">
                {item.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

Currently.displayName = 'Currently';

export default Currently;
