-- ============================================
-- AllMySell SaaS Platform - Supabase SQL Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create profiles table trigger
-- This automatically creates a profile when a new user signs up via Supabase Auth

-- First, create the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role, subscription_status, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', ''),
    'USER',
    'FREE',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Then create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Create RLS (Row Level Security) policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Service role can do anything (for API routes)
CREATE POLICY "Service role has full access"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role');

-- 3. RLS policies for saved_products
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved products"
  ON public.saved_products
  FOR ALL
  USING (auth.uid() = user_id);

-- 4. RLS policies for search_history
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own search history"
  ON public.search_history
  FOR ALL
  USING (auth.uid() = user_id);

-- 5. RLS policies for blog_posts (public read, admin write)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'PUBLISHED');

CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- 6. RLS policies for digital_products (public read)
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active digital products"
  ON public.digital_products
  FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage digital products"
  ON public.digital_products
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- 7. RLS for subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- 8. RLS for achievements (public read)
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievements"
  ON public.achievements
  FOR SELECT
  USING (active = true);

-- 9. RLS for user_achievements
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

-- 10. Insert default achievements
INSERT INTO public.achievements (id, name, title, description, icon, category, points, requirement, active, created_at) VALUES
  (gen_random_uuid()::text, 'first_search', 'Explorer', 'Complete your first product search', '🔍', 'onboarding', 10, '{"type": "search_count", "value": 1}'::jsonb, true, NOW()),
  (gen_random_uuid()::text, 'five_searches', 'Researcher', 'Complete 5 product searches', '📊', 'research', 25, '{"type": "search_count", "value": 5}'::jsonb, true, NOW()),
  (gen_random_uuid()::text, 'first_save', 'Collector', 'Save your first product', '⭐', 'onboarding', 10, '{"type": "save_count", "value": 1}'::jsonb, true, NOW()),
  (gen_random_uuid()::text, 'ten_saves', 'Curator', 'Save 10 products to your workspace', '💎', 'research', 50, '{"type": "save_count", "value": 10}'::jsonb, true, NOW()),
  (gen_random_uuid()::text, 'profile_complete', 'Identity', 'Complete your profile information', '👤', 'onboarding', 15, '{"type": "profile_complete", "value": 1}'::jsonb, true, NOW()),
  (gen_random_uuid()::text, 'first_sale', 'Seller', 'Mark your first product as sold', '🏆', 'sales', 100, '{"type": "sale_count", "value": 1}'::jsonb, true, NOW()),
  (gen_random_uuid()::text, 'week_streak', 'Dedicated', 'Use the platform 7 days in a row', '🔥', 'engagement', 75, '{"type": "login_streak", "value": 7}'::jsonb, true, NOW())
ON CONFLICT (name) DO NOTHING;

-- 11. Create index on auth.users email for faster lookups
-- (This is usually already there by default in Supabase)

COMMENT ON TABLE public.profiles IS 'User profiles linked to Supabase Auth - auto-created via trigger';
COMMENT ON TABLE public.blog_posts IS 'Admin-managed blog content for CMS';
COMMENT ON TABLE public.saved_products IS 'User-saved products from AI research';
COMMENT ON TABLE public.search_history IS 'AI search queries and results for learning loop';
COMMENT ON TABLE public.digital_products IS 'SaaS packages available for subscription';
COMMENT ON TABLE public.achievements IS 'Gamification achievement definitions';
COMMENT ON TABLE public.user_achievements IS 'Earned achievements per user';
