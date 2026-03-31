import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { faqConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!faqConfig.title || faqConfig.faqs.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title scale in
        tl.fromTo(
          titleRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: 'expo.out' }
        );

        // FAQ items stagger from alternating sides
        itemsRef.current.forEach((item, i) => {
          if (item) {
            const fromX = i % 2 === 0 ? -40 : 40;
            tl.fromTo(
              item,
              { x: fromX, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
              `-=0.5`
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="text-h2 lg:text-h1 text-slate-900 font-semibold text-center mb-12"
        >
          {faqConfig.title}
        </h2>

        {/* FAQ items */}
        <div className="space-y-0">
          {faqConfig.faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`relative ${
                index % 2 === 0 ? 'lg:-translate-x-4' : 'lg:translate-x-4'
              }`}
            >
              {/* Question */}
              <button
                className={`w-full py-4 lg:py-6 flex items-center justify-between text-left border-b transition-all duration-300 ${
                  openIndex === index
                    ? 'border-fuchsia-500'
                    : 'border-slate-200 hover:border-slate-300'
                } ${
                  openIndex !== null && openIndex !== index
                    ? 'opacity-60'
                    : 'opacity-100'
                }`}
                onClick={() => toggleItem(index)}
              >
                <h3
                  className={`text-body lg:text-h5 text-slate-900 pr-6 transition-all duration-200 ${
                    openIndex === index ? 'font-semibold' : 'font-medium'
                  }`}
                >
                  {faq.question}
                </h3>

                {/* Plus icon */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                    openIndex === index
                      ? 'bg-fuchsia-500 border-fuchsia-500 rotate-45 scale-110'
                      : 'border-slate-300 hover:border-fuchsia-500'
                  }`}
                >
                  <Plus className={`w-4 h-4 ${openIndex === index ? 'text-white' : 'text-slate-500'}`} />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  openIndex === index
                    ? 'max-h-[400px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-4 lg:py-5">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}