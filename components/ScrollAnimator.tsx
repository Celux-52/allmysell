'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollAnimatorProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'scale-in' | 'fade-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollAnimator({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  threshold = 0.15,
}: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const animationClasses: Record<string, { hidden: string; visible: string }> = {
    'fade-in-up': {
      hidden: 'opacity-0 translate-y-10',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-in-down': {
      hidden: 'opacity-0 -translate-y-10',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-in-left': {
      hidden: 'opacity-0 -translate-x-10',
      visible: 'opacity-100 translate-x-0',
    },
    'fade-in-right': {
      hidden: 'opacity-0 translate-x-10',
      visible: 'opacity-100 translate-x-0',
    },
    'scale-in': {
      hidden: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100',
    },
    'fade-in': {
      hidden: 'opacity-0',
      visible: 'opacity-100',
    },
  };

  const { hidden, visible } = animationClasses[animation] || animationClasses['fade-in-up'];

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? visible : hidden
      } ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
