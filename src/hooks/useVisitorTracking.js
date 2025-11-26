import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { visitorTracking } from '../services/visitorTracking';

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track initial visit
    const trackInitialVisit = async () => {
      await visitorTracking.trackVisitor();
    };

    trackInitialVisit();

    // Send page views before unload
    const handleBeforeUnload = () => {
      visitorTracking.sendPageViews();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Track page view on route change
    visitorTracking.trackPageView(location.pathname);
  }, [location]);

  return null;
};
