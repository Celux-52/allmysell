import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import HeroSection from "@/components/HeroSection";
import type { Metadata } from "next";
import { ArrowRight, BarChart3, Globe, LineChart, Cpu, LayoutDashboard, ShoppingCart, Users, Zap } from "lucide-react";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "AllMySell SaaS | E-Commerce Automation Platform",
  description: "Scale your e-commerce business with AI-powered trend research, automated listing, and cross-platform management.",
};

const saasFeatures = [
  {
    title: "AI Trend Research",
    description: "Automatically find winning products across Etsy, eBay, and Shopify with real-time data analysis.",
    icon: <BarChart3 className="h-6 w-6 text-orange-400" />,
  },
  {
    title: "Automated Listing",
    description: "Generate high-converting titles, descriptions, and tags instantly using advanced LLMs.",
    icon: <Zap className="h-6 w-6 text-amber-400" />,
  },
  {
    title: "Market Intelligence",
    description: "Monitor competitors, track prices, and predict trends before they become mainstream.",
    icon: <LineChart className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Cross-Platform Sync",
    description: "Manage inventory and orders seamlessly across all your marketplaces from one dashboard.",
    icon: <Globe className="h-6 w-6 text-amber-500" />,
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#030712] min-h-screen text-white selection:bg-orange-500/30">
      <HeroSection />

      {/* SaaS Dashboard Preview Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Command Center for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Modern Sellers</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to scale your e-commerce operations, packed into one beautiful, lightning-fast interface.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm">
            <BorderBeam size={250} duration={12} delay={9} colorFrom="#f97316" colorTo="#f59e0b" />
            <div className="relative rounded-lg overflow-hidden border border-white/5 bg-slate-950">
              {/* Mock Dashboard UI */}
              <div className="flex h-[400px] sm:h-[600px] flex-col">
                <div className="flex items-center gap-4 border-b border-white/5 p-4 bg-slate-900/50">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                      <LayoutDashboard className="h-3 w-3" />
                      app.allmysell.com
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  {/* Sidebar */}
                  <div className="hidden sm:flex w-48 flex-col gap-2 border-r border-white/5 p-4 bg-slate-900/20">
                    {[
                      { icon: LayoutDashboard, label: "Overview", active: true },
                      { icon: BarChart3, label: "Analytics" },
                      { icon: ShoppingCart, label: "Products" },
                      { icon: Users, label: "Customers" },
                      { icon: Cpu, label: "Automations" },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${item.active ? 'bg-orange-500/10 text-orange-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 p-6 sm:p-8 bg-slate-950/50">
                    <div className="mb-6 h-8 w-48 rounded bg-white/5" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                          <div className="h-4 w-20 rounded bg-white/10" />
                          <div className="h-6 w-12 rounded bg-orange-500/20" />
                        </div>
                      ))}
                    </div>
                    <div className="h-48 rounded-xl bg-white/5 border border-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Magic Cards */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Unfair <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Advantage</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built by sellers, for sellers. Our toolkit is designed to automate the heavy lifting so you can focus on strategy and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {saasFeatures.map((feature, idx) => (
              <MagicCard key={idx} className="p-8">
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to scale your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">E-Commerce Empire?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join AllMySell today and transform your manual processes into an automated revenue machine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
