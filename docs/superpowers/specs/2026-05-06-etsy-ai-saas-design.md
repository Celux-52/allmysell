# Etsy AI SaaS Panel - Master Design Spec

## 1. Executive Summary
This project aims to build an "Etsy AI SaaS Panel" within the existing AllMySell platform. The core value proposition is to move beyond simple data presentation and act as a "Decision Engine" for solopreneurs. It will analyze Etsy products and definitively state whether a user should "SELL" or "AVOID" a niche, complete with reasoning, supplier recommendations, and AI-generated listings.

## 2. Architecture & Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes, Supabase (PostgreSQL + Auth)
- **AI Engine:** OpenAI / Claude (or Gemini) for analysis and generation
- **Automation/Data Fetching:** Next.js Server Actions / API Routes (with optional n8n for background jobs)

## 3. Sub-Projects (Execution Order)

### Phase 1: Data & Brain (Core Engine)
- **Module 1: Etsy Product Research (API)**
  - Input: Keyword from user.
  - Action: Fetch top listings (title, price, favorites, reviews, tags) via Etsy API.
- **Module 2: AI Analysis & Decision Engine**
  - Action: Process fetched data through AI prompt.
  - Output: Trend Score, Competition Level, "SELL/AVOID" decision, and a short summary based on Etsy's "handmade/emotional" context.

### Phase 2: Operations (Supplier & Listing)
- **Module 3: Supplier AI Agent**
  - Action: Recommend sourcing method (POD, AliExpress, Private Label) based on the analyzed product.
  - Output: Sourcing link/strategy and risk analysis.
- **Module 4: AI Listing Generator**
  - Action: Generate SEO-optimized title, emotional description, tags, and suggested pricing.

### Phase 3: UI & Dashboard
- **Module 5: The Cockpit**
  - Action: Build the frontend interfaces to input keywords, view loading states, and display the final "SELL/AVOID" card with beautiful, premium aesthetics.

## 4. Database Schema (Supabase)
- `etsy_products`: id, keyword, raw_data (jsonb), created_at
- `etsy_analyses`: id, product_id, trend_score, competition_level, decision, summary, created_at
- `etsy_suppliers`: id, product_id, source_type, risk_level, recommended_price
- `etsy_listings`: id, product_id, title, description, tags, created_at

## 5. Open Questions for Implementation
- Etsy API credentials (or fallback scraping method)
- Preferred AI model for the MVP
- Webhook vs direct API route decision for data fetching
