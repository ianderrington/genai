// Analytics configuration utility
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

// Google Analytics configuration
export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID, // GTM-KP3L4P7N
  ga4Id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY, // G-Z1XV3CT3SV
  enabled: isProduction && (Boolean(process.env.NEXT_PUBLIC_GTM_ID) || Boolean(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY)),
}

// Development helpers
export const devConfig = {
  logEvents: isDevelopment,
  skipTracking: isDevelopment,
} 