import React from 'react';

const PresenceCard = React.memo(({ badge, title, items, footer }) => {
  return (
    <div className="card group">
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono 
          tracking-wider bg-[rgba(123,94,167,0.1)] text-accent-glow border border-[rgba(123,94,167,0.2)]">
          {badge}
        </span>
      </div>
      <h4 className="font-display text-lg font-semibold text-text-primary mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5 mb-4">
        {items.map((item, i) => (
          <li key={i} className="text-text-secondary text-sm leading-relaxed flex items-start gap-2">
            <span className="text-primary mt-1.5 text-[6px]">●</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footer && (
        <p className="text-text-tertiary text-xs font-mono italic mt-4 pt-4 border-t border-border">
          {footer}
        </p>
      )}
    </div>
  );
});

PresenceCard.displayName = 'PresenceCard';

export default PresenceCard;
