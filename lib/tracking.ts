export const GA_TRACKING_ID = 'G-C505L0F3B8';
// export const GADS_CONVERSION_ID = 'AW-XXXXXXXXXX'; // İlerde eklenecek

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
  gtag: (...args: any[]) => void;
};

// --- STANDARD EVENTS ---

export const pageView = (url: string) => {
  if (typeof window !== 'undefined') {
    const win = window as unknown as WindowWithDataLayer;
    if (win.gtag) {
      win.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
      // Optionally sync with Ads when added
      // win.gtag('config', GADS_CONVERSION_ID, {
      //   page_path: url,
      // });
    }
  }
};

export const trackEvent = (eventName: string, payload: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    const win = window as unknown as WindowWithDataLayer;
    if (win.gtag) {
      win.gtag('event', eventName, payload);
    }
  }
};

export const trackButtonClick = (buttonId: string, metadata: Record<string, any> = {}) => {
  trackEvent('button_click', {
    button_id: buttonId,
    ...metadata,
  });
};

export const trackConversion = (value: number, currency: string = 'USD', transactionId?: string, items: any[] = []) => {
  const payload: any = { value, currency };
  if (transactionId) payload.transaction_id = transactionId;
  if (items.length > 0) payload.items = items;

  trackEvent('conversion', payload);
};

// --- FUNNEL TRACKING ---

export const trackFunnelStep = (stepName: 'landing_page' | 'product_view' | 'add_to_cart' | 'purchase', payload: Record<string, any> = {}) => {
  const funnelSteps = ['landing_page', 'product_view', 'add_to_cart', 'purchase'];
  const stepIndex = funnelSteps.indexOf(stepName) + 1;

  trackEvent('funnel_step', {
    step_name: stepName,
    step_index: stepIndex,
    ...payload,
  });

  const semanticMap: Record<string, string> = {
    product_view: 'view_item',
    add_to_cart: 'add_to_cart',
    purchase: 'purchase',
  };

  if (semanticMap[stepName]) {
    trackEvent(semanticMap[stepName], payload);
  }
};
