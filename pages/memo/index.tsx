import { GetServerSideProps } from "next";
import Link from "next/link";
import MemoList from "../../components/MemoList";
import { getAllMemos, getAllTags } from "../../utils/markdown";
import { Post } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

interface MemoPageProps {
  memos: Post[];
  tags: { tag: string; count: number }[];
  language: string;
}

export default function MemoPage({ memos, tags, language }: MemoPageProps) {
  const { language: contextLanguage } = useLanguage();
  const currentLang = language || contextLanguage;

  const title = currentLang === "ja" ? "メモ" : "Memo";

  return (
    <div className="fade-in">
      <header className="mb-16">
        <h1 className="font-serif text-display mb-4">{title}</h1>
      </header>

      {/* タグ - シンプルなインラインリスト */}
      {tags.length > 0 && (
        <div className="mb-12 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {tags.slice(0, 10).map(({ tag }) => (
              <Link
                key={tag}
                href={{
                  pathname: `/memo/tag/${tag}`,
                  query: { lang: currentLang },
                }}
                className="text-small text-muted hover:text-primary"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      <MemoList memos={memos} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const language = (query.lang as string) || "en";

  const memos = getAllMemos(language);
  const tags = getAllTags(language);

  return {
    props: {
      memos,
      tags,
      language,
    },
  };
};
