import HeroSection from "@/components/HeroSection";
import type { Metadata } from "next";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import HomePageSections from "@/components/HomePageSections";

export const metadata: Metadata = {
  title: "AllMySell | AI-Powered E-Commerce Intelligence Platform",
  description: "Scale your online business with AllMySell. AI-powered trend research, automated listing, multi-platform management, and professional web development services.",
};

export default function HomePage() {
  return (
    <div className="bg-[#020510] min-h-screen text-white selection:bg-orange-500/30 relative overflow-hidden">
      {/* --- CINEMATIC CYBER-SAAS BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Cyber Grid Layer */}
        <div className="absolute inset-0 animate-cyber-grid opacity-30"></div>
        
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan opacity-20"></div>
        
        {/* Neon border lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        
        {/* Floating glow orbs */}
        <div className="absolute top-[5%] right-[10%] w-[250px] h-[250px] bg-orange-500/5 blur-[100px] rounded-full animate-orb-float"></div>
        <div className="absolute top-[60%] left-[5%] w-[200px] h-[200px] bg-violet-500/5 blur-[100px] rounded-full animate-orb-float" style={{ animationDelay: '-5s' }}></div>
        
        {/* Corner HUD accents */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-orange-500/10 rounded-tl-3xl"></div>
        <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-orange-500/10 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-orange-500/10 rounded-bl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-orange-500/10 rounded-br-3xl"></div>
      </div>

      <HeroSection />
      <HomePageSections />
      <TrustBadges />
      <Testimonials />
    </div>
  );
}
