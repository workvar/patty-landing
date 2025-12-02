'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "0",
    description: "For solo builders just getting started.",
    features: ["5 Projects", "Basic AI Structuring", "Simple Roadmap", "Community Support"]
  },
  {
    name: "Pro",
    price: "29",
    description: "For professional product managers and founders.",
    features: ["Unlimited Projects", "Deep Context Awareness", "Jira & Linear Sync", "Priority Support", "Advanced Sprint Planning"],
    popular: true
  },
  {
    name: "Team",
    price: "99",
    description: "For startups scaling their execution.",
    features: ["5 Team Members", "Shared Workspaces", "Role-based Permissions", "API Access", "Custom Workflows"]
  }
];

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
            className="flex items-center justify-start gap-4 pt-8"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className={`relative p-8 rounded-3xl border flex flex-col ${
                plan.popular 
                  ? 'bg-neutral-900/50 border-white/20' 
                  : 'bg-black border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-xs font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-semibold text-white">${plan.price}</span>
                  <span className="text-neutral-400">/mo</span>
                </div>
                <p className="text-sm text-neutral-300">{plan.description}</p>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <Check size={18} className="text-white mt-0.5" />
                    <span className="text-sm text-neutral-300">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
                plan.popular 
                  ? 'bg-white text-black hover:bg-neutral-200 focus:ring-white' 
                  : 'bg-neutral-800 text-white hover:bg-neutral-700 focus:ring-neutral-700'
              }`}>
                {plan.price === "0" ? "Start Building" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;