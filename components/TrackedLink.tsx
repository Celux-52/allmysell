'use client';

import React, { AnchorHTMLAttributes } from 'react';
import { trackButtonClick, trackFunnelStep, trackEvent } from '@/lib/tracking';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  buttonId?: string;
  eventName?: string;
  funnelStep?: 'landing_page' | 'product_view' | 'add_to_cart' | 'purchase';
  payload?: Record<string, any>;
}

export default function TrackedLink({
  buttonId,
  eventName,
  funnelStep,
  payload = {},
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Standart Buton/Link Tıklaması
    if (buttonId) {
      trackButtonClick(buttonId, payload);
    }
    
    // 2. Özel Event
    if (eventName) {
      trackEvent(eventName, payload);
    }
    
    // 3. Funnel Event
    if (funnelStep) {
      trackFunnelStep(funnelStep, payload);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
