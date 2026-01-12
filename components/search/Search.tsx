import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "../../contexts/LanguageContext";

interface SearchProps {
  initialQuery?: string;
  searchPath?: string;
}

const Search = ({
  initialQuery = "",
  searchPath = "/memo/search",
}: SearchProps) => {
  const router = useRouter();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const placeholder = language === "ja" ? "検索..." : "Search...";

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
        query: { q: searchTerm.trim(), lang: language },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm px-0 py-2 text-body bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none transition-colors"
        aria-label="Search"
      />
    </form>
  );
};

export default Search;
