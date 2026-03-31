import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, DollarSign, Clock } from 'lucide-react';
import { problemConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = { AlertTriangle, DollarSign, Clock };

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        const tl = gsap.timeline();

        tl.fromTo(textRef.current?.children || [], 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );

        listRefs.current.forEach((item, i) => {
          if (item) {
            tl.fromTo(item, 
              { x: -30, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' },
              `-=${0.4}`
            );
          }
        });

        tl.fromTo(imageRef.current,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
          { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: 'expo.out' },
          '-=1'
        );
      },
      once: true
    });
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-fuchsia-50/50 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              {problemConfig.title}
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {problemConfig.description}
            </p>
            <div className="space-y-8">
              {problemConfig.problems.map((prob, idx) => {
                const Icon = iconMap[prob.icon];
                return (
                  <div key={idx} ref={el => { listRefs.current[idx] = el; }} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-soft border border-fuchsia-100 group-hover:scale-110 group-hover:border-fuchsia-300 transition-all duration-300">
                      <Icon className="w-6 h-6 text-fuchsia-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{prob.title}</h3>
                      <p className="text-slate-600 leading-snug">{prob.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="relative hidden md:block h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-[2rem] blur-3xl opacity-20"></div>
            <div ref={imageRef} className="relative rounded-[2rem] shadow-2xl overflow-hidden aspect-square">
              <img src={problemConfig.image} alt="Problem" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}