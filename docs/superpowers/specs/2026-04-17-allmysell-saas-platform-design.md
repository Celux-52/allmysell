# AllMySell SaaS Platform — Master Design Specification

**Date:** 2026-04-17  
**Status:** Approved  
**Project:** AllMySell → SaaS Platform Transformation

---

## 1. Overview

Transform AllMySell from a multi-platform e-commerce storefront into a full-featured SaaS platform that provides AI-powered product research, trend analysis, and automated listing capabilities for dropshipping entrepreneurs.

### Core Value Proposition
Users don't buy tools — they buy solutions. AllMySell will take a user from zero to first sale through data-driven insights, AI-powered recommendations, and automated workflows.

### Key Metric
> Does the user make money using this tool? If yes, they never leave.

---

## 2. Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth | Supabase Auth (full migration) | Built-in social login, email verification, secure by default, free tier supports 10K users |
| Database | Supabase PostgreSQL + Prisma ORM | Prisma for type-safe queries and migrations; Supabase for hosting and auth integration |
| AI - Analysis | Google Gemini | Generous free tier, strong multi-language support, good for trend analysis |
| AI - Content | OpenAI GPT-4o | Best-in-class text generation for product descriptions and competitive analysis |
| Payment | Deferred (Stripe planned) | Build product value first, add payment when ready |
| Frontend | Next.js 15 + React 19 + TailwindCSS 3 | Already in place, keep it |
| Deployment | Vercel | Already configured |
| Python Backend | FastAPI (future) | Wrap existing Python automation bots for web access |

---

## 3. Implementation Phases

### Phase 1: Supabase Auth Migration
- Install @supabase/supabase-js and @supabase/ssr
- Create Supabase client utilities
- Migrate login/register/logout to Supabase Auth
- Add Google and GitHub social login
- Email verification via Supabase
- Middleware for session management and route protection
- Role-based access (admin vs user)
- Migrate existing users

### Phase 2: Database Schema Expansion
- profiles table linked to auth.users
- blog_posts, saved_products, search_history, digital_products tables
- Subscription status tracking

### Phase 3: Admin Panel & CMS
- Admin dashboard with stats
- User management (list, detail, ban)
- Blog CRUD with rich text editor
- Digital product management

### Phase 4: SaaS Dashboard
- Redesigned user dashboard with sidebar navigation
- AI-powered product search
- Trend analysis views
- Saved products workspace
- Search history

### Phase 5: AI Integration (OpenAI + Gemini)
- OpenAI: product descriptions, competitive analysis
- Gemini: trend analysis, multi-language, problem-solution engine
- API endpoints for all AI features

### Phase 6: Python Automation → Web API
- FastAPI wrapper for Python bots
- Dashboard bot control (start/stop/schedule)
- Results stored in Supabase

### Phase 7: Gamification & Onboarding
- Achievement/badge system
- Progress tracking
- Educational mini-modules
- Weekly trend reports

---

## 4. Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://cadmemzncpvbarvgklsa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from dashboard>
SUPABASE_SERVICE_ROLE_KEY=<from dashboard>
DATABASE_URL=postgresql://...
OPENAI_API_KEY=<your key>
GOOGLE_GEMINI_API_KEY=<your key>
RESEND_API_KEY=<existing>
NEXT_PUBLIC_APP_URL=https://allmysell.com
```
