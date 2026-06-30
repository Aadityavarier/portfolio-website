import React from 'react';

const ExpandIcon = () => (
  <div
    className="card-expand-icon absolute top-5 right-5 w-7 h-7 rounded-full border border-[#1E1E2E] flex items-center justify-center opacity-50 transition-all duration-300 pointer-events-none"
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="#8B8BA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default ExpandIcon;
