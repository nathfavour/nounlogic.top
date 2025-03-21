'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
}

export default function ScrollReveal({ 
  children, 
  threshold = 0.1, 
  delay = 0 
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }, delay * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, delay]);
  
  return (
    <div 
      ref={elementRef} 
      className={`opacity-0 translate-y-8 transform transition-all duration-700 ease-out`}
      style={{ transitionDelay: `${delay * 150}ms` }}
    >
      {children}
    </div>
  );
}
