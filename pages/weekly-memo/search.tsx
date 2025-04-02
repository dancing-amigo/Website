import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "../../components/SearchBar";
import SearchResultCard from "../../components/weekly-memo/SearchResult";
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

  const title = language === "ja" ? "検索結果" : "Search Results";
  const resultsText =
    language === "ja"
      ? `${results.length}件の${
          results.length === 1 ? "結果" : "結果"
        }「${query}」`
      : `${results.length} ${
          results.length === 1 ? "result" : "results"
        } for "${query}"`;
  const backLabel =
    language === "ja" ? "← メモ一覧に戻る" : "← Back to all memos";
  const noResultsText =
    language === "ja"
      ? "結果が見つかりませんでした。別の検索語を試してください。"
      : "No results found. Try a different search term.";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      <SearchBar />

      <div className="mb-6">
        <p className="text-gray-600">{resultsText}</p>
        <Link
          href={{
            pathname: "/weekly-memo",
            query: { lang: language },
          }}
          className="text-blue-600 hover:underline"
        >
          {backLabel}
        </Link>
      </div>

      {results.length === 0 ? (
        <p className="text-center py-10">{noResultsText}</p>
      ) : (
        <div className="space-y-8">
          {results.map((result) => (
            <SearchResultCard
              key={result.slug}
              result={result}
              searchTerm={query}
              language={language}
            />
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
      redirect: {
        destination: `/weekly-memo?lang=${language}`,
        permanent: false,
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
