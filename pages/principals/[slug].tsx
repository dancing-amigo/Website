import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import MarkdownRenderer from "../../components/content/MarkdownRenderer";
import { ContentEntry } from "../../types";
import { getAllSlugs, getEntryBySlug } from "../../utils/content";

interface EntryPageProps {
  entry: ContentEntry;
}

export default function SelfDefinitionEntryPage({ entry }: EntryPageProps) {
  return (
    <article className="fade-in">
      <div className="mb-5 space-y-3 pb-1">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Chapter {entry.order}</p>
        <h1 className="max-w-4xl font-display text-3xl leading-[0.95] tracking-[-0.05em] md:text-5xl">
          {entry.title}
        </h1>
      </div>

      <MarkdownRenderer content={entry.content} />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllSlugs("principals").map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EntryPageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    throw new Error("Missing slug");
  }

  return {
    props: {
      entry: getEntryBySlug("principals", slug),
    },
  };
};
