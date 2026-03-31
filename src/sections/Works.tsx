import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { worksConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!worksConfig.title || worksConfig.projects.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title letter animation
        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll('.char');
          tl.fromTo(
            chars,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'elastic.out(1, 0.5)',
            }
          );
        }

        // Subtitle
        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );

        // Cards 3D flip
        cardsRef.current.forEach((card, i) => {
          if (card) {
            tl.fromTo(
              card,
              { rotateY: i % 2 === 0 ? -180 : 180, opacity: 0 },
              {
                rotateY: 0,
                opacity: 1,
                duration: 1,
                ease: 'expo.out',
              },
              `-=${0.85 - i * 0.15}`
            );
          }
        });
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    // Scroll depth effect
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            const depth = -50 + self.progress * 100;
            gsap.set(card, {
              z: depth * (i % 2 === 0 ? 1 : -1) * 0.5,
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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 10,
      rotateY: x * 16,
      duration: 0.1,
      ease: 'none',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'expo.out',
    });
    setHoveredIndex(null);
  };

  const titleChars = worksConfig.title.split('');

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2
          ref={titleRef}
          className="text-h2 lg:text-h1 text-slate-900 font-semibold mb-4"
        >
          {titleChars.map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </h2>
        <p
          ref={subtitleRef}
          className="text-body text-slate-500 max-w-xl"
        >
          {worksConfig.subtitle}
        </p>
      </div>

      {/* Projects Grid - Scattered mosaic */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {worksConfig.projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative group cursor-pointer preserve-3d ${
                index === 0 ? 'md:col-span-1 md:row-span-1' : ''
              } ${index % 2 === 0 ? 'md:-translate-y-6' : 'md:translate-y-6'}`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transform:
                  hoveredIndex !== null && hoveredIndex !== index
                    ? `translateX(${(index - hoveredIndex) * 10}px)`
                    : 'translateX(0)',
                transition:
                  hoveredIndex !== null
                    ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Card content */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft-lg bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <p className="text-xs text-fuchsia-400 mb-1 group-hover:text-fuchsia-300 transition-colors duration-300 font-medium">
                    {project.category}
                  </p>
                  <h3 className="text-h5 lg:text-h4 text-white font-semibold group-hover:-translate-y-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-5 right-5">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-fuchsia-500 group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-24 h-24 bg-fuchsia-500/5 -translate-x-1/2 rounded-full" />
      <div className="absolute bottom-20 right-0 w-32 h-32 bg-fuchsia-500/5 translate-x-1/3 rounded-full" />
    </section>
  );
}