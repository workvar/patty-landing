/**
 * Google Analytics event tracking utility
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackWaitlistSuccess = (userNumber?: number) => {
  trackEvent('waitlist_join_success', {
    event_category: 'Waitlist',
    event_label: 'Join Success',
    value: userNumber || 0,
    user_number: userNumber,
  });
};

export const trackWaitlistFailure = (errorMessage: string, statusCode?: number) => {
  trackEvent('waitlist_join_failure', {
    event_category: 'Waitlist',
    event_label: 'Join Failure',
    error_message: errorMessage,
    status_code: statusCode,
  });
};

