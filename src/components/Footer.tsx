"use client";

import React, { forwardRef, useState } from "react";
import Link from "next/link";
import { useToast } from "../hooks/useToast";
import { SiteConfig } from "@/lib/server/config";

interface FooterProps {
  config: SiteConfig;
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ config }, ref) => {
  const { show } = useToast();
  const currentYear = new Date().getFullYear();
  const [isRssCopied, setIsRssCopied] = useState(false);

  const handleCopyFeed = async () => {
    const feedUrl = `${config.site.url}/api/feed`;
    try {
      await navigator.clipboard.writeText(feedUrl);
      setIsRssCopied(true);
      show("RSS link copied", "success");
      setTimeout(() => setIsRssCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      show("Failed to copy RSS link", "error");
    }
  };

  return (
    <footer ref={ref} className="bg-[#0a0b1a] border-t border-indigo-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-bold text-white text-lg mb-2">ManaGen AI</div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              The Living Guide to Generative AI — updated continuously as
              models, tools, and best practices evolve.
            </p>
          </div>
          {/* Nav links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Explore
            </div>
            <ul className="space-y-2">
              {[
                { href: "/Understanding", label: "Understanding" },
                { href: "/Using", label: "Using" },
                { href: "/Managenai", label: "ManaGen AI" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-indigo-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            {/* Twitter/X */}
            <a
              href={config.author.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={config.author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.27 2 2 6.27 2 12c0 4.58 2.98 8.47 7.1 9.84.52.1.71-.22.71-.49v-1.71c-2.89.63-3.51-1.39-3.51-1.39-.47-1.19-1.15-1.51-1.15-1.51-.94-.64.07-.63.07-.63 1.04.07 1.59 1.07 1.59 1.07.92 1.58 2.42 1.12 3.01.86.09-.67.36-1.12.65-1.38-2.3-.26-4.72-1.15-4.72-5.12 0-1.13.4-2.06 1.07-2.78-.11-.26-.46-1.32.1-2.75 0 0 .87-.28 2.85 1.06.83-.23 1.71-.34 2.59-.35.88 0 1.76.12 2.59.35 1.98-1.34 2.85-1.06 2.85-1.06.56 1.43.21 2.49.1 2.75.67.72 1.07 1.65 1.07 2.78 0 3.98-2.42 4.86-4.73 5.11.37.32.71.96.71 1.94v2.88c0 .27.19.59.71.49C19.02 20.47 22 16.58 22 12c0-5.73-4.27-10-10-10z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={config.author.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Bluesky */}
            <a
              href={config.author.social.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              aria-label="Bluesky"
            >
              <span className="sr-only">Bluesky</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm1.824 4.182a2.75 2.75 0 0 1 3.85 3.85l-3.943 3.943a2.75 2.75 0 0 1-3.85-3.85l3.943-3.943zm-1.762 1.762-3.293 3.293a1.25 1.25 0 1 0 1.768 1.768l3.293-3.293a1.25 1.25 0 1 0-1.768-1.768z"
                  strokeWidth="0"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Threads */}
            <a
              href={config.author.social.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-100 transition-colors"
              aria-label="Threads"
            >
              <span className="sr-only">Threads</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 192 192"
                fill="currentColor"
              >
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
              </svg>
            </a>

            {/* RSS Feed */}
            <button
              onClick={handleCopyFeed}
              className="text-gray-500 hover:text-orange-400 transition-all duration-300"
              aria-label="Copy RSS Feed URL"
            >
              <span className="sr-only">Copy RSS Feed URL</span>
              <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${isRssCopied ? "scale-125" : ""}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <div className="text-sm text-gray-500">
              © {currentYear} ManaGen AI · All rights reserved
            </div>
            <div className="text-xs text-gray-600">
              Built with{" "}
              <a
                href="https://si42.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                Supernal Intelligence
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
