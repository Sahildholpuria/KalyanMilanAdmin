import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import nProgress from 'nprogress';

export function useNProgress() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      nProgress.start();
    };

    const handleRouteChangeComplete = () => {
      nProgress.done();
    };

    // Listen to custom events for route changes
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  // Example of how to trigger the events when navigating
  const customNavigate = (to) => {
    // Trigger start event before navigation
    window.dispatchEvent(new Event('routeChangeStart'));

    // Simulate some async operation (e.g., fetching data)
    setTimeout(() => {
      // Navigate after async operation is done
      navigate(to);

      // Trigger complete event after navigation
      window.dispatchEvent(new Event('routeChangeComplete'));
    }, 1000);
  };

  return customNavigate;
}
