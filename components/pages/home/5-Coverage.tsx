'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Users, User, Video, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Coverage: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-24 px-6 bg-black/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-left">
          <h2 
            ref={headerRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            From study planner to startups, <br />
            Patty got you covered.
          </h2>
          <p 
            ref={paragraphRef}
            className="text-lg text-neutral-400 max-w-3xl leading-relaxed"
          >
            Whether you're planning for learning how to build your own AI agents or managing a
            growing startup, Patty adapts to your pace, scale, and ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(350px,auto)]">
          
          {/* Card 1: Learning (Large 4 cols) */}
          <div
             ref={(el) => { if (el) cardsRef.current[0] = el; }}
             className="col-span-1 md:col-span-4 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between group"
          >
             <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                   <GraduationCap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Learning & Skill Development</h3>
                <p className="text-neutral-400 max-w-sm text-base">Dynamic study plans that adapt when you miss a day.</p>
             </div>
             
             {/* Visual: Timeline */}
             <div className="mt-8 relative h-40 mask-linear-fade select-none pointer-events-none">
                <div className="absolute top-0 left-0 w-full space-y-3">
                   <div className="flex gap-4 items-center opacity-40">
                      <div className="w-16 text-right text-xs text-neutral-500 font-mono">Week 1</div>
                      <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                         <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle2 size={10} className="text-green-500"/></div>
                         <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                      </div>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-16 text-right text-xs text-white font-mono">Week 2</div>
                      <div className="flex-1 p-3 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center gap-3 shadow-lg transform translate-x-2">
                         <div className="w-4 h-4 rounded-full border border-white/20"></div>
                         <div>
                            <div className="text-xs text-white font-medium mb-1">Advanced React Patterns</div>
                            <div className="h-1.5 w-32 bg-white/10 rounded-full"></div>
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-4 items-center opacity-60">
                      <div className="w-16 text-right text-xs text-neutral-500 font-mono">Week 3</div>
                      <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />
          </div>

          {/* Card 2: Personal (Small 2 cols) */}
           <div
             ref={(el) => { if (el) cardsRef.current[1] = el; }}
             className="col-span-1 md:col-span-2 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between group"
          >
             <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                   <User className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Personal Life</h3>
                <p className="text-neutral-400 text-base">Organize side projects and daily goals.</p>
             </div>
             
             {/* Visual: Checklist */}
             <div className="mt-6 space-y-2 select-none pointer-events-none">
                {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className={`w-4 h-4 rounded border ${i === 1 ? 'bg-blue-500 border-blue-500' : 'border-neutral-600'}`}></div>
                      <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                   </div>
                ))}
             </div>
          </div>

          {/* Card 3: Teams (Tall/Large 3 cols) */}
           <div
             ref={(el) => { if (el) cardsRef.current[2] = el; }}
             className="col-span-1 md:col-span-3 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden group"
          >
             <div className="flex justify-between items-start mb-4">
                <div>
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                      <Users className="text-white" size={24} />
                   </div>
                   <h3 className="text-2xl font-medium text-white mb-2">Teams</h3>
                   <p className="text-neutral-400 text-base">Alignment without the meetings.</p>
                </div>
             </div>
             
             {/* Visual: Kanban Board */}
             <div className="flex gap-4 h-40 select-none pointer-events-none">
                <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-2">
                   <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">To Do</div>
                   <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5 shadow-sm">
                      <div className="h-1.5 w-12 bg-blue-500/50 rounded-full mb-2"></div>
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                   </div>
                   <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5 shadow-sm opacity-60">
                      <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                   </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-2">
                   <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">In Progress</div>
                   <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5 shadow-sm border-l-2 border-l-yellow-500">
                      <div className="h-2 w-full bg-white/10 rounded-full mb-1"></div>
                      <div className="flex -space-x-1 mt-2">
                         <div className="w-4 h-4 rounded-full bg-white/20"></div>
                         <div className="w-4 h-4 rounded-full bg-white/20"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 4: Content/Freelancer (3 cols) */}
           <div
             ref={(el) => { if (el) cardsRef.current[3] = el; }}
             className="col-span-1 md:col-span-3 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 p-8 relative overflow-hidden group"
          >
             <div className="flex justify-between items-start mb-8">
                <div>
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                      <Video className="text-white" size={24} />
                   </div>
                   <h3 className="text-2xl font-medium text-white mb-2">Content & Freelance</h3>
                   <p className="text-neutral-400 text-base">Manage clients and content pipelines.</p>
                </div>
             </div>
             
             {/* Visual: Calendar/List */}
             <div className="space-y-3 select-none pointer-events-none">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                   <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-xs font-mono text-neutral-400 flex-col">
                      <span>OCT</span><span className="text-white font-bold">12</span>
                   </div>
                   <div className="flex-1">
                      <div className="text-sm text-white font-medium">Acme Corp - Deliverables</div>
                      <div className="text-xs text-neutral-500">Video Script & Assets</div>
                   </div>
                   <div className="px-2 py-1 rounded text-[10px] bg-green-500/10 text-green-500 border border-green-500/20">Due Today</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 opacity-60">
                   <div className="w-10 h-10 rounded-lg bg-[#222] flex items-center justify-center text-xs font-mono text-neutral-400 flex-col">
                      <span>OCT</span><span className="text-white font-bold">14</span>
                   </div>
                   <div className="flex-1">
                      <div className="text-sm text-white font-medium">Newsletter Draft</div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Coverage;