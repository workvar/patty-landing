'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { trackWaitlistSuccess, trackWaitlistFailure } from '@/lib/analytics';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small timeout to allow animation to start/element to mount
      const timer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
      setEmail('');
      setError(null);
      setUserNumber(null);
      setStep('form');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  // Focus trap and Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Animate modal entrance/exit
  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      }
      if (modalContentRef.current) {
        gsap.fromTo(
          modalContentRef.current,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    } else {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      }
      if (modalContentRef.current) {
        gsap.to(modalContentRef.current, {
          scale: 0.95,
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: 'power2.in',
        });
      }
    }
  }, [isOpen]);


  // Animate loading state
  useEffect(() => {
    if (loading) {
      if (loaderRef.current) {
        gsap.fromTo(
          loaderRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.2 }
        );
      }
      if (loaderTextRef.current) {
        gsap.fromTo(
          loaderTextRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 }
        );
      }
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    let errorTracked = false;

    try {
      if (!executeRecaptcha) {
        trackWaitlistFailure('reCAPTCHA not loaded');
        errorTracked = true;
        throw new Error('reCAPTCHA not loaded');
      }

      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('waitlist_submit');

      // Call API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Track failure event
        trackWaitlistFailure(
          data.error || 'Failed to join waitlist',
          response.status
        );
        errorTracked = true;
        throw new Error(data.error || 'Failed to join waitlist');
      }

      // Store user_number from response
      if (data.user_number) {
        setUserNumber(data.user_number);
      }

      // Track success event
      trackWaitlistSuccess(data.user_number || null);

      setLoading(false);
      setStep('success');
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      
      // Track failure event only if not already tracked (for network errors, etc.)
      if (!errorTracked) {
        trackWaitlistFailure(errorMessage);
      }
      
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <div ref={modalRef}>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-1"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {step === 'form' ? (
              <>
                <div className="mb-8">
                  <h2 id="waitlist-modal-title" className="text-3xl font-medium text-white mb-2">Join the Waitlist</h2>
                  <p className="text-neutral-300">Secure your spot for early access.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-neutral-400 ml-1">Email</label>
                    <input
                      ref={firstInputRef}
                      id="email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm px-1">
                      {error}
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={(e) => {
                        if (!loading) {
                          gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
                        }
                      }}
                      aria-busy={loading}
                      className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div
                          ref={loaderRef}
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="animate-spin" size={20} />
                          <span ref={loaderTextRef}>Processing...</span>
                        </div>
                      ) : (
                        <span>Join Waitlist</span>
                      )}
                    </button>
                    <p className="text-xs text-center text-neutral-500 mt-4">
                      This site is protected by reCAPTCHA and the Google
                      <a href="#" className="underline hover:text-neutral-400 mx-1 focus:outline-none focus:text-white">Privacy Policy</a> and
                      <a href="#" className="underline hover:text-neutral-400 mx-1 focus:outline-none focus:text-white">Terms of Service</a> apply.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-6" role="alert" aria-live="polite">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                  <CheckCircle size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-medium text-white">You have made it to the waitlist!</h3>
                  {userNumber && (
                    <p className="text-md font-semibold text-green-500">You're #{userNumber} on the list</p>
                  )}
                  <p className="text-neutral-300 max-w-xs mx-auto">We'll notify you as soon as your spot opens up. Keep an eye on your inbox.</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-neutral-800 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                  // Explicitly focusing this button in success state is good practice but strict trap logic handles cycling.
                  // Since we change content, focus might be lost if we don't handle it.
                  ref={(el) => {
                    if (el && step === 'success') el.focus();
                  }}
                >
                  Close
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;