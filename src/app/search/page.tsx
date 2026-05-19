"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { useContentSearch } from "@/lib/search/useContentSearch";

function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQuery = params?.get("q") || "";
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);

  React.useEffect(() => {
    setSearchQuery(params?.get("q") || "");
  }, [params]);

  const { results, isLoading, error } = useContentSearch(initialQuery, 50);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0b1a] text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Search</h1>

        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the guide…"
                className="w-full px-4 py-3 pl-11 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                autoFocus
              />
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            >
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16 text-gray-500">Searching…</div>
        ) : results.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for
              &ldquo;{initialQuery}&rdquo;
            </p>
            <div className="space-y-4">
              {results.map((hit) => (
                <Link
                  key={hit.slug}
                  href={`/${hit.slug}`}
                  className="block rounded-xl border border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-indigo-400 dark:hover:border-indigo-500/40 px-6 py-5 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors truncate">
                        {hit.title}
                      </h2>
                      {hit.description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {hit.description}
                        </p>
                      )}
                      {hit.excerpt && hit.excerpt !== hit.description && (
                        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 line-clamp-2 font-mono">
                          {hit.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700/50 rounded-full px-2 py-1 capitalize">
                      {hit.section}
                    </span>
                  </div>
                  {hit.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hit.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/40 rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </>
        ) : initialQuery ? (
          <div className="text-center py-16 text-gray-500">
            No results found for &ldquo;{initialQuery}&rdquo;
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-[#0a0b1a] flex items-center justify-center text-gray-500">
          Loading…
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
