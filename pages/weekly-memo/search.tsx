import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "../../components/SearchBar";
import SearchResultCard from "../../components/weekly-memo/SearchResult";
import { searchMemosByKeyword } from "../../utils/markdown";
import { SearchResult } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

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
  const { language: contextLanguage } = useLanguage();
  const currentLanguage = language || contextLanguage;

  const title = currentLanguage === "ja" ? "検索結果" : "Search Results";
  const resultsText =
    currentLanguage === "ja"
      ? `"${query}" の検索結果: ${results.length}件${
          results.length === 1 ? "" : ""
        }`
      : `${results.length} ${
          results.length === 1 ? "result" : "results"
        } for "${query}"`;
  const backLabel =
    currentLanguage === "ja" ? "← メモ一覧に戻る" : "← Back to all memos";

  // より詳細なヘルプメッセージ
  const noResultsText =
    currentLanguage === "ja" ? (
      <>
        <p>「{query}」に一致する結果が見つかりませんでした。</p>
        <ul className="list-disc ml-5 mt-3 text-sm text-gray-600">
          <li>別のキーワードを試してください</li>
          <li>
            単語の一部だけで検索する（例: "プログラミング" → "プログラム"）
          </li>
          <li>より一般的な用語を使用する</li>
        </ul>
      </>
    ) : (
      <>
        <p>No results found for "{query}".</p>
        <ul className="list-disc ml-5 mt-3 text-sm text-gray-600">
          <li>Try different keywords</li>
          <li>Use partial words (e.g., "program" instead of "programming")</li>
          <li>Use more general terms</li>
        </ul>
      </>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      <SearchBar />

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg font-medium text-gray-700">{resultsText}</p>
        <div className="mt-2">
          <Link
            href={{
              pathname: "/weekly-memo",
              query: { lang: currentLanguage },
            }}
            className="text-blue-600 hover:underline text-sm"
          >
            {backLabel}
          </Link>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {noResultsText}
        </div>
      ) : (
        <div className="space-y-8">
          {results.map((result) => (
            <SearchResultCard
              key={result.slug}
              result={result}
              searchTerm={query}
              language={currentLanguage}
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
