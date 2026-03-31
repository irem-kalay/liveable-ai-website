import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = { Mail, Linkedin, Github };

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(contentRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      },
      once: true
    });
  }, []);

  return (
    <footer ref={sectionRef} className="bg-slate-900 text-white py-16 px-6 lg:px-12 border-t border-slate-800">
      <div className="container max-w-6xl mx-auto">
        <div ref={contentRef} className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold">Liveable AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              {footerConfig.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Product</h4>
            <ul className="space-y-3">
              {footerConfig.productLinks.map((link, i) => (
                <li key={i}><a href={link.href} className="text-slate-400 hover:text-fuchsia-400 transition-colors text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {footerConfig.companyLinks.map((link, i) => (
                <li key={i}><a href={link.href} className="text-slate-400 hover:text-fuchsia-400 transition-colors text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Connect</h4>
            <div className="flex gap-4">
              {footerConfig.socialLinks.map((social, i) => {
                const Icon = iconMap[social.icon];
                return (
                  <a key={i} href={social.href} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-fuchsia-600 hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">{footerConfig.copyright}</p>
          <div className="flex gap-6">
            {footerConfig.legalLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}