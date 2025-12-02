'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerDownRight } from 'lucide-react';
import { workflowSteps } from '@/data/Pages/home/3-workflow';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const Workflow: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

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

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1.5,
          delay: 0.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    stepsRef.current.forEach((step, idx) => {
      if (step) {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: idx * 0.2 + 0.3,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="workflow" className="py-24 px-4 bg-black/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-left mb-10"
        >
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
             From Chaos to Clarity
           </h2>
           <p className="text-lg text-neutral-400">The pipeline designed for builders.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div 
                ref={lineRef}
                className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-40"
              />
           </div>

          {/* Steps */}
          {workflowSteps.map((step, idx) => (
            <div 
              key={step.id}
              ref={(el) => { if (el) stepsRef.current[idx] = el; }}
              className="relative z-10"
            >
              <div className="p-8 rounded-md bg-[#0F0F0F] border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col items-start text-left group">
                <div className={`w-12 h-12 rounded-full ${step.color} bg-opacity-10 text-${step.color.split('-')[1]}-400 flex items-center justify-center mb-6 font-bold border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  {step.id}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-base text-neutral-400 leading-relaxed">{step.description}</p>
                
                {/* Visual Connector for Mobile */}
                {idx < workflowSteps.length - 1 && (
                   <div className="md:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 text-neutral-700">
                      <CornerDownRight />
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;