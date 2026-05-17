import { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";
import { loadSiteConfig } from "@/lib/server/config";
import ConstellationCanvasLoader from "@/components/ConstellationCanvasLoader";
import SectionCards from "@/components/home/SectionCards";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadSiteConfig();
  const { site } = config;
  return {
    title: { default: site.title, template: `%s | ${site.title}` },
    description: site.description,
    metadataBase: new URL(site.url),
    openGraph: {
      title: site.title,
      description: site.description,
      url: "/",
      siteName: site.title,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: ["/images/twitter-image.jpg"],
    },
  };
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ background: "#0a0b1a", minHeight: "100vh" }}
        className="relative flex items-center justify-center overflow-hidden"
      >
        <ConstellationCanvasLoader />

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(10,11,26,0.6) 100%)",
          }}
        />

        <div
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
          style={{ paddingTop: "4rem" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#a5b4fc",
              background: "rgba(99,102,241,0.1)",
            }}
          >
            Open Source &nbsp;·&nbsp; Community-Powered &nbsp;·&nbsp; Built with{" "}
            <a
              href="https://si42.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#a5b4fc", textDecoration: "underline" }}
            >
              Supernal Intelligence
            </a>
          </div>

          {/* Title */}
          <h1
            className="font-black tracking-tight text-white mb-4 leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              textShadow: "0 0 40px rgba(99,102,241,0.35)",
            }}
          >
            The Living Guide to
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Generative AI
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            style={{ color: "rgba(203,213,225,0.85)" }}
          >
            200+ topics on understanding, building, and managing Gen AI. Updated
            with the latest research, models, and techniques — by the community
            and AI itself.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/Understanding"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                boxShadow: "0 0 28px rgba(99,102,241,0.5)",
              }}
            >
              Start Learning →
            </Link>
            <a
              href="https://github.com/ianderrington/genai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(99,102,241,0.4)",
                color: "#a5b4fc",
                background: "rgba(99,102,241,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Github size={15} className="shrink-0" />
              Star on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {[
              { num: "200+", label: "Topics" },
              { num: "50+", label: "Models Tracked" },
              { num: new Date().getFullYear().toString(), label: "Up to Date" },
              { num: "Free", label: "Always Open" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#818cf8" }}
                >
                  {num}
                </span>
                <span
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{ color: "rgba(148,163,184,0.7)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest"
          style={{ color: "rgba(148,163,184,0.5)" }}
          aria-hidden="true"
        >
          <span>Explore</span>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section
        style={{ background: "#0f0f23" }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Navigate the Knowledge Hub
          </h2>
          <p
            className="text-center mb-14 max-w-xl mx-auto"
            style={{ color: "rgba(148,163,184,0.7)" }}
          >
            Three interconnected sections — from first principles to production
            deployment.
          </p>
          <SectionCards />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        className="py-20 px-4 sm:px-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, #0a0b1a 0%, #13143a 50%, #0a0b1a 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            AI knowledge that stays current
          </h2>
          <p
            className="mb-8 text-lg"
            style={{ color: "rgba(165,180,252,0.85)" }}
          >
            Generative AI moves fast. ManaGen AI is a living reference — updated
            continuously as models, tools, and best practices evolve.
          </p>
          <Link
            href="/Understanding"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            Start Exploring →
          </Link>
        </div>
      </section>
    </>
  );
}
