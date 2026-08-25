/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during builds (ajv version conflict with eslint-config-next)
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  // /api/feed, /api/posts, /api/blog/posts, and /api/blog/tags all read
  // docs/ dynamically at request time (fs.readdir/readFile, not a static
  // import), so Next's automatic file-tracing for serverless functions
  // doesn't detect the dependency and docs/ never ships into those
  // functions' bundles on Vercel - confirmed live: all 4 return an empty
  // result in production (200 OK, zero items) while the page routes that
  // read the exact same content render correctly, since page-level tracing
  // does pick it up. Explicitly including docs/ here fixes all 4 routes at
  // once rather than one config key per route.
  outputFileTracingIncludes: {
    "/api/**/*": ["./docs/**/*"],
  },
  // Configure webpack for better development experience
  webpack: (config, { dev, isServer }) => {
    // Keep proper error logging during development
    if (dev) {
      config.infrastructureLogging = {
        level: "warn",
      };
    }

    // Hoist shared deps from docs-kit to top-level install to avoid nested resolution errors
    config.resolve.alias = {
      ...config.resolve.alias,
      "gray-matter": new URL(
        "./node_modules/gray-matter/index.js",
        import.meta.url,
      ).pathname,
    };

    // Fix for mermaid module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
  // Ensure Fast Refresh is enabled
  reactStrictMode: true,
  // Increase the timeout for static generation
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
