import Link from "next/link";
import { SearchResult } from "../../types";

interface SearchResultCardProps {
  result: SearchResult;
  searchTerm: string;
  language: string;
}

const SearchResultCard = ({
  result,
  searchTerm,
  language,
}: SearchResultCardProps) => {
  // 検索キーワードをハイライトする関数
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const locationLabels = {
    title: language === "ja" ? "タイトル" : "title",
    content: language === "ja" ? "コンテンツ" : "content",
    tags: language === "ja" ? "タグ" : "tags",
  };

  const foundInText = language === "ja" ? "見つかりました：" : "Found in";

  return (
    <article className="border-b pb-6 transition-all duration-200 hover:bg-gray-50 p-4 -mx-4 rounded">
      <h2 className="text-2xl font-bold mb-2">
        <Link
          href={{
            pathname: `/memo/${result.slug}`,
            query: { lang: result.language },
          }}
          className="hover:underline"
        >
          {result.matchLocations.includes("title")
            ? highlightText(result.title, searchTerm)
            : result.title}
        </Link>
      </h2>

      <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
        <time dateTime={result.date}>
          {new Date(result.date).toLocaleDateString(
            result.language === "ja" ? "ja-JP" : "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </time>
        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
          {result.language === "ja" ? "🇯🇵" : "🇺🇸"}
        </span>
      </div>

      {/* コンテンツマッチのスニペットを表示 */}
      {result.matchLocations.includes("content") && result.snippet && (
        <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
          {highlightText(result.snippet, searchTerm)}
        </div>
      )}

      {/* マッチした場所のラベルを表示 */}
      <div className="mb-3 flex flex-wrap gap-2">
        {result.matchLocations.map((location) => (
          <span
            key={location}
            className="text-xs bg-blue-100 px-2 py-1 rounded"
          >
            {foundInText}{" "}
            {locationLabels[location as keyof typeof locationLabels]}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {result.tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: `/memo/tag/${tag}`,
              query: { lang: language },
            }}
            className={`text-xs ${
              result.matchLocations.includes("tags") &&
              tag.toLowerCase().includes(searchTerm.toLowerCase())
                ? "bg-yellow-200"
                : "bg-gray-100"
            } px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200`}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
};

export default SearchResultCard;