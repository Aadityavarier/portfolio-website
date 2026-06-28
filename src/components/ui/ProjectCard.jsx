import React from 'react';
import SkillTag from './SkillTag';

const badgeStyles = {
  'AI TOOL': {
    bg: 'rgba(123, 94, 167, 0.1)',
    text: '#9B7FD4',
    border: 'rgba(123, 94, 167, 0.3)',
  },
  'FREELANCE': {
    bg: 'rgba(34, 197, 94, 0.1)',
    text: '#22C55E',
    border: 'rgba(34, 197, 94, 0.2)',
  },
  'IN PROGRESS': {
    bg: 'rgba(234, 179, 8, 0.1)',
    text: '#EAB308',
    border: 'rgba(234, 179, 8, 0.2)',
  },
};

const ProjectCard = React.memo(({ title, description, tags, badge }) => {
  const style = badgeStyles[badge] || badgeStyles['AI TOOL'];

  return (
    <div className="card group" data-cursor="project">
      <div className="mb-4">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider"
          style={{
            backgroundColor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
          }}
        >
          {badge}
        </span>
      </div>
      <h4 className="font-display text-lg font-semibold text-text-primary mb-2 
        group-hover:text-accent-glow transition-colors duration-300">
        {title}
      </h4>
      <p className="text-text-secondary text-sm leading-relaxed mb-5">
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

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
