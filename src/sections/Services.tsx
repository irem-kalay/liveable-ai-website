import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!servicesConfig.title || servicesConfig.services.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title slide in
        tl.fromTo(
          titleRef.current,
          { y: 40, opacity: 0, letterSpacing: '10px' },
          {
            y: 0,
            opacity: 1,
            letterSpacing: '0px',
            duration: 0.8,
            ease: 'expo.out',
          }
        );

        // Subtitle blur
        tl.fromTo(
          subtitleRef.current,
          { filter: 'blur(10px)', opacity: 0 },
          { filter: 'blur(0)', opacity: 1, duration: 0.6, ease: 'power2.out',
          },
          '-=0.4'
        );

        // Service items stagger
        itemsRef.current.forEach((item, i) => {
          if (item) {
            const line = item.querySelector('.service-line');
            const number = item.querySelector('.service-number');

            tl.fromTo(
              line,
              { width: 0 },
              { width: '100%', duration: 1, ease: 'expo.inOut' },
              `-=${0.8 - i * 0.2}`
            );

            tl.fromTo(
              number,
              { scale: 0.5, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
              `-=0.7`
            );
          }
        });
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const section = sectionRef.current;
    if (!section || !imageRef.current) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };

    gsap.to(imageRef.current, {
      x: x - 120,
      y: y - 160,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  const handleItemEnter = (index: number) => {
    setActiveIndex(index);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'expo.out',
      });
    }
  };

  const handleItemLeave = () => {
    setActiveIndex(null);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const services = servicesConfig.services;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating image preview */}
      <div
        ref={imageRef}
        className="fixed pointer-events-none z-50 w-[240px] h-[320px] opacity-0 rounded-xl overflow-hidden shadow-2xl"
        style={{
          willChange: 'transform, opacity',
        }}
      >
        {activeIndex !== null && (
          <img
            src={services[activeIndex].image}
            alt={services[activeIndex].title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2
            ref={titleRef}
            className="text-h2 lg:text-h1 text-slate-900 font-semibold mb-4"
          >
            {servicesConfig.title}
          </h2>
          <p
            ref={subtitleRef}
            className="text-body text-slate-500 max-w-xl"
          >
            {servicesConfig.subtitle}
          </p>
        </div>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative"
              onMouseEnter={() => handleItemEnter(index)}
              onMouseLeave={handleItemLeave}
            >
              {/* Top border line */}
              <div
                className="service-line h-px bg-slate-200 group-hover:bg-fuchsia-500 transition-colors duration-300"
                style={{ willChange: 'width' }}
              />

              {/* Content */}
              <div className="py-6 lg:py-8 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-6 lg:gap-12">
                  {/* Number */}
                  <span
                    className="service-number text-body lg:text-h5 text-slate-300 font-light group-hover:text-fuchsia-500 group-hover:scale-110 transition-all duration-300"
                    style={{ willChange: 'transform, color' }}
                  >
                    [{service.id}]
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-h4 lg:text-h3 text-slate-900 font-semibold transition-all duration-400 ${
                      activeIndex !== null && activeIndex !== index
                        ? 'opacity-30'
                        : 'opacity-100'
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className={`hidden md:block text-sm text-slate-500 max-w-xs text-right transition-opacity duration-300 ${
                    activeIndex !== null && activeIndex !== index
                      ? 'opacity-30'
                      : 'opacity-100'
                  }`}
                >
                  {service.description}
                </p>
              </div>

              {/* Bottom border for last item */}
              {index === services.length - 1 && (
                <div className="service-line h-px bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}