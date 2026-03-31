import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { pricingConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
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
        
        cardsRef.current.forEach((card, i) => {
          if (card) {
            tl.fromTo(card,
              { y: 50, opacity: 0, rotateY: i === 0 ? -30 : i === 2 ? 30 : 0 },
              { y: 0, opacity: 1, rotateY: 0, duration: 0.8, ease: 'expo.out' },
              `-=${0.6}`
            );
          }
        });
      },
      once: true
    });
  }, []);

  const handleHover = (i: number, isEnter: boolean) => {
    const card = cardsRef.current[i];
    if (card) {
      gsap.to(card, {
        y: isEnter ? -10 : 0,
        boxShadow: isEnter ? '0 20px 40px rgba(192,38,211,0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
        duration: 0.3
      });
    }
  };

  return (
    <section ref={sectionRef} id="pricing" className="py-24 px-6 lg:px-12 bg-white overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            {pricingConfig.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {pricingConfig.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingConfig.plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={el => { cardsRef.current[index] = el; }}
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
              className={`relative bg-white rounded-3xl p-8 transition-all border-2 flex flex-col ${
                plan.featured ? 'border-fuchsia-500 shadow-[0_10px_40px_rgba(192,38,211,0.1)]' : 'border-slate-100 shadow-soft'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                {plan.unit && <span className="text-slate-500 ml-1">/ {plan.unit}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-fuchsia-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-fuchsia-600" />
                    </div>
                    <span className="text-sm text-slate-600 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                plan.cta === 'Coming Soon' ? 'opacity-50 bg-slate-100 text-slate-400 cursor-not-allowed' :
                plan.featured ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700 shadow-md' : 
                'bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}