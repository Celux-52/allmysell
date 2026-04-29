# AllMySell - AI-Powered E-Commerce Automation Platform & Web Solutions

AllMySell is a centralized SaaS platform and professional web development service designed to help entrepreneurs scale their online businesses through AI-driven market intelligence, cross-platform automation, and premium digital infrastructure.

## 🚀 Features

- **Multi-AI Consensus Engine**: Aggregates data from 5 premium AI models (Groq Llama 3.3, Gemini 2.0 Flash, DeepSeek R1, Qwen 3, Claude 3.5 Haiku) for highly accurate product trend analysis.
- **Real-Time Data Integration**: Cross-references AI insights with live Google Trends data and real supplier API feeds.
- **Role-Based Admin Panel**: Secure, email-whitelisted administration dashboard for managing users and automations.
- **Web Development Services**: Three tiers of professional Next.js/React web development packages for e-commerce brands.
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, Tailwind CSS, Supabase (PostgreSQL & Auth), and Framer Motion.

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Platform Architecture

- **Public Site**: Introduces the SaaS platform, AI capabilities, and Web Development service plans.
- **SaaS Panel (`/dashboard`)**: Protected route for authenticated users to access AI Research and market analytics.
- **Admin Panel (`/admin`)**: Highly restricted zone for system administrators to manage n8n automations, view user metrics, and oversee the platform.

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL, OAuth)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Automations**: n8n Webhooks

## 🔒 Security

- The platform implements strict middleware protection for all `/admin` routes.
- Only explicitly whitelisted email addresses (managed via environment variables) can access administrative functions.
- All user data and search history are securely stored in a Supabase PostgreSQL instance.

## 📄 License

© 2026 AllMySell. All rights reserved.
