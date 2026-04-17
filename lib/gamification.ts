import { createClient } from '@/lib/supabase/client';

export type AchievementType = 
  | 'first_search'
  | 'five_searches'
  | 'first_save'
  | 'five_saves'
  | 'first_trend';

export const gamificationEvents = {
  checkFirstSearch: async () => await checkAndAward('first_search'),
  checkFiveSearches: async () => await checkAndAward('five_searches'),
  checkFirstSave: async () => await checkAndAward('first_save'),
  checkFirstTrend: async () => await checkAndAward('first_trend'),
};

async function checkAndAward(achievementType: AchievementType) {
  // In a real implementation:
  // 1. Fetch user progress
  // 2. See if conditions are met
  // 3. Award achievement + XP
  // 4. Return true if newly unlocked
  
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Fast-path pseudo-implementation for frontend demo.
    // In production, backend API should handle the actual DB mutation.
    
    // Check local storage to prevent duplicate popups logic
    const awarded = localStorage.getItem(`ach_${user.id}_${achievementType}`);
    if (awarded) return false;

    // E.g., User performed first search
    fetch('/api/gamification/award', {
      method: 'POST',
      body: JSON.stringify({ type: achievementType })
    }).catch(console.error);

    localStorage.setItem(`ach_${user.id}_${achievementType}`, 'true');
    return true;
  } catch (err) {
    console.error('Gamification tracking error', err);
    return false;
  }
}
