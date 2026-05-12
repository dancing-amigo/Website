import { GetStaticProps } from "next";
import Link from "next/link";
import { ContentEntry } from "../types";
import { getEntriesByDirectory } from "../utils/content";

interface PathosPageProps {
  entries: ContentEntry[];
}

export default function PathosPage({ entries }: PathosPageProps) {
  return (
    <article className="fade-in max-w-prose pb-20 pt-8 md:pt-16">
      <p className="mb-8 text-sm tracking-[0.22em] text-muted">Pathos</p>

      <div className="border-t border-border">
        {entries.length > 0 ? (
          <div className="divide-y divide-border">
            {entries.map((entry) => (
              <article key={entry.slug} className="py-8">
                <p className="mb-3 text-xs tracking-[0.18em] text-muted">
                  {entry.date || "Pathos"}
                </p>
                <h2 className="font-display text-2xl leading-tight md:text-3xl">
                  <Link href={`/${entry.slug}`} className="hover:text-accent">
                    {entry.title}
                  </Link>
                </h2>
                {entry.excerpt ? (
                  <p className="mt-4 text-base leading-8 text-secondary">
                    {entry.excerpt}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="py-8 text-base leading-8 text-secondary">
            まだ記事はありません。
          </p>
        )}
      </div>
    </article>
  );
}

export const getStaticProps: GetStaticProps<PathosPageProps> = async () => {
  return {
    props: {
      entries: getEntriesByDirectory("pathos"),
    },
  };
};
