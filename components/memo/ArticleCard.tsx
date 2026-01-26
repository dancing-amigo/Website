import Link from "next/link";
import { Post } from "../../types";

interface ArticleCardProps {
  memo: Post;
  basePath?: string;
  showDate?: boolean;
}

const ArticleCard = ({
  memo,
  basePath = "/memo",
  showDate = true,
}: ArticleCardProps) => {
  const formattedDate =
    showDate && memo.date
      ? new Date(memo.date).toLocaleDateString(
          memo.language === "ja" ? "ja-JP" : "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )
      : null;

  return (
    <article className="group py-6 border-b border-border last:border-0">
      <Link
        href={{
          pathname: `${basePath}/${memo.slug}`,
          query: { lang: memo.language },
        }}
        className="block"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
          {formattedDate && (
            <time className="text-small text-muted shrink-0 tabular-nums">
              {formattedDate}
            </time>
          )}
          <div className="flex-1">
            <h2 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
              {memo.title}
            </h2>
            {memo.excerpt && (
              <p className="mt-2 text-secondary text-small line-clamp-2">
                {memo.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
