import { GetServerSideProps } from "next";
import { getAllPrinciples } from "../../utils/markdown";
import { Principle } from "../../types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PrinciplesPageProps {
  principles: Principle[];
}

export default function PrinciplesPage({ principles }: PrinciplesPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Principles</h1>
      <div>
        {principles.map((principle) => (
          <div key={principle.slug} className="mb-24">
            <h2 className="text-2xl font-bold mb-4">{principle.title}</h2>
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {principle.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const principles = getAllPrinciples("ja");

  return {
    props: {
      principles,
    },
  };
};
