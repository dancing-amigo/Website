import Link from "next/link";
import { ContentEntry, SectionKey } from "../../types";

interface EntryListProps {
  entries: ContentEntry[];
  section: SectionKey;
}

const EntryList = ({ entries, section }: EntryListProps) => {
  return (
    <div>
      {entries.map((entry) => (
        <article key={entry.slug} className="grid gap-3 py-6 md:grid-cols-[140px,1fr]">
          <div className="text-xs uppercase tracking-[0.16em] text-muted">
            {entry.date || `Chapter ${entry.order}`}
          </div>
          <div className="space-y-3">
            <h2 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
              <Link href={`/${section}/${entry.slug}`}>{entry.title}</Link>
            </h2>
            {entry.excerpt ? (
              <p className="max-w-2xl text-base leading-7 text-secondary">{entry.excerpt}</p>
            ) : null}
            {section === "self-definition" && entry.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
};

export default EntryList;
