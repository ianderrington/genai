"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { isProduction } from "@/lib/analytics-config";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || posthog.__loaded) return;
    // Matches genai's existing analytics-config.ts gate (GTM/GA4 never fire
    // under `next dev`) — without this, a developer with
    // NEXT_PUBLIC_POSTHOG_API_KEY set in .env.local would leak real local
    // dev sessions into the production PostHog project.
    if (!isProduction) return;

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;
    if (!apiKey) return;

    posthog.init(apiKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
      // 'history_change' (not `true`) is required for SPA route-change
      // tracking on App Router: posthog-js's HistoryAutocapture extension
      // only starts when capture_pageview === 'history_change' (a strict
      // string check in posthog-core). `true` only fires one pageview on
      // initial SDK load and never patches history.pushState/replaceState,
      // so every client-side <Link> navigation after the first hard load
      // would go uncaptured — genai's root layout.tsx is a Server Component
      // that never remounts on client-side navigation, so this distinction
      // is load-bearing here, not cosmetic.
      capture_pageview: "history_change",
      autocapture: false,
      loaded: () => {
        posthog.register({ site: "managen-ai" });
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
