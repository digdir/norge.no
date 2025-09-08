// deno-lint-ignore-file no-window
import {posthog} from './setup.ts';

interface EventProps {
  eventName: string;
  customProperties?: any;
}

/**
 * A generic and modular function to track events in PostHog.
 * It automatically enriches events with default properties.
 *
 * @param {string} eventName - The name of the event to track.
 * @param {object} [customProperties={}] - An optional object of custom properties to include with the event.
 */
export const trackEvent = ({eventName, customProperties = {}}: EventProps) => {
  // 1. Safety Check: Ensure PostHog is available before trying to use it.
  if (!posthog) {
    console.warn('PostHog not initialized. Event tracking is disabled.');
    return;
  }

  // 2. Define Default Properties: These will be added to EVERY event.
  const defaultProperties = {
    page_url: window.location.href,
    page_path: window.location.pathname,
    // You could add more context like screen size, user language, etc.
  };

  // 3. Merge default and custom properties.
  // Custom properties will overwrite defaults if they have the same key.
  const finalProperties = {
    ...defaultProperties,
    ...customProperties,
  };

  // 4. Call PostHog Capture: Send the final, enriched event data.
  posthog.capture(eventName, finalProperties);
};
