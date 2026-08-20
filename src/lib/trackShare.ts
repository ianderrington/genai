import posthog from 'posthog-js';

/**
 * Wired as the `onShare` callback on every @supernal/docs-kit share component
 * (SocialShare, FloatingShareButton, ShareButton). Fires a PostHog 'share_click'
 * event for every real share action: a platform link click, copy-link, or
 * share-to-all. posthog.capture() is a safe no-op when PostHogProvider hasn't
 * initialized the client (e.g. under `next dev`, per the isProduction gate).
 */
export function trackShare(event: { platform: string; url: string; title: string }): void {
  posthog.capture('share_click', event);
}
