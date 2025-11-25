import { 
  recordAnalyticsEvent, 
  startAnalyticsSession, 
  endAnalyticsSession 
} from './api';

let sessionStartTime = null;

export function useAnalytics() {
  const startSession = () => {
    sessionStartTime = Date.now();
    startAnalyticsSession();
  };

  const endSession = () => {
    if (sessionStartTime) {
      const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
      endAnalyticsSession(duration);
      sessionStartTime = null;
    }
  };

  const trackPageView = (page) => {
    recordAnalyticsEvent(page, 'page_view');
  };

  const trackEvent = (page, eventType) => {
    recordAnalyticsEvent(page, eventType);
  };

  return {
    startSession,
    endSession,
    trackPageView,
    trackEvent
  };
}