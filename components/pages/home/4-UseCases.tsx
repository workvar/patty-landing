'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCases from '@/data/Pages/home/4-useCases';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}



const UseCases: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
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
          gsap.to(card, { y: -5, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3 });
        });
      }
    });
  }, []);

  return (
    <section className="py-24 px-4 bg-black/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-10">
          <h2 
            ref={headerRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Built for those who <br />
            obsess over execution.
          </h2>
          <p className="text-neutral-400 text-lg">Patty is designed for builders who obsess over execution. It's the AI co-founder that structures your execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((item, idx) => (
            <div 
              key={idx}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className="p-8 rounded-md bg-[#0A0A0A] border border-white/10 hover:border-white/20 hover:bg-[#111] transition-all group relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.color} bg-opacity-10`}>
                <item.icon className={`${item.color.replace('bg-', 'text-')}`} size={24} />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">{item.role}</h3>
              <p className="text-neutral-400 text-base">{item.benefit}</p>
              
              {/* Subtle background glow based on color */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-10 ${item.color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;