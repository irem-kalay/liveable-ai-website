import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Sliders, BarChart3, Home } from 'lucide-react';
import { howItWorksConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = { Search, Sliders, BarChart3, Home };

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        const tl = gsap.timeline();

        tl.fromTo(lineRef.current, 
          { width: 0 }, 
          { width: '100%', duration: 1.5, ease: 'power2.inOut' }
        );

        stepsRef.current.forEach((step, i) => {
          if (step) {
            const iconBox = step.querySelector('.icon-box');
            const textContent = step.querySelector('.text-content');

            tl.fromTo(iconBox, 
              { scale: 0, rotate: -45 }, 
              { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.5)' },
              `-=${1.2 - i * 0.2}`
            );
            
            tl.fromTo(textContent,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 },
              `-=${0.3}`
            );
          }
        });
      },
      once: true
    });
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 px-6 lg:px-12 bg-white overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            {howItWorksConfig.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {howItWorksConfig.description}
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-slate-100 rounded-full">
            <div ref={lineRef} className="h-full bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full" style={{ width: 0 }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {howItWorksConfig.steps.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <div key={index} ref={el => { stepsRef.current[index] = el; }} className="relative text-center group">
                  <div className="icon-box relative w-20 h-20 mx-auto bg-white border-2 border-fuchsia-100 rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:border-fuchsia-400 group-hover:shadow-fuchsia-200 transition-all duration-300 z-10">
                    <Icon className="w-8 h-8 text-fuchsia-600" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <div className="text-content">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}