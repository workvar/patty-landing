'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav
        ref={navRef}
        className={`w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-2 py-2 ${
          scrolled 
            ? 'glass bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-2 pl-4" aria-label="Patty Home">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/10">
            <div className="w-3 h-3 bg-black rounded-full" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white hidden sm:block">Patty</span>
        </Link>

        <div className="hidden md:flex items-center rounded-full px-1 p-1">
          <Link href="/" className="px-5 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all">Home</Link>
          <Link href="/pricing" className="px-5 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all">Pricing</Link>
          <Link href="/blog" className="px-5 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-all">Blog</Link>
        </div>

        <div className="flex items-center pr-1">
          <button 
            onClick={onOpenWaitlist}
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-4 focus:ring-white/30 transition-colors shadow-lg shadow-white/5"
          >
            Join Waitlist
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;