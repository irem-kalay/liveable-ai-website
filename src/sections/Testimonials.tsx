import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!testimonialsConfig.title || testimonialsConfig.testimonials.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title letter expand
        tl.fromTo(
          titleRef.current,
          { letterSpacing: '8px', opacity: 0 },
          { letterSpacing: '0px', opacity: 1, duration: 0.8, ease: 'expo.out' }
        );

        // Cards 3D rise
        cardsRef.current.forEach((card, i) => {
          if (card) {
            tl.fromTo(
              card,
              {
                y: 60,
                z: -30,
                rotateX: 10,
                opacity: 0,
              },
              {
                y: 0,
                z: 0,
                rotateX: 0,
                opacity: 1,
                duration: 1,
                ease: 'expo.out',
              },
              `-=${0.8 - i * 0.2}`
            );

            // Avatar pop
            const avatar = card.querySelector('.avatar');
            if (avatar) {
              tl.fromTo(
                avatar,
                { scale: 0 },
                {
                  scale: 1,
                  duration: 0.5,
                  ease: 'elastic.out(1, 0.5)',
                },
                '-=0.7'
              );
            }

            // Quote mark fade
            const quoteMark = card.querySelector('.quote-mark');
            if (quoteMark) {
              tl.fromTo(
                quoteMark,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 0.15, duration: 0.4, ease: 'power2.out' },
                '-=0.4'
              );
            }
          }
        });
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    // Sticky card stacking scroll effect
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 20%',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            const progress = Math.min(1, Math.max(0, self.progress * 3 - i * 0.3));
            const shadow = 10 + progress * 15;
            const scale = 1 + progress * 0.02;

            gsap.set(card, {
              boxShadow: `0 ${shadow}px ${shadow * 2}px rgba(192,38,211,${0.1 + progress * 0.1})`,
              scale: scale,
            });
          }
        });
      },
    });
    triggersRef.current.push(scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="text-h2 lg:text-h1 text-slate-900 font-semibold text-center mb-12"
        >
          {testimonialsConfig.title}
        </h2>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonialsConfig.testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative bg-white backdrop-blur-sm p-6 lg:p-8 group hover:bg-fuchsia-50/50 transition-colors duration-300 preserve-3d rounded-2xl shadow-soft-lg border border-slate-100"
              style={{
                transform: `rotateY(${(index - 1) * 2}deg)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform, box-shadow',
              }}
            >
              {/* Quote mark */}
              <Quote className="quote-mark absolute top-5 right-5 w-8 h-8 text-fuchsia-500 opacity-15" />

              {/* Quote text */}
              <p className="text-body text-slate-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="avatar w-10 h-10 rounded-full overflow-hidden border-2 border-fuchsia-500/30 flex-shrink-0 shadow-soft">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-sm text-slate-900 font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}