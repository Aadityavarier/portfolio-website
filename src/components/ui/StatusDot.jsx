import React from 'react';

const StatusDot = React.memo(({ variant = 'active' }) => {
  if (variant === 'active') {
    return (
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="pulse-green absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
      </span>
    );
  }

  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
    </span>
  );
});

StatusDot.displayName = 'StatusDot';

export default StatusDot;
