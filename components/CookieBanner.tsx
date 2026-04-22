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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#FAFAF9]/95 backdrop-blur-sm border-t border-[#E8750A]/20 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Content */}
          <div className="flex items-start space-x-4 flex-1">
            <Cookie className="w-8 h-8 text-stone-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-stone-900 font-semibold text-lg mb-1">
                We use cookies
              </h3>
              <p className="text-stone-500 text-sm">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                {' '}
                <Link href="/privacy-policy" className="text-stone-800 hover:text-stone-500 underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-6 py-2 text-stone-500 hover:text-stone-900 transition-colors font-medium"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-stone-900 !text-white hover:bg-stone-800 text-stone-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-stone-200/50 transition-all"
            >
              Accept All
            </button>
            <button
              onClick={declineCookies}
              className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
