'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-amber-500/5 to-orange-600/10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay <span className="gradient-text">Updated</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Be the first to know when our Amazon, Etsy, Shopify, and TikTok Shop stores go live! 
            Get exclusive deals and new product announcements.
          </p>
        </div>

        {status === 'success' ? (
          <div className="glass-card rounded-2xl p-6 flex items-center justify-center space-x-3 animate-scale-in max-w-xl mx-auto">
            <CheckCircle className="w-7 h-7 text-green-400" />
            <span className="text-white text-lg font-medium">
              Thank you! You&apos;ve successfully subscribed.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-xl glass-input text-white placeholder-slate-500 text-base"
              />
              <button
                type="submit"
                className="btn-primary px-8 py-4 text-base whitespace-nowrap"
              >
                <span>Subscribe</span>
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-4">
              🎁 Subscribe now and get 10% off your first purchase!
            </p>
          </form>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
          {['Exclusive Deals', 'New Store Alerts', 'No Spam'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
