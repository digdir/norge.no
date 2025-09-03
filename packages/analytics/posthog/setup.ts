import posthogjs from 'posthog-js/dist/module.no-external';
import type {PostHog, ConfigDefaults} from 'posthog-js';
import {getCookieConsent} from './consent.ts';

interface PostHogConfig {
  POSTHOG_API_KEY: string;
  POSTHOG_API_HOST: string;
  POSTHOG_DEFAULTS?: ConfigDefaults;
}

export const posthog = posthogjs as unknown as PostHog;

// Initialize PostHog with your project settings
export const initPostHog = (config: PostHogConfig) => {
  if (!config.POSTHOG_API_KEY || !config.POSTHOG_API_HOST) {
    console.warn(
      'PostHog API key or host is missing. Analytics will not be initialized.'
    );
    return;
  }

  const initialConsent = getCookieConsent();

  posthog.init(config.POSTHOG_API_KEY, {
    // debug: true,
    api_host: config.POSTHOG_API_HOST,
    defaults: config.POSTHOG_DEFAULTS,
    autocapture: false,
    // Set persistence based on existing consent
    persistence: initialConsent === 'yes' ? 'localStorage' : 'memory',
    opt_out_capturing_persistence_type: 'localStorage',
    opt_out_capturing_by_default: true,
    // mask all inputs by default
    maskAllInputs: true,
    maskTextSelector: '*',
    maskTextFn: (text, element) => {
      // only elements with `data-capture="true"` will be captured
      if (element?.dataset['capture'] === 'true') {
        return text;
      }
      return '*'.repeat(text.trim().length);
    },
    // Mask all element attributes and personal data properties by default
    mask_all_element_attributes: true,
    mask_all_text: true,
    mask_personal_data_properties: true,
    cookie_expiration: 30,
    cross_subdomain_cookie: false,
    disable_compression: true,
    disable_external_dependency_loading: true,
    disable_session_recording: true,
    opt_out_persistence_by_default: true,
    respect_dnt: true,
    secure_cookie: true,
    save_campaign_params: false,
  });

  // If consent was already given, make sure capturing is enabled.
  if (initialConsent === 'yes') {
    posthog.opt_in_capturing();
  }
};
