import { GetServerSideProps } from "next";
import { getAllWorldviews } from "../../utils/markdown";
import { Worldview } from "../../types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface WorldviewPageProps {
  worldviews: Worldview[];
  language: string;
}

export default function WorldviewPage({
  worldviews,
  language,
}: WorldviewPageProps) {
  const title = language === "ja" ? "世界観" : "Worldview";
  const description =
    language === "ja"
      ? "世界をどのように理解しているか"
      : "How I understand the world";
  const emptyMessage =
    language === "ja" ? "まだ記事はありません。" : "No articles yet.";

  return (
    <div className="fade-in">
      <header className="mb-16 text-left">
        <h1 className="font-serif text-display mb-4">{title}</h1>
        <p className="text-secondary">{description}</p>
      </header>

      {worldviews.length === 0 ? (
        <p className="text-muted">{emptyMessage}</p>
      ) : (
        <div className="space-y-24">
          {worldviews.map((worldview) => (
            <article key={worldview.slug}>
              <h2 className="font-serif text-title mb-8">{worldview.title}</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {worldview.content}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const language = (query.lang as string) || "en";
  const worldviews = getAllWorldviews(language);

  return {
    props: {
      worldviews,
      language,
    },
  };
};
