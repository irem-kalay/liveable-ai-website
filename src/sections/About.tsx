import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Award } from 'lucide-react';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const techPartnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Top block reveal
    ScrollTrigger.create({
      trigger: topBlockRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(topBlockRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'expo.out' }
        );
      },
      once: true
    });

    // Team stagger
    ScrollTrigger.create({
      trigger: teamRefs.current[0],
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(teamRefs.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }
        );
      },
      once: true
    });

    // Tech & Partners block
    ScrollTrigger.create({
      trigger: techPartnerRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(techPartnerRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
        );
      },
      once: true
    });

  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 lg:px-12 bg-slate-50 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">{aboutConfig.title}</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{aboutConfig.description}</p>
        </div>

        {/* Mission Block */}
        <div ref={topBlockRef} className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-3xl blur-3xl opacity-20" />
            <img src={aboutConfig.image} alt="Urban Tech" className="relative rounded-3xl shadow-2xl w-full h-auto object-cover aspect-[4/3]" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">{aboutConfig.mission}</p>
            <div className="space-y-6">
              {aboutConfig.goals.map((goal, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {goal.icon === 'Target' ? <Target className="w-6 h-6 text-fuchsia-600" /> : <Award className="w-6 h-6 text-fuchsia-600" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{goal.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{goal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Block */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10 text-center text-slate-900">Meet Team BIM</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutConfig.team.map((member, index) => (
              <div key={index} ref={el => { teamRefs.current[index] = el; }} className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-xl transition-all border border-slate-100 text-center group">
                <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-4 border-fuchsia-50 group-hover:border-fuchsia-200 transition-colors">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                <p className="text-xs font-semibold text-fuchsia-600 mb-4 uppercase tracking-wider">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech & Partners Block */}
        <div ref={techPartnerRef} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-soft border border-slate-100">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Technology</h3>
              <ul className="space-y-4">
                {aboutConfig.technology.map((tech, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Partners</h3>
              <ul className="space-y-4">
                {aboutConfig.partners.map((partner, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{partner}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}