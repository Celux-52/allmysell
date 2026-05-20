# AI Agent Customization Guide for AllMySell

This document helps AI coding agents understand AllMySell's architecture, conventions, and critical patterns to work effectively on the codebase.

## 📋 Quick Reference

| Aspect | Details |
|--------|---------|
| **Tech Stack** | Next.js 15, TypeScript, Tailwind CSS, Supabase PostgreSQL, Prisma ORM |
| **Deployment** | Vercel (10s limit) or DigitalOcean (60s limit) |
| **Key Commands** | `npm install` → `npm run dev` → `npm run build` → `npm start` |
| **Database Setup** | `prisma db push` (requires DATABASE_URL env var) |
| **Critical Pattern** | AI consensus in `lib/ai/retry.ts` (55s timeout, multi-model failover) |
| **Security Model** | Admin whitelist: `lib/isAdmin.ts` (env vars + hardcoded list) |
| **Documentation** | See [README.md](README.md), [UPDATES.md](UPDATES.md), [README_AI_SYSTEMS.md](README_AI_SYSTEMS.md) |

---

## 🏗️ Architecture Overview

### Public Platform
- **Landing Page** (`app/page.tsx`, `app/about/page.tsx`)
- **Web Solutions** (`app/web-solutions/page.tsx`) - Professional development packages
- **Pricing** (`app/pricing/page.tsx`)
- **Marketing pages** - Contact, FAQ, Terms, Privacy

