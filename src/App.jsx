import React from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/sections/Hero';
import WhatIBuild from './components/sections/WhatIBuild';
import Work from './components/sections/Work';
import Stack from './components/sections/Stack';
import Presence from './components/sections/Presence';
import Currently from './components/sections/Currently';
import Contact from './components/sections/Contact';

const App = () => {
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <WhatIBuild />
        <Work />
        <Stack />
        <Presence />
        <Currently />
        <Contact />
      </main>
    </>
  );
};

export default App;
