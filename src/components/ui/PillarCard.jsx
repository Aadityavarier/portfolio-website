import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SkillTag from './SkillTag';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const PillarCard = React.memo(({ icon, title, description, tags, approachBullets }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /* ESC key handler */
  useEffect(() => {
    if (!isExpanded) return;
    const handle = (e) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isExpanded]);

  /* Body scroll lock */
  useEffect(() => {
    if (isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const touch = isTouchDevice();
  const mobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <motion.div
        className="card group"
        onClick={() => setIsExpanded(true)}
        style={{ cursor: 'pointer' }}
        whileHover={
          touch ? undefined : { scale: 1.02, borderColor: '#7B5EA7' }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        data-cursor="interactive"
      >
        <div
          className="mb-6 w-14 h-14 flex items-center justify-center text-primary 
          group-hover:text-accent-glow transition-colors duration-300"
        >
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
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="pillar-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', inset: 0, zIndex: 100 }}
            >
              {/* Dark overlay */}
              <div
                onClick={() => setIsExpanded(false)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              />
              {/* Centered card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 30 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    width: mobile ? '95vw' : 'min(700px, 90vw)',
                    maxHeight: mobile ? '90vh' : '85vh',
                    overflowY: 'auto',
                    background: '#111118',
                    border: '1px solid #7B5EA7',
                    borderRadius: '16px',
                    padding: '2.5rem',
                    boxShadow: '0 0 80px rgba(123,94,167,0.3)',
                    pointerEvents: 'auto',
                    position: 'relative',
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: 'none',
                      border: '1px solid #1E1E2E',
                      color: '#8B8BA7',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ×
                  </button>

                  {/* Icon (larger) */}
                  <div className="mb-6 w-20 h-20 flex items-center justify-center text-primary">
                    {icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-semibold text-text-primary mb-4">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag) => (
                      <SkillTag key={tag} label={tag} />
                    ))}
                  </div>

                  {/* Approach bullets */}
                  {approachBullets && approachBullets.length > 0 && (
                    <div>
                      <span className="text-label text-primary block mb-4">
                        HOW I APPROACH THIS
                      </span>
                      <ul className="space-y-3">
                        {approachBullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="text-text-secondary text-sm leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-primary mt-1.5 text-[6px]">
                              ●
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
});

PillarCard.displayName = 'PillarCard';

export default PillarCard;
