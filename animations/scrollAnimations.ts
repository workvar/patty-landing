import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, RefObject } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper to animate elements on scroll
export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    delay?: number;
    duration?: number;
    start?: string;
    once?: boolean;
  } = {}
) => {
  useEffect(() => {
    if (ref.current) {
      const {
        from = { opacity: 0, y: 30 },
        to = { opacity: 1, y: 0 },
        delay = 0,
        duration = 0.6,
        start = 'top 80%',
        once = true,
      } = options;

      gsap.fromTo(
        ref.current,
        from,
        {
          ...to,
          duration,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once,
          },
        }
      );
    }
  }, [ref, options]);
};

// Helper for stagger animations
export const useStaggerScroll = (
  containerRef: RefObject<HTMLElement>,
  selector: string,
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    delay?: number;
    duration?: number;
    start?: string;
    once?: boolean;
  } = {}
) => {
  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(selector);
      const {
        from = { opacity: 0, y: 30 },
        to = { opacity: 1, y: 0 },
        stagger = 0.1,
        delay = 0,
        duration = 0.5,
        start = 'top 80%',
        once = true,
      } = options;

      gsap.fromTo(
        elements,
        from,
        {
          ...to,
          duration,
          delay,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once,
          },
        }
      );
    }
  }, [containerRef, selector, options]);
};

