'use client';

import { FloatingShareButton, type FloatingShareButtonProps } from '@supernal/docs-kit/components';
import { trackShare } from '@/lib/trackShare';

/**
 * Thin client wrapper so Server Component pages (which can't pass a function
 * prop like onShare across the server/client boundary) can still get
 * PostHog-tracked share clicks. Forwards every prop to FloatingShareButton
 * unchanged, plus the trackShare callback.
 */
export default function TrackedFloatingShareButton(props: FloatingShareButtonProps) {
  return <FloatingShareButton {...props} onShare={trackShare} />;
}
