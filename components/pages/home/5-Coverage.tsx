'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coverageCards } from '@/data/Pages/home/5-coverage';

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

            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(350px,auto)]">
               {coverageCards.map((card, idx) => (
                  <div
                     key={idx}
                     ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                     className={card.className}
                  >
                     {card.component}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Coverage;