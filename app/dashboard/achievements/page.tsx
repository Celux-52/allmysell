'use client';

import { useState, useEffect } from 'react';
import { Trophy, Target, Zap, Star, Shield, Search, TrendingUp, Sparkles, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  points: number;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

export default function AchievementsPage() {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [nextLevelXp, setNextLevelXp] = useState(100);
  
  // Dummy achievements for UI representation
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'First Steps', description: 'Complete your account registration', icon: Target, points: 50, unlocked: true },
    { id: '2', title: 'Curious Mind', description: 'Perform your first AI product search', icon: Search, points: 100, unlocked: true },
    { id: '3', title: 'Trend Spotter', description: 'Analyze market trends 5 times', icon: TrendingUp, points: 150, unlocked: false, progress: 2, total: 5 },
    { id: '4', title: 'Product Hoarder', description: 'Save 10 products to your workspace', icon: Star, points: 200, unlocked: false, progress: 3, total: 10 },
    { id: '5', title: 'Master Researcher', description: 'Reach Level 5', icon: Shield, points: 500, unlocked: false, progress: 1, total: 5 },
    { id: '6', title: 'Early Adopter', description: 'Join AllMySell during the beta phase', icon: Sparkles, points: 1000, unlocked: true },
  ]);

  useEffect(() => {
    // In production, this fetches from Supabase profiles and user_achievements tables
    // Currently populated with mock user progress
    setXp(150);
    setLevel(2);
    setNextLevelXp(300);
  }, []);

  const progressPercent = Math.round((xp / nextLevelXp) * 100);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cornsilk mb-1">Achievements</h1>
        <p className="text-gray-400 text-sm">Track your progress and unlock rewards</p>
      </div>

      {/* Level Banner */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] rounded-2xl p-6 lg:p-8 border border-white/5 mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-white/5">
          <Trophy size={200} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#E8750A] to-[#F59E0B] shadow-[0_0_30px_rgba(232,117,10,0.3)] border-4 border-[#111111]">
            <span className="text-3xl font-bold text-white">{level}</span>
          </div>
          
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-cornsilk mb-2">Researcher Level {level}</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Experience Points (XP)</span>
              <span className="text-cornsilk font-bold">{xp} <span className="text-gray-600 font-normal">/ {nextLevelXp} XP</span></span>
            </div>
            
            <div className="h-3 w-full bg-[#0A0A0A] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#E8750A] to-[#F59E0B] rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">
              {nextLevelXp - xp} XP to Level {level + 1}
            </p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <h3 className="text-lg font-semibold text-cornsilk mb-4 flex items-center gap-2">
        <Zap className="text-[#F59E0B]" size={20} />
        Your Badges
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map(ach => (
          <div 
            key={ach.id} 
            className={`rounded-xl p-5 border transition-all ${
              ach.unlocked 
                ? 'bg-[#1A1A1A] border-[#E8750A]/20 hover:border-[#E8750A]/40' 
                : 'bg-[#0A0A0A] border-white/5 opacity-70 grayscale'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                ach.unlocked ? 'bg-gradient-to-br from-[#E8750A]/20 to-[#F59E0B]/10 text-[#E8750A]' : 'bg-white/5 text-gray-500'
              }`}>
                <ach.icon size={24} />
              </div>
              <div className="flex items-center gap-1 bg-[#111111] px-2.5 py-1 rounded-full border border-white/5">
                <Sparkles size={12} className={ach.unlocked ? "text-[#F59E0B]" : "text-gray-600"} />
                <span className={`text-xs font-bold ${ach.unlocked ? "text-cornsilk" : "text-gray-500"}`}>{ach.points}</span>
              </div>
            </div>
            
            <h4 className={`text-base font-semibold mb-1 flex items-center gap-2 ${ach.unlocked ? 'text-cornsilk' : 'text-gray-400'}`}>
              {ach.title}
              {!ach.unlocked && <Lock size={12} className="text-gray-600" />}
            </h4>
            <p className="text-sm text-gray-500 mb-4 h-10">{ach.description}</p>
            
            {!ach.unlocked && ach.progress !== undefined && ach.total !== undefined ? (
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">
                  <span>Progress</span>
                  <span>{ach.progress} / {ach.total}</span>
                </div>
                <div className="h-1.5 w-full bg-[#111111] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gray-600 rounded-full"
                    style={{ width: `${(ach.progress / ach.total) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="h-[21px]" /> /* Spacer */
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
