'use client'

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/assets';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  id: string;
  title: string;
  links: FooterLink[];
};

const footerSections: Record<string, FooterSection> = {
  features: {
    id: 'features',
    title: 'Features',
    links: [
      { label: 'Patty', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Project Management', href: '#' },
    ],
  },
  legal: {
    id: 'legal',
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms and Conditions', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  },
  resources: {
    id: 'resources',
    title: 'Resources',
    links: [
      { label: 'Blogs', href: '/blog' },
      { label: 'Case Studies', href: '#' },
    ],
  },
  about: {
    id: 'about',
    title: 'About Us',
    links: [
      { label: 'Careers', href: '#' },
      { label: 'Affiliate Program', href: '#' },
    ],
  },
  support: {
    id: 'support',
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
};

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

  // Layout for the link sections (3 columns x 2 rows)
  // Row 1: Features | Legal | Resources
  // Row 2: Blank   | About  | Support
  const footerGridOrder: (keyof typeof footerSections | null)[] = [
    'features',
    'legal',
    'resources',
    null,
    'about',
    'support',
  ];

  return (
    <footer className="py-20 px-6 bg-black border-t border-white/30 text-sm overflow-hidden">
      <div 
        ref={containerRef}
        className="px-20 mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-6 gap-10 items-start"
      >
        {/* Brand Column (left) */}
        <div data-footer-item className="space-y-4 lg:col-span-2 px-20">
          <Link href="/" className="block text-center" aria-label="WorkVar Home">
            <Image src={brand.WorkVarLogo} className='mx-auto' alt="WorkVar Logo" width={120} height={120} />
            <div className="mt-4 font-medium text-white text-sm tracking-widest">Workवार</div>
          </Link>
          <div className="text-neutral-400 text-xs leading-relaxed pt-2 mx-auto text-center">
            Copyright © {new Date().getFullYear()} <br />
            WorkVar Pvt. Ltd.<br />
            All rights reserved
          </div>
        </div>

        {/* Links Column (right, 80%) */}
        <div className="lg:col-span-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerGridOrder.map((sectionKey, idx) => {
              if (sectionKey === null) {
                // Blank cell in grid (only show on >= sm)
                return <div key={`blank-${idx}`} className="hidden sm:block" />;
              }

              const section = footerSections[sectionKey];

              return (
                <div key={section.id} data-footer-item className="flex flex-col gap-1">
                  <h4 className="font-semibold text-white">{section.title}</h4>
                  {section.links.map((link) =>
                    link.href.startsWith('/') ? (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:underline"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;