import Link from "next/link";
import { useRouter } from "next/router";
import { Post } from "../../types";

interface ArticleCardProps {
  memo: Post;
}

const ArticleCard = ({ memo }: ArticleCardProps) => {
  const router = useRouter();
  const currentLang = (router.query.lang as string) || "en";

  return (
    <article className="border-b pb-6 transition-all duration-200 hover:bg-gray-50 p-4 -mx-4 rounded">
      <h2 className="text-2xl font-bold mb-2">
        <Link
          href={{
            pathname: `/weekly-memo/${memo.slug}`,
            query: { lang: memo.language },
          }}
          className="hover:underline"
        >
          {memo.title}
        </Link>
      </h2>

      <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
        <time dateTime={memo.date}>
          {new Date(memo.date).toLocaleDateString(
            memo.language === "ja" ? "ja-JP" : "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </time>
        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
          {memo.language === "ja" ? "🇯🇵" : "🇺🇸"}
        </span>
      </div>

      <p className="text-gray-700 mb-3">{memo.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {memo.tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: `/weekly-memo/tag/${tag}`,
              query: { lang: currentLang },
            }}
            className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
};

export default ArticleCard;
