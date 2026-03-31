import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { blogConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const postsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!blogConfig.title || blogConfig.posts.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        // Title typewriter effect
        if (titleRef.current) {
          const text = titleRef.current.textContent || '';
          titleRef.current.textContent = '';
          titleRef.current.style.opacity = '1';

          text.split('').forEach((char, i) => {
            setTimeout(() => {
              if (titleRef.current) {
                titleRef.current.textContent += char;
              }
            }, i * 60);
          });
        }

        // Description fade
        tl.fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          0.8
        );

        // Posts clip reveal
        postsRef.current.forEach((post, i) => {
          if (post) {
            const image = post.querySelector('.post-image');
            const content = post.querySelector('.post-content');

            tl.fromTo(
              image,
              {
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
              },
              {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 1,
                ease: 'expo.out',
              },
              1 + i * 0.2
            );

            tl.fromTo(
              content,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
              `-=0.6`
            );
          }
        });

        // Button slide in
        tl.fromTo(
          buttonRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.3'
        );
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <h2
              ref={titleRef}
              className="text-h2 lg:text-h1 text-slate-900 font-semibold mb-3 opacity-0"
            >
              {blogConfig.title}
            </h2>
            <p
              ref={descRef}
              className="text-body text-slate-500 max-w-lg"
            >
              {blogConfig.subtitle}
            </p>
          </div>

          <button
            ref={buttonRef}
            className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-fuchsia-600 transition-colors duration-300 mt-6 lg:mt-0 group"
          >
            {blogConfig.allPostsLabel}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {blogConfig.posts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => {
                postsRef.current[index] = el;
              }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="post-image relative aspect-[16/9] overflow-hidden mb-5 rounded-2xl shadow-soft">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category tag */}
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-soft">
                  <span className="text-xs text-slate-700 font-medium">
                    {post.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-fuchsia-500/0 group-hover:bg-fuchsia-500/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Content */}
              <div className="post-content">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {blogConfig.readTimePrefix}{post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-h5 lg:text-h4 text-slate-900 font-semibold mb-2 group-hover:text-fuchsia-600 transition-colors duration-300 relative">
                  {post.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-fuchsia-500 group-hover:w-full transition-all duration-300" />
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-slate-500 group-hover:text-fuchsia-600 transition-colors duration-300">
                  {blogConfig.readMoreLabel}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}