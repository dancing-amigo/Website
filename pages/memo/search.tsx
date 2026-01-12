import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { searchMemosByKeyword } from "../../utils/markdown";
import { SearchResult } from "../../types";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  language: string;
}

export default function SearchResults({
  results,
  query,
  language,
}: SearchResultsProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query);

  const title = language === "ja" ? "検索" : "Search";
  const backLabel = language === "ja" ? "← 戻る" : "← Back";
  const placeholder = language === "ja" ? "検索..." : "Search...";
  const resultsText =
    language === "ja"
      ? `${results.length}件の結果`
      : `${results.length} ${results.length === 1 ? "result" : "results"}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push({
        pathname: "/memo/search",
        query: { q: searchTerm.trim(), lang: language },
      });
    }
  };

  return (
    <div className="fade-in">
      <nav className="mb-12">
        <Link
          href={{ pathname: "/memo", query: { lang: language } }}
          className="text-small text-muted hover:text-primary"
        >
          {backLabel}
        </Link>
      </nav>

      <header className="mb-12">
        <h1 className="font-serif text-display mb-8">{title}</h1>

        {/* 検索フォーム */}
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

      {query && (
        <p className="text-muted text-small mb-8">{resultsText}</p>
      )}

      {results.length > 0 && (
        <div className="space-y-0">
          {results.map((result) => (
            <article
              key={result.slug}
              className="group py-6 border-b border-border"
            >
              <Link
                href={{
                  pathname: `/memo/${result.slug}`,
                  query: { lang: result.language },
                }}
                className="block"
              >
                <h2 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
                  {result.title}
                </h2>
                {result.snippet && (
                  <p className="mt-2 text-secondary text-small line-clamp-2">
                    {result.snippet}
                  </p>
                )}
              </Link>
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

  if (!searchQuery) {
    return {
      props: {
        results: [],
        query: "",
        language,
      },
    };
  }

  const results = searchMemosByKeyword(searchQuery, language);

  return {
    props: {
      results,
      query: searchQuery,
      language,
    },
  };
};
