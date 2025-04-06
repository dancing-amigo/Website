import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "../../contexts/LanguageContext";

interface SearchProps {
  initialQuery?: string;
  searchPath?: string;
}

const Search = ({
  initialQuery = "",
  searchPath = "/weekly-memo/search",
}: SearchProps) => {
  const router = useRouter();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  // 言語に応じたプレースホルダー
  const placeholder = language === "ja" ? "検索..." : "Search...";

  // If the URL query changes, update the search input
  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q as string);
    }
  }, [router.query.q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push({
        pathname: searchPath,
        query: {
          q: searchTerm.trim(),
          lang: language,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all"
          aria-label="Search"
        />
        <button
          type="submit"
          className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Submit search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Search;
