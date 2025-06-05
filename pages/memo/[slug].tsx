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

  const backLabel =
    currentLang === "ja" ? "← メモ一覧に戻る" : "← Back to all memos";

  return (
    <article className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Link
          href={{
            pathname: "/memo",
            query: { lang: currentLang },
          }}
          className="text-blue-600 hover:underline inline-block"
        >
          {backLabel}
        </Link>

        {translation && (
          <Link
            href={{
              pathname: `/memo/${translation.slug}`,
              query: { lang: translation.language },
            }}
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            {translation.language === "ja"
              ? "🇯🇵 日本語で読む"
              : "🇺🇸 Read in English"}
          </Link>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-2">{memo.title}</h1>

      <div className="text-gray-500 mb-4">
        {new Date(memo.date).toLocaleDateString(
          currentLang === "ja" ? "ja-JP" : "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}
        <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded">
          {memo.language === "ja" ? "🇯🇵 日本語" : "🇺🇸 English"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {memo.tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: `/memo/tag/${tag}`,
              query: { lang: currentLang },
            }}
            className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {memo.content}
        </ReactMarkdown>
      </div>
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

    // 翻訳を取得
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
      notFound: true, // 記事が見つからない場合は404
    };
  }
};
