import { GetStaticPaths, GetStaticProps } from "next";
import RichContentRenderer from "../../components/content/RichContentRenderer";
import { ContentEntry } from "../../types";
import { getEntriesByDirectory, getEntryBySlug } from "../../utils/content";

interface PathosArticleProps {
  entry: ContentEntry;
}

export default function PathosArticlePage({ entry }: PathosArticleProps) {
  return (
    <article className="fade-in max-w-prose pb-20 pt-8 md:pt-16">
      <p className="mb-8 text-sm tracking-[0.22em] text-muted">Pathos</p>
      <div className="mb-10">
        {entry.date ? (
          <p className="mb-3 text-xs tracking-[0.18em] text-muted">{entry.date}</p>
        ) : null}
        <h1 className="font-display text-3xl leading-[1.24] md:text-5xl">
          {entry.title}
        </h1>
        {entry.excerpt ? (
          <p className="mt-6 text-lg leading-8 text-secondary">{entry.excerpt}</p>
        ) : null}
      </div>

      <RichContentRenderer content={entry.content} />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getEntriesByDirectory("pathos").map((entry) => ({
      params: { slug: entry.slug.replace(/^pathos\//, "") },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PathosArticleProps> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const entry = getEntryBySlug(`pathos/${slug}`);
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
