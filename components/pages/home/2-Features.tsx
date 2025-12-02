'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, ListTodo, Target, Zap, GitPullRequest, Mic, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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

    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
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

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.01, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3 });
        });
      }
    });
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className="mb-20 text-left max-w-2xl space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter">
            Total control. <br /> 
            <span className="text-neutral-500">Zero administrative overhead.</span>
          </h2>
          <p className="text-lg text-neutral-300">
            Patty manages the boring parts of product management so you can focus on the vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Card 1: Contextual Understanding (Large) */}
          <div 
            ref={(el) => { if (el) cardsRef.current[0] = el; }}
            className="col-span-1 md:col-span-6 lg:col-span-8 glass-card rounded-[2rem] p-8 relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Brain className="text-white" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Deep Context Awareness</h3>
                <p className="text-neutral-300 max-w-sm">Patty ingests your messy docs, voice notes, and Slack threads to build a semantic understanding of your product.</p>
              </div>
              
              {/* Visual */}
              <div className="w-full bg-[#111] border border-white/5 rounded-xl p-4 space-y-3" aria-hidden="true">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center"><Mic size={14} className="text-neutral-400"/></div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 text-xs text-neutral-300 w-3/4 border border-white/5">
                       "We need a way for users to invite team members, but only admins should control billing."
                    </div>
                 </div>
                 <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex-shrink-0 flex items-center justify-center"><Sparkles size={14} className="text-blue-400"/></div>
                    <div className="bg-blue-900/10 rounded-2xl rounded-tr-none p-3 text-xs text-blue-200 w-3/4 border border-blue-500/20">
                       <span className="font-semibold block mb-1">Requirement Added</span>
                       User Role Management: Admin-only billing access controls implemented via RBAC middleware.
                    </div>
                 </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
          </div>

          {/* Card 2: Sprint Calibration (Tall) */}
          <div 
            ref={(el) => { if (el) cardsRef.current[1] = el; }}
            className="col-span-1 md:col-span-6 lg:col-span-4 glass-card rounded-[2rem] p-8 relative overflow-hidden"
          >
             <div className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Zap className="text-yellow-400" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Auto-Sprints</h3>
                <p className="text-neutral-300 text-sm mb-8">Estimates complexity and groups tasks into realistic 2-week sprints.</p>
                
                <div className="mt-auto space-y-2" aria-hidden="true">
                   {['Sprint 24', 'Sprint 25', 'Sprint 26'].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className={`w-2 h-8 rounded-full ${i===0 ? 'bg-green-500' : 'bg-neutral-700'}`}></div>
                         <div className="flex-1">
                            <div className="text-sm font-medium text-white">{s}</div>
                            <div className="text-xs text-neutral-500">{i===0 ? 'In Progress' : 'Planned'}</div>
                         </div>
                         <div className="text-xs font-mono text-neutral-400">24pts</div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Card 3: User Stories (Medium) */}
          <div 
            ref={(el) => { if (el) cardsRef.current[2] = el; }}
            className="col-span-1 md:col-span-6 lg:col-span-4 glass-card rounded-[2rem] p-8 relative overflow-hidden"
          >
             <div className="mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <ListTodo className="text-green-400" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Perfect Specs</h3>
                <p className="text-neutral-300 text-sm">Gherkin-syntax stories ready for dev.</p>
             </div>
             <div className="bg-[#111] p-4 rounded-xl border border-white/5 font-mono text-[10px] text-neutral-400 leading-relaxed" aria-hidden="true">
                <span className="text-purple-400">Feature:</span> Dark Mode<br/>
                <span className="text-blue-400">Scenario:</span> User toggles switch<br/>
                <span className="text-yellow-400">Given</span> user is on settings page<br/>
                <span className="text-yellow-400">When</span> they click toggle<br/>
                <span className="text-yellow-400">Then</span> theme updates locally<br/>
                <span className="text-yellow-400">And</span> preference saves to DB
             </div>
          </div>

          {/* Card 4: Dynamic Roadmaps (Large) */}
          <div 
            ref={(el) => { if (el) cardsRef.current[3] = el; }}
            className="col-span-1 md:col-span-6 lg:col-span-8 glass-card rounded-[2rem] p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
          >
             <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <GitPullRequest className="text-purple-400" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-2">Living Roadmaps</h3>
                <p className="text-neutral-300">Priorities change. Patty automatically reshuffles your timeline, flagging dependencies and risks instantly.</p>
             </div>
             <div className="flex-1 w-full" aria-hidden="true">
                <div className="relative h-32 w-full">
                   {/* Gantt Chart Abstract */}
                   <div className="absolute top-0 left-0 w-3/4 h-8 bg-neutral-800 rounded-lg border border-white/5 flex items-center px-3 text-xs text-white mb-2">Core Infrastructure</div>
                   <div className="absolute top-10 left-[20%] w-1/2 h-8 bg-blue-900/30 border border-blue-500/30 rounded-lg flex items-center px-3 text-xs text-blue-200">API Gateway</div>
                   <div className="absolute top-20 left-[40%] w-1/2 h-8 bg-purple-900/30 border border-purple-500/30 rounded-lg flex items-center px-3 text-xs text-purple-200">Frontend Auth</div>
                   
                   {/* Connection Line */}
                   <div className="absolute top-4 left-[75%] w-[5%] h-16 border-l border-b border-white/20 rounded-bl-xl"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;