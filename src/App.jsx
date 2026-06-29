import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import WhatIBuild from './components/sections/WhatIBuild';
import HotelManager from './components/sections/HotelManager';
import TradingBot from './components/sections/TradingBot';
import AlsoShipped from './components/sections/AlsoShipped';
import Stack from './components/sections/Stack';
import Presence from './components/sections/Presence';
import Currently from './components/sections/Currently';
import Contact from './components/sections/Contact';
import ScrollDots from './components/ScrollDots';

function App() {
  const [isMobile, setIsMobile] = useState(true); // Default true for safety

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Run once on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full">
      {!isMobile && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="video-bg"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      )}
      
      <Navbar />
      <ScrollDots />

      <main>
        <Hero />
        <WhatIBuild />
        <HotelManager />
        <TradingBot />
        <AlsoShipped />
        <Stack />
        <Presence />
        <Currently />
        <Contact />
      </main>
    </div>
  );
}

export default App;
