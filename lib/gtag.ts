// GA4 Event Tracking Utility
// Bu dosya, GA4 anahtar etkinlikleri (key events) koddan tetiklemek için kullanılır.
// GA4 panelinde bu event'leri "Anahtar Etkinlik" olarak işaretlemeyi unutma.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// gtag fonksiyonunu global window'dan çağır
export const gtagEvent = (
  action: string,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', action, params);
  }
};

// ——— Anahtar Etkinlikler (Key Events) ———

/** İletişim formu başarıyla gönderildiğinde */
export const trackContactFormSubmit = (email: string, company?: string) => {
  gtagEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
    company: company || 'N/A',
    // email'i hash'siz göndermiyoruz, sadece var/yok bilgisi
    has_email: true,
  });
};

/** Newsletter'a abone olunduğunda */
export const trackNewsletterSubscribe = () => {
  gtagEvent('newsletter_subscribe', {
    event_category: 'engagement',
    event_label: 'newsletter',
  });
};

/** CTA butonuna tıklandığında */
export const trackCTAClick = (ctaLocation: string, ctaText?: string) => {
  gtagEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaLocation,
    cta_text: ctaText || '',
  });
};

/** Hizmet sayfası CTA tıklaması */
export const trackServiceCTAClick = (serviceName: string) => {
  gtagEvent('service_cta_click', {
    event_category: 'engagement',
    event_label: serviceName,
  });
};
