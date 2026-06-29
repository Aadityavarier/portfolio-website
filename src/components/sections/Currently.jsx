import React from 'react';
import { useInView } from '../../hooks/useInView';

const animStyle = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateX(0)' : 'translateX(-50px)',
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const items = [
  {
    status: 'active',
    title: 'Agentic AI Systems',
    description: 'Building autonomous AI agents that chain tools, make decisions, and complete multi-step tasks without human input.',
  },
  {
    status: 'active',
    title: 'Client Web Projects',
    description: 'Building portfolio and business websites for local businesses — delivered end to end, from design to deployment.',
  },
  {
    status: 'active',
    title: 'Quantitative Finance',
    description: 'Going deeper into quant systems, market microstructure, and algorithmic strategy development for Indian equity markets.',
  },
  {
    status: 'learning',
    title: 'Business Automation Suite',
    description: 'Developing a multi-tenant SaaS product for local businesses using WhatsApp API and n8n workflow automation.',
  }
];

const Currently = () => {
  const [ref, inView] = useInView(0.3);

  return (
    <section id="lab" className="section" ref={ref}>
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'rgba(10, 10, 15, 0.65)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-1 w-full max-w-4xl mx-auto flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-16">
          <p
            className="font-mono text-text-tertiary mb-3 tracking-widest uppercase text-sm"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0s`,
            }}
          >
            RIGHT NOW
          </p>
          <h2
            className="font-display font-bold text-text-primary"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s`,
            }}
          >
            What's In The Lab
          </h2>
        </div>

        {/* List */}
        <div className="flex flex-col">
          {items.map((item, idx) => (
            <div 
              key={item.title} 
              className="flex items-start gap-4 mb-8"
              style={animStyle(inView, 0.3 + (idx * 0.15))}
            >
              <div className="mt-1.5 flex-shrink-0 relative w-2.5 h-2.5">
                {item.status === 'active' ? (
                  <>
                    <span className="pulse-green absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                  </>
                ) : (
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7B5EA7]" />
                )}
              </div>
              
              <div>
                <h3 className="font-body font-semibold text-[#F8F8FF] text-[1.1rem]">
                  {item.title}
                </h3>
                <p className="font-body font-normal text-[#8B8BA7] text-[0.9rem] mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Currently;
