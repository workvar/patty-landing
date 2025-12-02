'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { 
  SquareKanban, 
  MessageSquare, 
  FileText, 
  Calendar, 
  FileSpreadsheet, 
  Database 
} from 'lucide-react';

const integrations = [
  {
    name: "Jira",
    icon: SquareKanban,
    description: "Automatically sync user stories and epics to keep your engineering team aligned."
  },
  {
    name: "Slack",
    icon: MessageSquare,
    description: "Generate daily stand-up summaries and receive real-time alerts."
  },
  {
    name: "Notion",
    icon: FileText,
    description: "Embed live, interactive roadmaps directly into your project documentation."
  },
  {
    name: "Google Calendar",
    icon: Calendar,
    description: "Auto-schedule sprint reviews and meetings based on team availability."
  },
  {
    name: "Excel",
    icon: FileSpreadsheet,
    description: "Export detailed execution plans and resource data for offline analysis."
  },
  {
    name: "Airtable",
    icon: Database,
    description: "Sync project data to build custom dashboards and automated workflows."
  }
];

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
    <section className="py-24 px-4 bg-neutral-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={headerRef}
          className="flex flex-col items-start mb-12 gap-4"
        >
           <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight text-left">
             Connects with your <br />
             <span className="text-neutral-500">favorite tools.</span>
           </h2>
           <p className="text-neutral-400 max-w-sm text-sm text-left">
             Patty plays nice with the tools you already use every day, ensuring your data is always where you need it.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {integrations.map((tool, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className="p-6 rounded-3xl bg-[#0F0F0F] border border-white/5 hover:border-white/20 transition-all group flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <tool.icon size={20} className="text-white" />
              </div>
              <div>
                 <h3 className="text-sm font-semibold text-white mb-1">{tool.name}</h3>
                 <p className="text-xs text-neutral-500 leading-snug">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;