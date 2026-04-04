'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';
import { pageView, trackEvent } from '@/lib/tracking';

const GA_TRACKING_ID = 'G-C505L0F3B8';
// const GADS_CONVERSION_ID = 'AW-XXXXXXX'; // Ads kodunu alınca buraya ekleyeceğiz

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackedScrolls = useRef(new Set<number>());

  // Scroll Tracking
  useEffect(() => {
    let inThrottle: boolean;
    const handleScroll = () => {
      if (inThrottle) return;
      inThrottle = true;
      
      setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollHeight <= clientHeight) return;

        const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
        const thresholds = [25, 50, 75, 90, 100];
        
        thresholds.forEach((threshold) => {
          if (scrollPercent >= threshold && !trackedScrolls.current.has(threshold)) {
            trackedScrolls.current.add(threshold);
            trackEvent('scroll_depth', { percent: threshold });
          }
        });
        inThrottle = false;
      }, 500); // 500ms throttle
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route Change Tracking
  useEffect(() => {
    if (pathname) {
      trackedScrolls.current.clear(); // Reset scrolls on page change
      let url = pathname;
      if (searchParams && searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
      pageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // GA4 Initial Config
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });

          `,
        }}
      />
    </>
  );
}
