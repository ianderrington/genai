'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/lib/analytics-config'

interface AnalyticsProps {
  gtmId?: string
  ga4Id?: string
}

export function Analytics({ gtmId, ga4Id }: AnalyticsProps) {
  // Use props or fall back to config
  const finalGtmId = gtmId || analyticsConfig.gtmId
  const finalGa4Id = ga4Id || analyticsConfig.ga4Id

  if (!analyticsConfig.enabled && !gtmId && !ga4Id) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager */}
      {finalGtmId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${finalGtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${finalGtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 - Direct gtag.js implementation */}
      {finalGa4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${finalGa4Id}`}
            strategy="afterInteractive"
            async
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${finalGa4Id}');
              `,
            }}
          />
        </>
      )}
    </>
  )
}

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  } else if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

// Helper function to track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', window.GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
    })
  }
}

// TypeScript declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
    GA_TRACKING_ID: string
  }
} 