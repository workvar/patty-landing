'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import impact from '@/data/Pages/home/3-impact';

const Features: React.FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const featureCardsRef = useRef<HTMLDivElement[]>([]);
  const metricCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

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

    featureCardsRef.current.forEach((card, idx) => {
      if (!card) return;
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
    });

    metricCardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section id="impact" className="py-10 px-4 bg-neutral-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* IMPACT METRICS SECTION */}
        <div className="border-t border-white/5 pt-5">
          <div className="text-left mb-12">
            <h3 className="text-4xl md:text-5xl font-semibold text-white mb-3">Quantifiable Impact</h3>
            <p className="text-neutral-400 text-lg">The difference between planning and execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {impact.map((item, idx) => (
              <div key={idx} className={item.className}>
                {item.component}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;