import {posthog} from './setup.ts';

interface CookieConsent {
  consent: 'yes' | 'no';
}

export const handleConsent = ({consent}: CookieConsent) => {
  const persistenceType = consent === 'yes' ? 'localStorage' : 'memory';
  posthog.set_config({persistence: persistenceType});
  if (consent === 'yes') {
    posthog.opt_in_capturing();
  } else {
    posthog.opt_out_capturing();
  }

  // Store the user's consent choice
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cookie_consent', consent);
    } catch (e) {
      console.error('localStorage is not available.', e);
    }
  }

  console.log(
    `Cookie consent set to: ${consent}. PostHog persistence is now '${persistenceType}'`
  );
};

export const getCookieConsent = (): 'yes' | 'no' => {
  if (typeof window === 'undefined') {
    return 'no'; // Default to no consent on SSR
  }
  try {
    const consent = localStorage.getItem('cookie_consent');
    return consent === 'yes' ? 'yes' : 'no';
  } catch (e) {
    console.error('localStorage is not available.', e);
    return 'no';
  }
};