### SaaS Dashboard (`/dashboard`)
**Protected routes requiring authentication**
- **research/** - AI trend research tool
- **saas/** - Etsy Sniper, eBay Sniper automation
- **saved/** - Bookmarked products
- **history/** - Search history
- **settings/** - User preferences
- **achievements/** - Gamification

### Admin Panel (`/admin`)
**Highly restricted - whitelisted emails only**
- Analytics, User management
- Bot control (n8n automation)
- Product management
- Settings & configuration
- See [lib/isAdmin.ts](lib/isAdmin.ts) for security implementation

### API Routes (`app/api/`)
```
/ai/           → AI research consensus
/research/     → Trend data & history
/etsy/         → Etsy sniper analysis, niche discovery
/ebay/         → eBay automation
/automation/   → Bot control
/auth/         → Login/register/logout
/admin/        → Admin-only endpoints
/user/         → User profile & stats
/cron/         → Scheduled tasks
/gamification/ → Achievement tracking
```

---

## 🔑 Critical Patterns & Non-Standard Conventions

### 1. AI Consensus Engine with Automatic Failover
**Location**: [lib/ai/retry.ts](lib/ai/retry.ts)

The system queries multiple AI models in parallel with automatic rotation on failure:
- **Primary model**: `google/gemini-2.0-flash-001` (speed + intelligence)
- **Per-model timeout**: 20 seconds
- **Total operation timeout**: 55 seconds (safety margin under Vercel's 10s, DigitalOcean's 60s limits)
- **Fallback cascade**: Llama 3.3 → GPT-4o-mini → DeepSeek → free tier
- **Single source of truth**: [lib/ai/models.ts](lib/ai/models.ts) defines `RESEARCH_MODELS`, `ETSY_MODELS`, etc.

**Never**: Hardcode model names, ignore timeouts, or add unbounded request chains.

### 2. Admin Security Model
**Location**: [lib/isAdmin.ts](lib/isAdmin.ts)

Admin access requires **BOTH** checks:
```typescript
1. Email in env var NEXT_PUBLIC_ADMIN_EMAILS (comma-separated)
2. Email in hardcoded fallback list (melih@allmysell.com, yunus@allmysell.com)
```

All `/admin` routes protected by middleware in [middleware.ts](middleware.ts).

**Never**: Expose hardcoded email list in logs, assume only env var is sufficient, or skip both checks.

### 3. Prisma Singleton Pattern
**Location**: [lib/prisma.ts](lib/prisma.ts)

Prevents connection leaks in serverless environment:
```typescript
const prismaClientSingleton = () => new PrismaClient({ log: ['error', 'warn'] })
export const prisma = globalThis.prisma ?? prismaClientSingleton()
```

Use this pattern for ANY PrismaClient usage. Do NOT create new instances.

### 4. Error Handling & Logging Style
All errors include context markers: `[ComponentName] Message`
```typescript
console.log('[AI] Starting consensus research...')
console.error('[Consensus] Failed after retries:', error)
console.warn('[Database] Connection timeout, retrying...')
```

This format helps debugging in production logs.

### 5. API Route Pattern (Template)
All protected API routes follow this structure:
```typescript
// 1. Extract and validate auth
const { data: { user }, error: authError } = await supabase.auth.getUser()
if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

// 2. Check admin if needed
if (!isAdmin(user.email)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// 3. Extract request body with error handling
let body
try {
  body = await request.json()
} catch {
  return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
}

// 4. Process and return
try {
  const result = await doWork(body)
  return NextResponse.json(result)
} catch (error) {
  console.error('[RouteName]', error)
  return NextResponse.json({ error: 'Internal error' }, { status: 500 })
}
```

### 6. Internationalization (i18n)
**Location**: [lib/i18n/translations.ts](lib/i18n/translations.ts)

Supports Turkish, English, Arabic. Use the `useI18n()` hook:
```typescript
const { t } = useI18n()
return <h1>{t('dashboard_title')}</h1>
```

### 7. Middleware & Route Protection
**Location**: [middleware.ts](middleware.ts)

- Unauthenticated users → `/login?redirect=/dashboard`
- Invalid Supabase session → redirect to auth
- Session refreshed on every request
- Cookies properly threaded through middleware

---

## 📦 Environment Variables (Critical)

### Required for Build
```env
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL (public)
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon key (public)
SUPABASE_SERVICE_ROLE_KEY=       # Admin operations (secret)
DATABASE_URL=                     # PostgreSQL connection (secret)
OPENROUTER_API_KEY=              # AI model access (secret)
```

### Admin Security
```env
NEXT_PUBLIC_ADMIN_EMAILS=melih@example.com,admin@example.com  # Whitelisted admins
```

### Optional with Graceful Degradation
```env
GROQ_API_KEY=                    # Falls back to OpenRouter if missing
RESEND_API_KEY=                  # Email features (logs warning if missing)
PYTHON_API_URL=http://localhost:8000  # Automation server
API_SECRET_KEY=dev_secret_key         # Defaults to this if missing
```

**Critical**: OPENROUTER_API_KEY must have $5+ balance, checked on every AI request.

---

## 🧪 Testing & Debugging

### Quick Test Commands
```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Verify production build
npm run lint         # TypeScript + ESLint checks

# Test AI endpoints (see /scratch/test-*.js files)
curl -X POST http://localhost:3000/api/ai/research \
  -H "Content-Type: application/json" \
  -d '{"query":"gaming laptop trends"}'

# Test admin setup
curl http://localhost:3000/api/admin/setup
```

### Database Testing
```bash
prisma db push              # Sync schema
prisma studio              # Visual database explorer
npx prisma migrate status  # Check migration state
```

### Python Automation (Optional)
```bash
cd python && python main.py  # Starts FastAPI on localhost:8000
```

---

## 🎯 Deployment-Specific Constraints

### Vercel (Primary)
- **Max function duration**: 10 seconds
- **System timeout**: 55 seconds total for all operations
- **Must use fast models** (Flash, Mini) to stay under limit
- **Recommended for**: Public-facing features, real-time dashboards

### DigitalOcean
- **Max function duration**: 60 seconds
- **Can use slower models** (standard, comprehensive)
- **Recommended for**: Background jobs, admin tasks, intensive analysis

---

## 📁 Key Files & Directories Reference

### Core AI Logic
- [lib/ai/retry.ts](lib/ai/retry.ts) - Failover cascade (CRITICAL)
- [lib/ai/models.ts](lib/ai/models.ts) - Model definitions (single source of truth)
- [lib/ai/consensus.ts](lib/ai/consensus.ts) - Main orchestrator
- [lib/ai/google-trends.ts](lib/ai/google-trends.ts) - Trends integration
- [lib/ai/internet-search.ts](lib/ai/internet-search.ts) - Web data fetching

### Database & ORM
- [prisma/schema.prisma](prisma/schema.prisma) - Database models
- [lib/prisma.ts](lib/prisma.ts) - Singleton pattern (use everywhere)
- [lib/supabase/server.ts](lib/supabase/server.ts) - Server-side auth

### Security & Admin
- [lib/isAdmin.ts](lib/isAdmin.ts) - Admin email checker (hardcoded + env)
- [middleware.ts](middleware.ts) - Route protection, auth refresh

### Localization
- [lib/i18n/translations.ts](lib/i18n/translations.ts) - Multi-language strings

### UI Components
- [components/](components/) - Reusable React components
- [components/ui/](components/ui/) - shadcn/ui + Radix UI primitives

---

## ✅ Agent Development Checklist

When working on this codebase:

- [ ] **AI work**: Check [lib/ai/models.ts](lib/ai/models.ts) for current model list before suggesting changes
- [ ] **Admin features**: Verify both `isAdmin()` check AND env var in implementation
- [ ] **Database changes**: Update [prisma/schema.prisma](prisma/schema.prisma) and run `prisma db push`
- [ ] **API routes**: Follow the template pattern (auth → admin check → parse → process)
- [ ] **Timeouts**: Never exceed 55 seconds total, check per-model timeout for AI calls
- [ ] **Error messages**: Include `[FeatureName]` prefix for logging
- [ ] **Environment variables**: Never hardcode secrets, always use process.env
- [ ] **Testing**: Run `npm run build` before claiming success on deployable changes
- [ ] **i18n**: Use `useI18n()` hook, add keys to [lib/i18n/translations.ts](lib/i18n/translations.ts) if needed

---

## 📚 Related Documentation

- **Project Overview**: [README.md](README.md)
- **Changelog**: [UPDATES.md](UPDATES.md)
- **Technical AI Guide**: [README_AI_SYSTEMS.md](README_AI_SYSTEMS.md) (mixed Turkish/English)
- **Project Plan**: [docs/bovende_proje_plani_v2.md](docs/bovende_proje_plani_v2.md)
- **n8n Automation**: [docs/n8n_viral_scraper_workflow_ready.json](docs/n8n_viral_scraper_workflow_ready.json)

---

## 🛠️ Tooling & Configuration

- **Package Manager**: npm (Node 18+)
- **Type Checking**: TypeScript (strict mode enabled)
- **Linting**: ESLint (must pass `npm run lint`)
- **CSS Framework**: Tailwind CSS 3 + Radix UI Nova
- **UI Icons**: Lucide React
- **Animations**: Framer Motion
- **Component Library**: shadcn/ui

---

## ❓ Common Questions

**Q: Where are all the AI models defined?**
A: [lib/ai/models.ts](lib/ai/models.ts) - this is the single source of truth. Do NOT hardcode model names elsewhere.

**Q: How do I check if a user is admin?**
A: Use `isAdmin(user.email)` from [lib/isAdmin.ts](lib/isAdmin.ts). This checks both env vars AND hardcoded list.

**Q: Why is the timeout 55 seconds?**
A: Vercel's limit is 10 seconds, but operations may take longer. 55 seconds provides safety margin under DigitalOcean's 60s limit while being fast enough for most users.

**Q: What's the Prisma singleton pattern for?**
A: Serverless environments can leak database connections. Using `globalThis.prisma` ensures only one client exists across requests.

**Q: Can I add new AI models?**
A: Yes, update [lib/ai/models.ts](lib/ai/models.ts) and test thoroughly. Verify the new model integrates with the failover cascade in [lib/ai/retry.ts](lib/ai/retry.ts).

---

**Last Updated**: May 20, 2026
**Maintained For**: AllMySell v4.0+ (AI Consensus Engine)
