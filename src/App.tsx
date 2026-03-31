import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { ParticleField } from './components/ParticleField';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Features } from './sections/Features';
import { HowItWorks } from './sections/HowItWorks';
import { About } from './sections/About';
import { Pricing } from './sections/Pricing';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { siteConfig } from './config';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <div className="noise-overlay" />
      <CustomCursor />
      <ParticleField />
      <Navigation />

      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <About />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;