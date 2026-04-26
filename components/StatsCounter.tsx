'use client';

import { useEffect, useRef, useState } from 'react';
import { Package, Users, Globe2, Star } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  gradient: string;
}

const stats: StatItem[] = [
  { icon: Package, value: 500, suffix: '+', label: 'Products Listed', gradient: 'from-orange-500 to-amber-500' },
  { icon: Users, value: 1200, suffix: '+', label: 'Happy Customers', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Globe2, value: 30, suffix: '+', label: 'Countries Served', gradient: 'from-green-500 to-emerald-500' },
  { icon: Star, value: 4.9, suffix: '★', label: 'Average Rating', gradient: 'from-amber-500 to-yellow-500' },
];

function AnimatedNumber({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const [display, setDisplay] = useState(0);
  
  useEffect(() => {
    if (!started) return;
    
    const isDecimal = value % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      const progress = Math.min(current / steps, 1);
      // Eased progress
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * value;
      setDisplay(isDecimal ? parseFloat(val.toFixed(1)) : Math.floor(val));
      
      if (current >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [started, value]);
  
  return (
    <span className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`text-center transform transition-all duration-700 ${
            started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: `${i * 150}ms` }}
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white mb-1">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} started={started} />
          </div>
          <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
