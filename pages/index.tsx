import Link from "next/link";
import { GetServerSideProps } from "next";
import { getAllMemos } from "../utils/markdown";
import { Post } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import Search from "../components/search/Search";

interface HomeProps {
  latestMemos: Post[];
}

export default function Home({ latestMemos }: HomeProps) {
  const { language } = useLanguage();

  return (
    <div className="fade-in">
      {/* タイトル */}
      <section className="mb-12">
        <h1 className="font-serif text-display">Takeshi's Blog</h1>
      </section>

      {/* 検索 */}
      <section className="mb-16">
        <Search />
      </section>

      {/* 最新のメモ */}
      <section>
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-title">
            {language === "ja" ? "最新のメモ" : "Recent"}
          </h2>
          <Link
            href={{ pathname: "/memo", query: { lang: language } }}
            className="text-small text-muted hover:text-primary"
          >
            {language === "ja" ? "すべて見る →" : "View all →"}
          </Link>
        </div>

        <div className="space-y-8">
          {latestMemos.map((memo) => (
            <article key={memo.slug} className="group">
              <Link
                href={{
                  pathname: `/memo/${memo.slug}`,
                  query: { lang: memo.language },
                }}
                className="block"
              >
                <div className="flex items-baseline gap-4">
                  <time className="text-small text-muted shrink-0 tabular-nums">
                    {new Date(memo.date).toLocaleDateString(
                      memo.language === "ja" ? "ja-JP" : "en-US",
                      { month: "short", day: "numeric" }
                    )}
                  </time>
                  <h3 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
                    {memo.title}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const language = (query.lang as string) || "en";
  const allMemos = getAllMemos(language);

  return {
    props: {
      latestMemos: allMemos.slice(0, 5),
    },
  };
};
