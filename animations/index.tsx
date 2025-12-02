import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef, useEffect, useState } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const fadeIn = {
  opacity: 0,
  y: 20,
};

export const fadeInUp = {
  opacity: 0,
  y: 30,
};

export const fadeInDown = {
  opacity: 0,
  y: -100,
};

export const scaleIn = {
  opacity: 0,
  scale: 0.95,
};

export const slideIn = {
  opacity: 0,
  x: -20,
};

// Animation defaults
export const defaultDuration = 0.6;
export const defaultEase = 'power2.out';

// Hook for fade in animations
export const useFadeIn = (delay = 0, duration = defaultDuration) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: defaultEase,
        }
      );
    }
  }, [delay, duration]);

  return ref;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  trigger: string | HTMLElement | null,
  animation: { from?: gsap.TweenVars; to?: gsap.TweenVars },
  options?: ScrollTrigger.Vars
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current!,
          animation.from || { opacity: 0, y: 30 },
          {
            ...(animation.to || {}),
            scrollTrigger: {
              trigger: trigger || ref.current,
              start: 'top 80%',
              once: true,
              ...options,
            },
          }
        );
      });

      return () => ctx.revert();
    }
  }, [trigger, animation, options]);

  return ref;
};

// Hook for stagger animations
export const useStaggerAnimation = (
  selector: string,
  animation: gsap.TweenVars,
  stagger = 0.1
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll(selector);
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger,
          ...animation,
        }
      );
    }
  }, [selector, animation, stagger]);

  return ref;
};

// Hook for infinite animations
export const useInfiniteAnimation = (
  animation: gsap.TweenVars,
  delay = 0
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        ...animation,
        repeat: -1,
        delay,
        ease: 'none',
      });
    }
  }, [animation, delay]);

  return ref;
};

// Hook for hover animations
export const useHoverAnimation = (
  hover: gsap.TweenVars,
  leave?: gsap.TweenVars
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const onEnter = () => {
        gsap.to(element, hover);
      };
      const onLeave = () => {
        gsap.to(element, leave || { scale: 1, duration: 0.3 });
      };

      element.addEventListener('mouseenter', onEnter);
      element.addEventListener('mouseleave', onLeave);

      return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
      };
    }
  }, [hover, leave]);

  return ref;
};

// Utility function for scroll-triggered animations
export const animateOnScroll = (
  element: HTMLElement | string,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) => {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) return;

  gsap.fromTo(
    target,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      ...animation,
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        once: true,
        ...options,
      },
    }
  );
};

// Utility for entrance animations
export const animateEntrance = (
  element: HTMLElement | string,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  delay = 0
) => {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) return;

  gsap.fromTo(target, from, {
    ...to,
    delay,
    ease: defaultEase,
  });
};

// Component wrapper for animations
export const AnimatedDiv = ({
  children,
  className,
  animation = fadeIn,
  delay = 0,
  duration = defaultDuration,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  animation?: gsap.TweenVars;
  delay?: number;
  duration?: number;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        animation,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: defaultEase,
        }
      );
    }
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

// Hook for conditional animations (like AnimatePresence)
export const useAnimatePresence = (isVisible: boolean) => {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: defaultEase,
          }
        );
      }
    } else {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: 0.2,
          ease: defaultEase,
          onComplete: () => setMounted(false),
        });
      } else {
        setMounted(false);
      }
    }
  }, [isVisible]);

  return { ref, mounted };
};

// Hook for scroll-based transforms (replaces useScroll, useTransform)
export const useScrollTransform = (
  element: HTMLElement | null,
  outputRange: [number, number],
  inputRange?: [number, number]
) => {
  const [value, setValue] = useState(outputRange[0]);

  useEffect(() => {
    if (!element) return;

    const updateValue = () => {
      const scrollY = window.scrollY;
      const start = inputRange?.[0] ?? 0;
      const end = inputRange?.[1] ?? window.innerHeight;
      const min = outputRange[0];
      const max = outputRange[1];

      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
      const newValue = min + (max - min) * progress;
      setValue(newValue);
    };

    window.addEventListener('scroll', updateValue);
    updateValue();

    return () => window.removeEventListener('scroll', updateValue);
  }, [element, outputRange, inputRange]);

  return value;
};

