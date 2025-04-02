import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface SearchProps {
  placeholder?: string;
  initialQuery?: string;
  searchPath?: string;
}

const Search = ({
  placeholder = "Search in titles, content, tags...",
  initialQuery = "",
  searchPath = "/weekly-memo/search",
}: SearchProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  // If the URL query changes, update the search input
  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q as string);
    }
  }, [router.query.q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`${searchPath}?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm hover:shadow transition-shadow duration-200">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 focus:outline-none"
          aria-label="Search"
        />
        <button
          type="submit"
          className="bg-gray-100 border-l border-gray-300 px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Submit search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
