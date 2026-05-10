"use client";

import { motion } from "framer-motion";
import { Check, Zap, Rocket, Building2, Sparkles, ArrowRight, Shield, Globe, Cpu, BarChart3, Users, Crown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";

const smartTiers = [
  {
    name: "Starter",
    price: { monthly: 19, annual: 15 },
    description: "Perfect for small sellers starting their journey.",
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    features: [
      "50 Research Queries / mo",
      "Basic Smart Research",
      "Google Trends Integration",
      "n8n Search Context",
      "Magic Cards Analysis",
      "Trend Lifespan Analysis",
      "Community Support"
    ],
    cta: "Start Deployment",
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/20",
    glowColor: "#f97316"
  },
  {
    name: "Growth",
    price: { monthly: 59, annual: 47 },
    description: "The complete tactical OS for scaling revenue.",
    icon: <Rocket className="h-6 w-6 text-amber-400" />,
    popular: true,
    features: [
      "200 Research Queries / mo",
      "Everything in Starter",
      "💀 Failure Mode Analysis",
      "🧬 Saturation & Clone Risk",
      "💰 Profit Reality Check",
      "🔗 Semantic Supplier Match",
      "Marketplace Spy (Etsy/eBay/Amazon)",
      "Priority AI Queue"
    ],
    cta: "Scale Operations",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
    glowColor: "#f59e0b"
  },
  {
    name: "Pro / Agency",
    price: { monthly: 129, annual: 103 },
    description: "Unlimited power for high-volume operatives.",
    icon: <Building2 className="h-6 w-6 text-purple-400" />,
    features: [
      "Unlimited Research Queries",
      "Everything in Growth",
      "API Access (Early Beta)",
      "Multi-User Team Access",
      "Model Rotation Guarantee",
      "Dedicated Strategist",
      "Early Feature Access"
    ],
    cta: "Enter Enterprise",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/20",
    glowColor: "#a855f7"
  }
];

const etsyTiers = [
  {
    name: "Starter",
    price: { monthly: 9, annual: 7 },
    description: "Quick entry into Etsy market dominance.",
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    features: [
      "200 Sniper Queries / mo",
      "Basic Analysis (Trend/Magic)",
      "Trend Lifespan Insights",
      "Quick Idea Discovery",
      "Basic SEO Tips",
      "Community Support"
    ],
    cta: "Deploy Sniper",
    color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/20",
    glowColor: "#f97316"
  },
  {
    name: "Growth",
    price: { monthly: 39, annual: 31 },
    description: "Deep tactical intelligence for high-value niches.",
    icon: <Rocket className="h-6 w-6 text-amber-400" />,
    popular: true,
    features: [
      "40 Deep Queries / mo",
      "Everything in Starter",
      "💀 Failure Mode Analysis",
      "🧬 Saturation Risk Engine",
      "💰 Profit Reality Check",
      "🔗 Supplier Matching",
      "Competitor Links",
      "Conversion Funnel Analysis"
    ],
    cta: "Master Market",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
    glowColor: "#f59e0b"
  },
  {
    name: "Pro / Agency",
    price: { monthly: 99, annual: 79 },
    description: "The ultimate weapon for Etsy power sellers.",
    icon: <Building2 className="h-6 w-6 text-purple-400" />,
    features: [
      "Unlimited Sniper Queries",
      "Everything in Growth",
      "API Integration",
      "Multi-User Access",
      "Priority Model Rotation",
      "Strategic Model Guarantee",
      "Early Access Beta"
    ],
    cta: "Go Unlimited",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/20",
    glowColor: "#a855f7"
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [productType, setProductType] = useState<"smart" | "etsy">("smart");

  const tiers = productType === "smart" ? smartTiers : etsyTiers;

  return (
    <div className="bg-[#050810] min-h-screen text-white selection:bg-orange-500/30 relative overflow-hidden pb-24">
      {/* Background HUD elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Shield className="w-3 h-3" />
            Mission Critical Economics
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            SELECT YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600">COMMAND LEVEL</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg font-medium"
          >
            Scale your market dominance with tiered intelligence protocols. 
            Save 20% on annual deployment.
          </motion.p>

          {/* Product Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex justify-center mb-10"
          >
            <div className="bg-white/5 border border-white/10 p-1 rounded-2xl flex gap-1 backdrop-blur-md">
              <button
                onClick={() => setProductType("smart")}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${productType === "smart" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Market Intelligence
              </button>
              <button
                onClick={() => setProductType("etsy")}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${productType === "etsy" ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Etsy Sniper
              </button>
            </div>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            <span className={`text-sm font-bold uppercase tracking-widest ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-white/5 border border-white/10 rounded-full p-1 transition-all hover:border-orange-500/30"
            >
              <div className={`w-5 h-5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/20 transition-all ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold uppercase tracking-widest ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
              Annual <span className="text-orange-500 text-[10px] ml-1">(-20%)</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.4 }}
              className="relative group"
            >
              <MagicCard className={`p-8 rounded-[2.5rem] bg-[#0d111c]/60 border-white/10 flex flex-col h-full relative overflow-hidden transition-all hover:border-${tier.glowColor}/30`}>
                {tier.popular && (
                  <div className="absolute top-8 right-8">
                     <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-orange-500/40">
                       Most Active
                     </span>
                  </div>
                )}
                
                {tier.popular && <BorderBeam size={400} duration={15} colorFrom="#f97316" colorTo="#fbbf24" />}

                <div className="mb-8">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6 border ${tier.borderColor} shadow-2xl`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{tier.name}</h3>
                  <p className="text-slate-500 text-sm font-medium">{tier.description}</p>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter">${isAnnual ? tier.price.annual : tier.price.monthly}</span>
                    <span className="text-slate-500 font-bold text-sm">/mo</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">
                    {isAnnual ? `Billed $${tier.price.annual * 12} yearly` : "Billed monthly"}
                  </p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 group/feat">
                      <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feat:border-orange-500/30 transition-colors">
                        <Check className="h-3 w-3 text-orange-500" />
                      </div>
                      <span className="text-slate-400 text-sm font-medium group-hover/feat:text-slate-200 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <a href={`https://wa.me/905537065912?text=${encodeURIComponent(`Hi! I want to subscribe to the ${tier.name} plan (${productType === 'smart' ? 'Market Intelligence' : 'Etsy Sniper'}) - $${isAnnual ? tier.price.annual : tier.price.monthly}/mo`)}`} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button 
                    className={`w-full rounded-2xl py-7 font-black uppercase tracking-widest transition-all ${
                      tier.popular 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 active:scale-[0.98]' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-[0.98]'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* HUD Stats Decoration */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/5 pt-20">
          {[
            { label: "AI Decision Speed", value: "< 2.5s", icon: Cpu },
            { label: "Data Fidelity", value: "99.9%", icon: BarChart3 },
            { label: "Market Scanning", value: "Global", icon: Globe },
            { label: "Active Operatives", value: "4.2k+", icon: Users },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <stat.icon className="h-5 w-5 text-slate-700 mx-auto mb-4" />
              <p className="text-2xl font-black tracking-tighter text-white">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
