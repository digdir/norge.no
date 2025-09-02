import {initPostHog, handleConsent} from '@packages/analytics/posthog';

// This function will be called from the Astro component
function initializePostHog() {
  // The env vars are passed via a global object from the component
  const posthogConfig = (window as any).POSTHOG_CONFIG;

  if (posthogConfig && posthogConfig.POSTHOG_API_KEY) {
    initPostHog({
      POSTHOG_API_KEY: posthogConfig.POSTHOG_API_KEY,
      POSTHOG_API_HOST: posthogConfig.POSTHOG_API_HOST,
      POSTHOG_DEFAULTS: posthogConfig.POSTHOG_DEFAULTS,
    });
  }

  // Show cookie banner if consent not given
  const existingConsent = localStorage.getItem('cookie_consent');
  const banner = document.getElementById('cookie-banner');

  if (!existingConsent && banner) {
    banner.style.display = 'block';
  }

  // Handle consent buttons
  document.getElementById('accept-cookies')?.addEventListener('click', () => {
    if (banner) {
      handleConsent({consent: 'yes'});
      banner.remove();
    }
  });

  document.getElementById('decline-cookies')?.addEventListener('click', () => {
    if (banner) {
      handleConsent({consent: 'no'});
      banner.remove();
    }
  });
}

initializePostHog();
