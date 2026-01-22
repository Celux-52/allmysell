'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <Mail className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with AllMySell
          </h2>
          <p className="text-purple-100 text-lg">
            Be the first to know when our Amazon, Etsy, Shopify, and TikTok Shop stores go live! 
            Get exclusive deals and new product announcements.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center space-x-3 animate-fade-in">
            <CheckCircle className="w-8 h-8 text-white" />
            <span className="text-white text-lg font-semibold">
              Thank you! You've successfully subscribed to our newsletter.
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
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </div>
            <p className="text-purple-100 text-sm mt-4">
              🎁 Subscribe now and get 10% off your first purchase!
            </p>
          </form>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Exclusive Deals</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>New Store Alerts</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No Spam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
