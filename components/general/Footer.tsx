'use client'

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('[data-footer-item]');
      
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
          onComplete: () => {
            gsap.fromTo(
              items,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.2,
              }
            );
          },
        }
      );
    }
  }, []);

  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5 text-sm overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10"
      >
        {/* Brand Column */}
        <div data-footer-item className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
          <Link href="/" className="block" aria-label="Patty Home">
            <div className="text-4xl font-bold tracking-tighter text-white mb-1">W.</div>
            <div className="font-medium text-white text-xs tracking-widest uppercase">WorkVar</div>
          </Link>
          <div className="text-neutral-400 text-xs leading-relaxed pt-2">
            Copyright © 2025<br />
            WorkVar, Inc.<br />
            All rights reserved
          </div>
        </div>

        {/* Features */}
        <div data-footer-item className="flex flex-col gap-4">
          <h4 className="font-semibold text-white">Features</h4>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Patty</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Integrations</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Project Management</a>
        </div>

        {/* Legal */}
        <div data-footer-item className="flex flex-col gap-4">
          <h4 className="font-semibold text-white">Legal</h4>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Privacy Policy</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Terms and Conditions</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Refund Policy</a>
        </div>

        {/* Resources */}
        <div data-footer-item className="flex flex-col gap-4">
          <h4 className="font-semibold text-white">Resources</h4>
          <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Blogs</Link>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Case Studies</a>
        </div>

        {/* About Us */}
        <div data-footer-item className="flex flex-col gap-4">
          <h4 className="font-semibold text-white">About Us</h4>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Careers</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Affiliate Program</a>
        </div>

        {/* Support */}
        <div data-footer-item className="flex flex-col gap-4">
          <h4 className="font-semibold text-white">Support</h4>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Contact Us</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">FAQs</a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;