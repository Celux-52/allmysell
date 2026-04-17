import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type } = await request.json();

    if (!type) {
      return NextResponse.json({ error: 'Achievement type required' }, { status: 400 });
    }

    // In a production environment, this is where you would:
    // 1. Verify the user actually completed the action
    // 2. Fetch the corresponding achievement from DB
    // 3. Create a UserAchievement record
    // 4. Update the user's Profile.experiencePoints and Profile.level
    
    // For this build, we simulate a successful award:
    console.log(`[Gamification] Awarded '${type}' to user ${user.id}`);

    return NextResponse.json({ 
      success: true, 
      awarded: true,
      message: `Achievement '${type}' processed.` 
    });

  } catch (error) {
    console.error('Gamification Award Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
