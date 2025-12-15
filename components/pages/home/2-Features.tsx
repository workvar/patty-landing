'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import features from '@/data/Pages/home/2-features';

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
    <section id="features" className="pt-24 px-4 bg-neutral-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="mb-20 text-left max-w-2xl space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter">
            Total control. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Zero administrative overhead.</span>
          </h2>
          <p className="text-lg text-neutral-300">
            Patty manages the boring parts of product management so you can focus on the vision.
          </p>
        </div>

        {/* BENTO GRID for features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)] mb-24">
          {features.map((feature, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) featureCardsRef.current[idx] = el; }}
              className={feature.className}
            >
              {feature.component}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;