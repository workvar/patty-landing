'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';

// Pricing plans will be added closer to launch.

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
      );
    }
    if (toggleRef.current) {
      gsap.fromTo(
        toggleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
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
            delay: 0.3 + idx * 0.1,
          }
        );
      }
    });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-left max-w-3xl mb-20 space-y-4">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Simple pricing for <br />
            serious builders.
          </h1>
          <p 
            ref={subtitleRef}
            className="text-lg text-neutral-300"
          >
            Start for free, upgrade when you need to scale your execution.
          </p>
          
          <div 
            ref={toggleRef}
            className="flex items-center justify-start gap-4 pt-8 hidden"
          >
            <span className={`text-sm ${!annual ? 'text-white' : 'text-neutral-400'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
              className="w-12 h-6 rounded-full bg-neutral-800 p-1 relative focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-all ${annual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm ${annual ? 'text-white' : 'text-neutral-400'}`}>
              Yearly <span className="text-green-500 text-xs ml-1 font-medium">-20%</span>
            </span>
          </div>
        </div>

        <div className="mt-10">
          <div className="rounded-3xl border border-dashed border-white/20 bg-neutral-900/40 px-8 py-10 max-w-full">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Coming Soon
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">
              Pricing to be updated soon.
            </h2>
            <p className="text-sm text-neutral-300 mb-6">
              Patty is still in active development. We’re finalizing plans that work for solo builders, teams, and companies.
              Join the waitlist on the homepage to be the first to know when pricing goes live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;