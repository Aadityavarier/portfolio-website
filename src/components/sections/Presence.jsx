import React from 'react';
import PresenceCard from '../ui/PresenceCard';
import { useInView } from '../../hooks/useInView';

const presenceData = [
  {
    badge: 'Google Student Ambassador 2025–26',
    title: 'Google Gemini Campus Ambassador',
    items: [
      'Organized and executed "Battle of the Bands: AI Music Night" — a live virtual event where participants used Google Lyria to compose original music. Achieved 100% submission rate.',
      'Built end-to-end workflow: Gemini Pro for prompt engineering, Lyria for music generation, Nano Banana for visual assets.',
      'Managed post-event operations: attendee database, automated certificate distribution via Gmail, long-term community WhatsApp group.',
      'Conducted structured campus interviews across 10 qualitative research pillars for Google\'s data collection.',
    ],
    closingLine: 'Three weeks in. One event run. 100% submission rate.',
  },
  {
    badge: 'Rotaract Club Member',
    title: 'Community Service',
    items: [
      'Hosted blood donation campaigns',
      'Conducted self-defense workshops at Rotary Adivasi School',
      'Organized health checkups for old age homes',
      'Distributed free books and study materials to orphanages',
    ],
    footer: 'Engineering systems for people, not just screens.',
    closingLine: 'Because engineering is only meaningful if it serves people.',
  },
  {
    badge: 'SHAIDS · Students Hive of AI & Data Science',
    title: 'Tech & Sports Teams',
    items: [
      'Tech team and sports team member',
      'Volunteered in organizing Hack-Hive hackathon',
      'Supported Technitude tech event',
      'Helped host AI Halloween Heist event',
      'Assisted in Design Thinking and Prompt Engineering workshops',
    ],
    closingLine: 'The best way to learn tech is to put it in front of real people.',
  },
];

const Presence = React.memo(() => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} id="presence" className="section-padding">
      {/* Section Header */}
      <div 
        className="mb-4"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >
        <span className="text-label text-primary block mb-3">BEYOND THE SCREEN</span>
        <h2 className="text-section-title text-text-primary">How I Operate</h2>
      </div>
      <p 
        className="text-text-secondary font-light mb-16" 
        style={{ 
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s'
        }}
      >
        Code is one output. This is the rest.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {presenceData.map((card, i) => (
          <div 
            key={card.title} 
            className="will-change-transform"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`
            }}
          >
            <PresenceCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
});

Presence.displayName = 'Presence';

export default Presence;
