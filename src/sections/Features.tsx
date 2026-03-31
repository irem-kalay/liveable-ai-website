import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Shield, Volume2, Leaf, MapPin, TrendingUp } from 'lucide-react';
import { featuresConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = { Brain, Shield, Volume2, Leaf, MapPin, TrendingUp };

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();
        
        cardsRef.current.forEach((card) => {
          if (card) {
            tl.fromTo(card,
              { y: 50, opacity: 0, rotateX: -10 },
              { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'expo.out' },
              `-=${0.65}`
            );
          }
        });
      },
      once: true
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateX: -y * 15, rotateY: x * 15, duration: 0.1, ease: 'none' });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <section ref={sectionRef} id="features" className="py-24 px-6 lg:px-12 bg-slate-50 overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            {featuresConfig.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {featuresConfig.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                className="group relative bg-white p-8 rounded-[2rem] shadow-soft hover:shadow-xl transition-shadow border border-slate-100 preserve-3d"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-100 to-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ transform: 'translateZ(30px)' }}>
                  <Icon className="w-7 h-7 text-fuchsia-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ transform: 'translateZ(20px)' }}>{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{feature.description}</p>
                
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}