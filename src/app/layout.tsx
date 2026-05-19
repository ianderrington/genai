// src/app/layout.tsx
import "./globals.css";
import "katex/dist/katex.min.css";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { getCachedSections } from "@/lib/content";
import { getRootPagesConfig } from "@/lib/content/pages-config";
import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Analytics } from "@/components/Analytics";
import { loadSiteConfig } from "@/lib/server/config";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PersonSchema, WebSiteSchema } from "@/lib/docs-kit";
// AIChat disabled - no LLM budget allocated for supernal interface chat
// import { AIChat } from '@/components/chat/AIChat';
import TTSInit from "@/components/TTSInitializer";
import LeadCapture from "@/components/LeadCapture";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": "/api/feed",
      "application/atom+xml": "/api/feed?format=atom",
      "application/json": "/api/feed?format=json",
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = await getCachedSections();
  const pagesConfig = await getRootPagesConfig();
  const config = loadSiteConfig();

  // Transform sections to match PageLayout props
  const formattedSections = sections.map((section) => ({
    id: section.id,
    title: section.name,
  }));

  // Build nav sections from .pages config.
  // The .pages nav is the authoritative source — it lists every section that should appear in the
  // top nav with optional display titles (e.g. {"Understand and build": "Understanding"}).
  // We don't require posts to have loaded yet; the href just needs the folder name.
  const orderedSections = pagesConfig?.nav
    ? pagesConfig.nav.flatMap((navItem) => {
        // Each item is either a plain string ("blog") or an object ({"Display Title": "FolderName"})
        let folderId: string; // actual directory / slug prefix
        let displayTitle: string | undefined;

        if (typeof navItem === "string") {
          folderId = navItem;
        } else if (typeof navItem === "object" && navItem !== null) {
          const entries = Object.entries(navItem as Record<string, string>);
          if (entries.length === 0) return [];
          [displayTitle, folderId] = entries[0];
        } else {
          return [];
        }

        const cleanId = folderId.replace(/\.md$/, "");

        // Try to find a matching loaded section (case-insensitive) for the display name fallback
        const matched = formattedSections.find(
          (s) =>
            s.id.toLowerCase() === cleanId.toLowerCase() ||
            s.id.replace(/\.md$/, "").toLowerCase() === cleanId.toLowerCase(),
        );

        // Prefer the exact-case folder name from .pages so hrefs work correctly with the filesystem
        const routeId = matched?.id ?? cleanId;

        // Display title: explicit from .pages > auto-capitalised from folder name
        const title =
          displayTitle ??
          matched?.title ??
          cleanId.charAt(0).toUpperCase() + cleanId.slice(1);

        return [{ id: routeId, title }];
      })
    : formattedSections;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <PersonSchema />
        <WebSiteSchema />
      </head>
      <body
        className="bg-white dark:bg-[#0a0b1a] text-gray-900 dark:text-gray-100"
        suppressHydrationWarning
      >
        <Analytics />
        <div className={inter.className}>
          <Providers>
            <PageLayout sections={orderedSections} config={config}>
              {children}
            </PageLayout>
          </Providers>
        </div>
        <TTSInit />
        <LeadCapture />
      </body>
    </html>
  );
}
