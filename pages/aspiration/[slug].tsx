import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAspirationBySlug } from "../../utils/markdown";
import { Post } from "../../types";

interface AspirationDetailPageProps {
  aspiration: Post;
}

export default function AspirationDetailPage({
  aspiration,
}: AspirationDetailPageProps) {
  const router = useRouter();
  const currentLang = (router.query.lang as string) || "en";

  const backLabel = currentLang === "ja" ? "← 戻る" : "← Back";

  return (
    <article className="fade-in max-w-prose">
      <nav className="flex items-center justify-between mb-12 text-small">
        <Link
          href={{ pathname: "/aspiration", query: { lang: currentLang } }}
          className="text-muted hover:text-primary"
        >
          {backLabel}
        </Link>
      </nav>

      <header className="mb-12">
        <time className="text-small text-muted">
          {new Date(aspiration.date).toLocaleDateString(
            currentLang === "ja" ? "ja-JP" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </time>
        <h1 className="font-serif text-display mt-4">{aspiration.title}</h1>
      </header>

      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {aspiration.content}
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
    const aspiration = getAspirationBySlug(slug, language);

    return {
      props: {
        aspiration,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
