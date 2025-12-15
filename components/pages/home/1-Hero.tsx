'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  // Typing state management
  const [typedText, setTypedText] = useState('');
  const [conversationState, setConversationState] = useState<'typing' | 'thinking' | 'responded'>('typing');
  const fullText = "Go ahead. Also, generate the user stories for the \"Forgot Password\" flow.";
  
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const thinkingDotsRef = useRef<HTMLDivElement[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );
    }
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      );
    }
    if (mockupRef.current) {
      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, y: 100, rotationX: 20 },
        {
          opacity: 1,
          y: 0,
          rotationX: 20,
          duration: 1,
          delay: 0.4,
          ease: 'power2.out',
        }
      );

      // Floating animation
      gsap.to(mockupRef.current, {
        y: -20,
        rotationX: 22,
        rotationY: -2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.4,
      });
    }
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        opacity: 0.3,
        scale: 1,
        keyframes: [
          { opacity: 0.3, scale: 1 },
          { opacity: 0.5, scale: 1.1 },
          { opacity: 0.3, scale: 1 }
        ],
        duration: 5,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }
  }, []);

  useEffect(() => {
    if (conversationState === 'typing') {
      if (typedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setConversationState('thinking');
      }
    } else if (conversationState === 'thinking') {
      const timeout = setTimeout(() => {
        setConversationState('responded');
        setMounted(true);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [typedText, conversationState]);

  useEffect(() => {
    if (conversationState === 'thinking') {
      thinkingDotsRef.current.forEach((dot, idx) => {
        if (dot) {
          gsap.to(dot, {
            scale: 1.2,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: idx * 0.2,
            ease: 'sine.inOut',
          });
        }
      });
    } else {
      // Clean up animations when not thinking
      thinkingDotsRef.current.forEach((dot) => {
        if (dot) {
          gsap.killTweensOf(dot);
          gsap.set(dot, { scale: 1 });
        }
      });
    }
  }, [conversationState]);

  useEffect(() => {
    if (mounted && responseRef.current) {
      gsap.fromTo(
        responseRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [mounted]);

  return (
    <section className="relative min-h-[110vh] flex flex-col justify-start items-center px-4 pt-40 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-neutral-800/20 to-transparent rounded-[100%] blur-[100px]" />
        <div
          ref={lineRef}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 mb-20 text-center flex flex-col items-center">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-neutral-300 shadow-xl"
          role="status"
        >
          <Sparkles size={14} className="text-yellow-200" aria-hidden="true" />
          <span className="font-medium">Patty Beta is releasing on January 26, 2026</span>
        </div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-[1.1]"
        >
          Don't build blindly. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            Plan with precision.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl text-neutral-400 max-w-2xl leading-relaxed mx-auto"
        >
          Turn vague ideas into actionable specs, user stories, and estimates in seconds. 
          Patty is the AI co-founder that structures your execution.
        </p>

        <div
          ref={buttonRef}
          className="flex justify-center pt-4"
        >
          <button 
            onClick={onOpenWaitlist}
            className="group px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]"
            aria-label="Join Waitlist"
          >
            Join Waitlist <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 3D Product Mockup */}
      <div
        ref={mockupRef}
        style={{ perspective: "1200px" }}
        className="w-full max-w-7xl mx-auto px-4"
        aria-hidden="true" 
      >
        <div className="relative rounded-md border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] transform rotate-x-12">
           {/* Mockup UI */}
           <div className="absolute inset-0 bg-neutral-900/50 flex">
             {/* Sidebar */}
             <div className="w-64 border-r border-white/5 p-4 hidden md:flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-6 h-6 rounded bg-white/10"></div>
                   <div className="w-20 h-3 rounded bg-white/10"></div>
                </div>
                <div className="space-y-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer">
                        <div className="w-4 h-4 rounded-full bg-white/5"></div>
                        <div className="w-24 h-2 rounded bg-white/5"></div>
                     </div>
                   ))}
                </div>
                <div className="mt-auto p-3 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/5">
                   <div className="w-full h-2 rounded bg-white/10 mb-2"></div>
                   <div className="w-2/3 h-2 rounded bg-white/10"></div>
                </div>
             </div>
             
             {/* Main Content */}
             <div className="flex-1 p-8 overflow-hidden relative">
                <div className="max-w-6xl mx-auto space-y-8">
                   {/* Header */}
                   <div className="flex justify-between items-end border-b border-white/5 pb-6">
                      <div>
                         <div className="inline-flex items-center gap-2 text-xs text-blue-400 mb-2">
                           <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                           Planning Phase
                         </div>
                         <h2 className="text-3xl font-semibold text-white">Q4 Product Roadmap</h2>
                      </div>
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 border border-black flex items-center justify-center text-[10px] text-white/50">U{i}</div>
                         ))}
                         <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">+</div>
                      </div>
                   </div>

                   {/* Chat/Interaction Area */}
                   <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                           <Sparkles size={14} />
                         </div>
                         <div className="space-y-2">
                            <div className="text-sm font-medium text-white">Patty AI</div>
                            <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 text-sm text-neutral-300 leading-relaxed border border-white/5">
                               I've analyzed your chaotic voice note. Here is the structured breakdown for the "Mobile MVP" sprint. 
                               I detected 3 logical gaps in the user authentication flow. Shall I resolve them with standard OAuth patterns?
                            </div>
                            <div className="flex gap-2 pt-2">
                               <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/5 transition-colors">
                                  Yes, resolve gaps
                               </button>
                               <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/5 transition-colors">
                                  Show me the gaps
                                </button>
                            </div>
                         </div>
                      </div>

                      {/* User Input (Animated) */}
                      <div className="flex gap-4 flex-row-reverse">
                         <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-neutral-500"></div>
                         </div>
                         <div className="space-y-2 text-right">
                            <div className="text-sm font-medium text-white">You</div>
                            <div className="p-4 rounded-2xl rounded-tr-none bg-blue-600 text-sm text-white leading-relaxed inline-block text-left">
                               {typedText}
                               <span className="inline-block w-1 h-4 bg-white/70 ml-1 animate-pulse align-middle"></span>
                            </div>
                         </div>
                      </div>
                      
                      {/* AI Response (Thinking & Result) */}
                      {conversationState !== 'typing' && (
                          <div 
                            className="flex gap-4"
                          >
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                              <Sparkles size={14} />
                            </div>
                            <div className="space-y-2 w-full">
                               <div className="text-sm font-medium text-white">Patty AI</div>
                               
                               {conversationState === 'thinking' ? (
                                  <div className="flex items-center gap-1 p-4 rounded-2xl rounded-tl-none bg-white/5 w-fit">
                                     <div ref={(el) => { if (el) thinkingDotsRef.current[0] = el; }} className="w-2 h-2 rounded-full bg-neutral-400"></div>
                                     <div ref={(el) => { if (el) thinkingDotsRef.current[1] = el; }} className="w-2 h-2 rounded-full bg-neutral-400"></div>
                                     <div ref={(el) => { if (el) thinkingDotsRef.current[2] = el; }} className="w-2 h-2 rounded-full bg-neutral-400"></div>
                                  </div>
                               ) : (
                                  <div 
                                    ref={responseRef}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                  >
                                        <div className="p-3 rounded-xl bg-[#151515] border border-white/5 hover:border-white/20 transition-colors group cursor-pointer">
                                           <div className="flex justify-between items-start mb-2">
                                              <span className="text-xs font-mono text-neutral-500">US-101</span>
                                              <div className="w-4 h-4 rounded-full border border-white/20 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-colors"></div>
                                           </div>
                                           <div className="text-sm text-white font-medium mb-1">Request Password Reset</div>
                                           <div className="text-xs text-neutral-400">As a user, I want to request a reset link...</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#151515] border border-white/5 hover:border-white/20 transition-colors group cursor-pointer">
                                           <div className="flex justify-between items-start mb-2">
                                              <span className="text-xs font-mono text-neutral-500">US-102</span>
                                              <div className="w-4 h-4 rounded-full border border-white/20 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-colors"></div>
                                           </div>
                                           <div className="text-sm text-white font-medium mb-1">Reset Token Validation</div>
                                           <div className="text-xs text-neutral-400">System validates the token expiry and integrity...</div>
                                        </div>
                                  </div>
                               )}
                            </div>
                          </div>
                      )}
                   </div>
                </div>
                
                {/* Floating Elements for Depth */}
                <div className="absolute top-20 right-10 p-4 rounded-xl glass bg-black/40 border border-white/10 backdrop-blur-md shadow-xl w-64 transform rotate-6 hidden lg:block">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                         <CheckCircle2 size={16} />
                      </div>
                      <div>
                         <div className="text-xs text-neutral-400">Velocity</div>
                         <div className="text-sm font-bold text-white">24 pts / sprint</div>
                      </div>
                   </div>
                   <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="w-[70%] bg-green-500 h-full rounded-full"></div>
                   </div>
                </div>

             </div>
           </div>
           
           {/* Reflection Overlay */}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </div>
        
        {/* Glow under the mockup */}
        <div className="absolute -bottom-20 left-10 right-10 h-20 bg-blue-500/20 blur-[100px]" />
      </div>
      
    </section>
  );
};

export default Hero;