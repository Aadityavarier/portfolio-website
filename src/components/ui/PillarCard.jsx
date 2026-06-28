import React from 'react';
import SkillTag from './SkillTag';

const PillarCard = React.memo(({ icon, title, description, tags }) => {
  return (
    <div className="card group" data-cursor="interactive">
      <div className="mb-6 w-14 h-14 flex items-center justify-center text-primary 
        group-hover:text-accent-glow transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SkillTag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
});

PillarCard.displayName = 'PillarCard';

export default PillarCard;
