import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillTag from '../ui/SkillTag';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { EASE, DURATION, STAGGER } from '../../utils/animationConfig';

gsap.registerPlugin(ScrollTrigger);

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const categories = [
  {
    label: 'AI & DATA SCIENCE',
    skills: ['Python', 'SQL', 'TensorFlow', 'Keras', 'pandas', 'NumPy', 'Matplotlib', 'LSTM', 'Quantitative Modeling', 'Agentic AI Frameworks', 'Prompt Engineering']
  },
  {
    label: 'WEB DEVELOPMENT', 
    skills: ['JavaScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS', 'REST APIs', 'Supabase', 'PostgreSQL', 'Vercel']
  },
  {
    label: 'TOOLS & ECOSYSTEM',
    skills: ['Git', 'GitHub', 'n8n', 'WhatsApp Cloud API', 'GSAP', 'Figma', 'Google Gemini API', 'MSG91']
  }
];

const Stack = React.memo(() => {
  const containerRef = useScrollAnimation((container) => {
    categories.forEach((_, i) => {
      const group = container.querySelectorAll('.stack-group')[i];
      if (!group) return;

      const label = group.querySelector('.stack-label');
      const pills = group.querySelectorAll('.skill-pill');

      /* Set initial states immediately */
      gsap.set(label, { opacity: 0, y: 20 });
      gsap.set(pills, { opacity: 0, scale: 0.8 });

      /* Category label fades in */
      gsap.to(label, {
        opacity: 1,
        y: 0,
        duration: DURATION.minor,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* Skill pills scale in one by one */
      gsap.to(pills, {
        opacity: 1,
        scale: 1,
        duration: DURATION.micro,
        stagger: 0.05,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: group,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    });
  });

  return (
    <section ref={containerRef} id="stack" className="section-padding">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-label text-primary block mb-3">TOOLS OF THE TRADE</span>
        <h2 className="text-section-title text-text-primary">The Stack</h2>
      </div>

      {/* Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#4A4A6A',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>{cat.label}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {cat.skills.map((skill, j) => (
                <motion.span
                  key={j}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                  }}
                  whileHover={{ scale: 1.08, borderColor: '#7B5EA7' }}
                  style={{
                    border: '1px solid #1E1E2E',
                    borderRadius: '9999px',
                    padding: '7px 18px',
                    background: '#111118',
                    color: '#8B8BA7',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.75rem',
                    display: 'inline-block',
                    cursor: 'default',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

Stack.displayName = 'Stack';

export default Stack;
