import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { ctaConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(containerRef.current,
          { scale: 0.95, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
        );
      },
      once: true
    });
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="py-24 px-6 lg:px-12 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div ref={containerRef} className="bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-fuchsia-500/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-10 md:p-14 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {ctaConfig.title}
              </h2>
              <p className="text-lg mb-8 text-white/90 leading-relaxed">
                {ctaConfig.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-fuchsia-600 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                  {ctaConfig.primaryButton}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                  {ctaConfig.secondaryButton}
                </button>
              </div>
              <p className="mt-8 text-white/70 text-sm font-medium tracking-wide">
                {ctaConfig.note}
              </p>
            </div>
            
            <div className="hidden md:block relative h-full min-h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-fuchsia-600/50 to-transparent z-10" />
              <img
                src={ctaConfig.image}
                alt="Neighborhood"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}