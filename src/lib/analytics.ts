// Google Analytics 4 (GA4) Tracking Utility
// Handles dynamic script insertion, GDPR compliance checking, and standard event tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Read GA4 measurement ID from environment variable or fallback to a demo one
const GA_MEASUREMENT_ID = ((import.meta as any).env.VITE_GA_MEASUREMENT_ID as string) || 'G-BRETEMA123';

// Helper to check if analytics consent is active in cookie preferences
export function hasAnalyticsConsent(): boolean {
  try {
    const savedPrefs = localStorage.getItem('cookie_preferences');
    if (!savedPrefs) return false;
    const parsed = JSON.parse(savedPrefs);
    return !!parsed.analytics;
  } catch (e) {
    return false;
  }
}

let gaInitialized = false;

// Initialize GA4 script dynamically if user consented
export function initGA(): void {
  if (gaInitialized) return;
  if (!hasAnalyticsConsent()) {
    console.log('[Analytics] GA4 not loaded: Missing user consent in Cookie preferences.');
    return;
  }

  try {
    console.log(`[Analytics] Initializing GA4 with ID: ${GA_MEASUREMENT_ID}`);
    
    // Create Gtag script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize global dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    
    // Set cookie consent flags in GA4 for absolute legal compliance (Consent Mode v2)
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'granted',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    // Configure GA4 tracking
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We will handle page views manually to support SPA transitions
      cookie_flags: 'SameSite=None;Secure'
    });

    gaInitialized = true;
    
    // Trigger initial page view
    trackPageView(window.location.pathname + window.location.hash);
  } catch (error) {
    console.error('[Analytics] Error loading GA4 script:', error);
  }
}

// Track a custom event
export function trackEvent(name: string, params: object = {}): void {
  const consented = hasAnalyticsConsent();
  
  // Console logging in development or if GA is not fully initialized
  console.log(`[Analytics Event] ${name}:`, params, consented ? '(Consented)' : '(No Consent - Simulation Mode)');

  if (consented && window.gtag) {
    try {
      window.gtag('event', name, params);
    } catch (e) {
      console.error('[Analytics] Event tracking error:', e);
    }
  }
}

// Track Page Views (SPA route/hash changes)
export function trackPageView(path: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href
  });
}

// Track Contact clicks and submissions
export function trackContactClick(action: 'click' | 'submit', details: { form_name: string; name?: string; email?: string; plan?: string }): void {
  trackEvent('contact_action', {
    action,
    ...details
  });
}

// Track Subscription/Pricing Plan clicks
export function trackSubscriptionClick(planName: string, price: string, isCustom: boolean = false): void {
  trackEvent('select_promotion', {
    promotion_id: planName.toLowerCase().replace(/\s+/g, '_'),
    promotion_name: planName,
    creative_name: isCustom ? 'Custom Plan Card' : 'Standard Pricing Card',
    price: price,
    currency: 'EUR'
  });
}

// Active session duration tracker
export function setupTimeOnPageTracker(): () => void {
  let seconds = 0;
  const loggedIntervals = new Set<number>();
  
  const timer = setInterval(() => {
    seconds += 1;
    
    // Report user engagement milestones to GA4 (10s, 30s, 60s, 120s, 300s, 600s)
    const milestones = [10, 30, 60, 120, 300, 600];
    for (const milestone of milestones) {
      if (seconds >= milestone && !loggedIntervals.has(milestone)) {
        loggedIntervals.add(milestone);
        trackEvent('time_on_page_milestone', {
          seconds_spent: milestone,
          formatted_time: `${milestone}s`
        });
      }
    }
  }, 1000);

  // Return cleanup function
  return () => {
    clearInterval(timer);
  };
}
