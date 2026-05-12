import { GetStaticPaths, GetStaticProps } from "next";
import RichContentRenderer from "../components/content/RichContentRenderer";
import { ContentEntry } from "../types";
import { getAllEntries, getEntryBySlug } from "../utils/content";

interface PageProps {
  entry: ContentEntry;
}

export default function MarkdownPage({ entry }: PageProps) {
  return (
    <article className="fade-in max-w-prose">
      <div className="mb-8">
        {entry.date ? (
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
            {entry.date}
          </p>
        ) : null}
        <h1 className="font-display text-3xl leading-tight md:text-5xl">
          {entry.title}
        </h1>
        {entry.excerpt ? (
          <p className="mt-4 text-lg leading-8 text-secondary">{entry.excerpt}</p>
        ) : null}
      </div>

      <RichContentRenderer content={entry.content} />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllEntries()
      .filter((entry) => !entry.slug.includes("/"))
      .map((entry) => ({
        params: { slug: entry.slug },
      })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const entry = getEntryBySlug(slug);
  if (!entry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      entry,
    },
  };
};
