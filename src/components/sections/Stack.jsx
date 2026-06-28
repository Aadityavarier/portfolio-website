import React from 'react';
import SkillTag from '../ui/SkillTag';
import { useInView } from '../../hooks/useInView';

const categories = [
  {
    label: 'AI & DATA SCIENCE',
    skills: ['Python', 'SQL', 'TensorFlow', 'Keras', 'pandas', 'NumPy', 'Matplotlib', 'LSTM', 'Quantitative Modeling', 'Agentic AI Frameworks', 'Prompt Engineering']
  },
  {
    label: 'WEB DEVELOPMENT', 
    skills: ['JavaScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'REST APIs', 'Supabase', 'PostgreSQL', 'Vercel']
  },
  {
    label: 'TOOLS & ECOSYSTEM',
    skills: ['Git', 'GitHub', 'n8n', 'WhatsApp Cloud API', 'Figma', 'Google Gemini API', 'MSG91']
  }
];

const Stack = React.memo(() => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} id="stack" className="section-padding">
      {/* Section Header */}
      <div 
        className="mb-16"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <span className="text-label text-primary block mb-3">TOOLS OF THE TRADE</span>
        <h2 className="text-section-title text-text-primary">The Stack</h2>
      </div>

      {/* Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {categories.map((cat, i) => (
          <div key={i}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: '#4A4A6A',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`
            }}>{cat.label}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {cat.skills.map((skill, j) => (
                <span
                  key={j}
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
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'scale(1)' : 'scale(0.8)',
                    transition: `opacity 0.4s ease ${i * 0.15 + j * 0.04}s, transform 0.4s ease ${i * 0.15 + j * 0.04}s, border-color 0.2s ease, transform 0.2s ease`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.08)';
                    e.target.style.borderColor = '#7B5EA7';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.borderColor = '#1E1E2E';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

Stack.displayName = 'Stack';

export default Stack;
