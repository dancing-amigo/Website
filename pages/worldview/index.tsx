import { GetServerSideProps } from "next";
import { getAllWorldviews } from "../../utils/markdown";
import { Worldview } from "../../types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface WorldviewPageProps {
  worldviews: Worldview[];
  language: string;
}

export default function WorldviewPage({ worldviews, language }: WorldviewPageProps) {
  const title = language === "ja" ? "世界観" : "Worldview";
  const emptyMessage = language === "ja" 
    ? "まだ世界観の記事はありません。" 
    : "No worldview articles yet.";

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      {worldviews.length === 0 ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : (
        <div>
          {worldviews.map((worldview) => (
            <div key={worldview.slug} className="mb-24">
              <h2 className="text-2xl font-bold mb-4">{worldview.title}</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {worldview.content}
                </ReactMarkdown>
              </div>
            </div>
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
