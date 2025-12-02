'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const posts = [
  {
    category: "Product Management",
    title: "Why your roadmap is a lie (and how to fix it)",
    date: "Oct 12, 2024",
    readTime: "5 min read"
  },
  {
    category: "AI & Strategy",
    title: "The end of the backlog: AI-driven prioritization",
    date: "Oct 08, 2024",
    readTime: "4 min read"
  },
  {
    category: "Engineering",
    title: "From User Story to PR: Automating the boring parts",
    date: "Sep 28, 2024",
    readTime: "7 min read"
  },
  {
    category: "Case Study",
    title: "How Acme Corp reduced planning time by 80%",
    date: "Sep 15, 2024",
    readTime: "6 min read"
  }
];

const Blog: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    articlesRef.current.forEach((article, idx) => {
      if (article) {
        gsap.fromTo(
          article,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: idx * 0.1,
          }
        );
      }
    });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-medium text-white mb-6">Thoughts</h1>
          <p className="text-lg text-neutral-400">Insights on building products in the age of intelligence.</p>
        </div>

        <div className="space-y-12">
          {posts.map((post, idx) => (
            <article 
              key={idx}
              ref={(el) => { if (el) articlesRef.current[idx] = el; }}
              className="group cursor-pointer border-b border-white/5 pb-12"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">{post.category}</span>
                <span className="text-xs text-neutral-600">{post.date} · {post.readTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-medium text-white group-hover:text-neutral-300 transition-colors">
                  {post.title}
                </h2>
                <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;