'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { caseStudies } from '@/data/Pages/case-studies';
import { CaseStudyCard } from '@/components/pages/case-studies/CaseStudyCard';

const CaseStudies: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.15 + idx * 0.08,
          }
        );
      }
    });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="mb-16 space-y-4">
          <p className="text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">
            Case Studies
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white">
            How you can actually use Patty in the wild.
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            With Patty, turn your vague ideas into precise execution without adding more meetings to your calendar.
          </p>
        </div>

        <div className="">
          {caseStudies.map((study, idx) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={idx}
              cardsRef={cardsRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;


