'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import integrations from '@/data/Pages/home/6-integration';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Integrations: React.FC = () => {
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
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: idx * 0.05,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3 });
        });
      }
    });
  }, []);

  return (
    <section className="py-24 px-4 bg-black/50 relative">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className="flex flex-col items-start mb-10 gap-4"
        >
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-left">
             Connects with your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">favorite tools.</span>
           </h2>
           <p className="text-neutral-400 max-w-xl text-lg text-left">
             Patty plays nice with the tools you already use every day, ensuring your data is always where you need it.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {integrations.map((tool, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className="p-6 rounded-md bg-[#0F0F0F] border border-white/5 hover:border-white/20 transition-all group flex flex-col items-center text-center gap-5"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Image src={tool.icon} alt={tool.name} width={24} height={24} />
              </div>
              <div className="w-[80%]">
                 <h3 className="text-sm font-semibold text-white mb-2">{tool.name}</h3>
                 <p className="text-md text-neutral-500">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;