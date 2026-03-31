import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      tl.fromTo(words, 
        { y: 50, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)' }
      );
    }

    tl.fromTo(
      textContainerRef.current?.querySelectorAll('p, button'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(
      imageContainerRef.current,
      { scale: 0.9, opacity: 0, x: 50 },
      { scale: 1, opacity: 1, x: 0, duration: 1, ease: 'expo.out' },
      '-=0.8'
    );

    // Parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(imageContainerRef.current, { y: self.progress * 100 });
        gsap.set(textContainerRef.current, { y: self.progress * -50, opacity: 1 - self.progress });
      }
    });

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen pt-32 pb-20 px-6 lg:px-12 flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/40 to-slate-900/90 z-10 mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fuchsia-600/20 to-transparent blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textContainerRef} className="preserve-3d">
            <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight" style={{ perspective: '1000px' }}>
              {heroConfig.title.split(' ').map((word, i) => (
                <span key={i} className="word inline-block mr-4">{word}</span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
              {heroConfig.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('#pricing')} className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group">
                {heroConfig.primaryButtonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('#how-it-works')} className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                {heroConfig.secondaryButtonText}
              </button>
            </div>
          </div>
          
          <div ref={imageContainerRef} className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-3xl blur-[80px] opacity-30 animate-pulse" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5]">
              <img src={heroConfig.backgroundImage} alt="Modern city" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}