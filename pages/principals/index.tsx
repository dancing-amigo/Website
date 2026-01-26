import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPrincipals } from "../../utils/markdown";
import { Principal } from "../../types";

interface PrincipalsPageProps {
  principals: Principal[];
  language: string;
}

export default function PrincipalsPage({
  principals,
  language,
}: PrincipalsPageProps) {
  const title = language === "ja" ? "原則" : "Principals";
  const description =
    language === "ja"
      ? "行動原則"
      : "Guiding principles for how I act";
  const emptyMessage =
    language === "ja" ? "まだ原則はありません。" : "No principals yet.";

  return (
    <div className="fade-in">
      <header className="mb-16 text-left">
        <h1 className="font-serif text-display mb-4">{title}</h1>
        <p className="text-secondary">{description}</p>
      </header>

      {principals.length === 0 ? (
        <p className="text-muted">{emptyMessage}</p>
      ) : (
        <div className="space-y-24">
          {principals.map((principal) => (
            <article key={principal.slug}>
              <h2 className="font-serif text-title mb-8">
                {principal.title}
              </h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {principal.content}
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
  const principals = getAllPrincipals(language);

  return {
    props: {
      principals,
      language,
    },
  };
};
