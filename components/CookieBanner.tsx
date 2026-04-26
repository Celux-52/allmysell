'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch (e) {
      console.warn('localStorage not available', e);
      // Don't show banner if localStorage fails (e.g. strict Safari)
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted');
    } catch (e) {
      // Ignore
    }
    setShowBanner(false);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem('cookieConsent', 'declined');
    } catch (e) {
      // Ignore
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 glass-nav border-t border-white/[0.06] shadow-2xl animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <Cookie className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                We use cookies
              </h3>
              <p className="text-slate-400 text-sm">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                {' '}
                <Link href="/privacy-policy" className="text-orange-400 hover:text-orange-300 underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button onClick={declineCookies} className="px-6 py-2 text-slate-400 hover:text-white transition-colors font-medium text-sm">
              Decline
            </button>
            <button onClick={acceptCookies} className="btn-primary px-6 py-2 text-sm">
              <span>Accept All</span>
            </button>
            <button onClick={declineCookies} className="p-2 text-slate-500 hover:text-white transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
