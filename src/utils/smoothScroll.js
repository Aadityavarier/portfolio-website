export const smoothScrollTo = (targetId) => {
  const el = document.getElementById(targetId.replace('#', ''));
  if (!el) return;

  const html = document.documentElement;
  
  // Disable scroll-snap temporarily so the browser shows the scroll animation
  html.style.scrollSnapType = 'none';

  // Perform the smooth scroll
  el.scrollIntoView({ behavior: 'smooth' });

  // Re-enable scroll-snap after the scroll animation finishes (roughly 1 second)
  setTimeout(() => {
    html.style.scrollSnapType = 'y mandatory';
  }, 1000);
};
