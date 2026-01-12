import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getMemoBySlug, getTranslation } from "../../utils/markdown";
import { Post } from "../../types";

interface MemoPageProps {
  memo: Post;
  translation: Post | null;
}

export default function MemoPage({ memo, translation }: MemoPageProps) {
  const router = useRouter();
  const currentLang = (router.query.lang as string) || "en";

  const backLabel = currentLang === "ja" ? "← 戻る" : "← Back";

  return (
    <article className="fade-in max-w-prose">
      {/* ナビゲーション */}
      <nav className="flex items-center justify-between mb-12 text-small">
        <Link
          href={{ pathname: "/memo", query: { lang: currentLang } }}
          className="text-muted hover:text-primary"
        >
          {backLabel}
        </Link>

        {translation && (
          <Link
            href={{
              pathname: `/memo/${translation.slug}`,
              query: { lang: translation.language },
            }}
            className="text-muted hover:text-primary"
          >
            {translation.language === "ja" ? "日本語" : "English"}
          </Link>
        )}
      </nav>

      {/* ヘッダー */}
      <header className="mb-12">
        <time className="text-small text-muted">
          {new Date(memo.date).toLocaleDateString(
            currentLang === "ja" ? "ja-JP" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </time>
        <h1 className="font-serif text-display mt-4">{memo.title}</h1>
      </header>

      {/* コンテンツ */}
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {memo.content}
        </ReactMarkdown>
      </div>

      {/* タグ */}
      {memo.tags.length > 0 && (
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-3">
            {memo.tags.map((tag) => (
              <Link
                key={tag}
                href={{
                  pathname: `/memo/tag/${tag}`,
                  query: { lang: currentLang },
                }}
                className="text-small text-muted hover:text-primary"
              >
                {tag}
              </Link>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const slug = params?.slug as string;
  const language = (query.lang as string) || "en";

  try {
    const memo = getMemoBySlug(slug, language);
    const targetLang = memo.language === "ja" ? "en" : "ja";
    const translation = getTranslation(memo, targetLang);

    return {
      props: {
        memo,
        translation,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
