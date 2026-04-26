import { Shield, Lock, CheckCircle, Award } from 'lucide-react';

const badges = [
  { icon: Lock, title: 'Secure Payment', sub: 'SSL Encrypted', gradient: 'from-orange-500 to-amber-500' },
  { icon: Shield, title: 'Buyer Protection', sub: '100% Protected', gradient: 'from-blue-500 to-cyan-500' },
  { icon: CheckCircle, title: 'Verified Seller', sub: 'Trusted Store', gradient: 'from-green-500 to-emerald-500' },
  { icon: Award, title: 'Quality Guarantee', sub: '30 Days Return', gradient: 'from-purple-500 to-pink-500' },
];

export default function TrustBadges() {
  return (
    <div className="relative py-12 border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/30 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <badge.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-white text-sm md:text-base">{badge.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{badge.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
