import React from 'react';

const SkillTag = React.memo(({ label, className = '' }) => {
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-mono tracking-wider 
        bg-surface border border-border text-text-secondary
        hover:border-primary hover:text-text-primary transition-all duration-300 ${className}`}
    >
      {label}
    </span>
  );
});

SkillTag.displayName = 'SkillTag';

export default SkillTag;
