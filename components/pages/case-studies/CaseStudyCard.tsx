import React from 'react';
import { Quote } from 'lucide-react';
import type { CaseStudy } from '@/data/Pages/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  cardsRef: React.MutableRefObject<HTMLDivElement[]>;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, index, cardsRef }) => {
  return (
    <article
      key={study.id}
      ref={(el: HTMLDivElement | null) => {
        if (el) cardsRef.current[index] = el;
      }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 p-6 md:p-8 mb-8 last:mb-0"
    >
      <div className="pointer-events-none absolute -top-10 -right-4 text-neutral-700">
        <Quote size={96} className="opacity-10" />
      </div>
      <div className="relative space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-medium text-white">
            {study.title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
          <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
            {study.context}
          </span>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          {study.description}
        </p>

        <p className="text-sm text-emerald-300/90">
          <span className="font-semibold text-emerald-200">Impact:&nbsp;</span>
          {study.impact}
        </p>
      </div>
    </article>
  );
};


