import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { searchAll } from "../utils/markdown";
import { UnifiedSearchResult } from "../types";

interface SearchPageProps {
  results: UnifiedSearchResult[];
  query: string;
  language: string;
}

export default function SearchPage({
  results,
  query,
  language,
}: SearchPageProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query);

  const title = language === "ja" ? "検索" : "Search";
  const backLabel = language === "ja" ? "← ホーム" : "← Home";
  const placeholder = language === "ja" ? "検索..." : "Search...";
  const resultsText =
    language === "ja"
      ? `${results.length}件の結果`
      : `${results.length} ${results.length === 1 ? "result" : "results"}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push({
        pathname: "/search",
        query: { q: searchTerm.trim(), lang: language },
      });
    }
  };

  const isExternal = (url: string) => url.startsWith("http");

  return (
    <div className="fade-in">
      <nav className="mb-12">
        <Link
          href={{ pathname: "/", query: { lang: language } }}
          className="text-small text-muted hover:text-primary"
        >
          {backLabel}
        </Link>
      </nav>

      <header className="mb-12">
        <h1 className="font-serif text-display mb-8">{title}</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full max-w-md px-0 py-2 text-body bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
          />
        </form>
      </header>

      {query && <p className="text-muted text-small mb-8">{resultsText}</p>}

      {results.length > 0 && (
        <div className="space-y-0">
          {results.map((result, index) => (
            <article
              key={`${result.type}-${index}`}
              className="group py-6 border-b border-border"
            >
              {isExternal(result.url) ? (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-small text-muted shrink-0">
                      {result.description}
                    </span>
                    <h2 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
                      {result.title}
                      <span className="text-muted ml-1">↗</span>
                    </h2>
                  </div>
                  {result.snippet && (
                    <p className="mt-2 text-secondary text-small line-clamp-2 ml-16">
                      {result.snippet}
                    </p>
                  )}
                </a>
              ) : (
                <Link href={result.url} className="block">
                  <div className="flex items-baseline gap-3">
                    <span className="text-small text-muted shrink-0">
                      {result.description}
                    </span>
                    <h2 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
                      {result.title}
                    </h2>
                  </div>
                  {result.snippet && (
                    <p className="mt-2 text-secondary text-small line-clamp-2 ml-16">
                      {result.snippet}
                    </p>
                  )}
                </Link>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = (query.q as string) || "";
  const language = (query.lang as string) || "en";

  const results = searchQuery ? searchAll(searchQuery, language) : [];

  return {
    props: {
      results,
      query: searchQuery,
      language,
    },
  };
};
