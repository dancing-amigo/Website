import { GetServerSideProps } from "next";
import Link from "next/link";
import MemoList from "../../../components/MemoList";
import { getMemosByTag, getAllTags } from "../../../utils/markdown";
import { Post } from "../../../types";

interface TagPageProps {
  memos: Post[];
  tag: string;
  allTags: { tag: string; count: number }[];
  language: string;
}

export default function TagPage({ memos, tag, allTags, language }: TagPageProps) {
  const backLabel = language === "ja" ? "← 戻る" : "← Back";
  const title = language === "ja" ? `${tag}` : `${tag}`;

  return (
    <div className="fade-in">
      <nav className="mb-12">
        <Link
          href={{ pathname: "/memo", query: { lang: language } }}
          className="text-small text-muted hover:text-primary"
        >
          {backLabel}
        </Link>
      </nav>

      <header className="mb-16">
        <h1 className="font-serif text-display">{title}</h1>
        <p className="text-muted mt-2">
          {memos.length} {language === "ja" ? "件" : memos.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <MemoList memos={memos} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const tag = params?.tag as string;
  const language = (query.lang as string) || "en";

  const memos = getMemosByTag(tag, language);
  const allTags = getAllTags(language);

  return {
    props: {
      memos,
      tag,
      allTags,
      language,
    },
  };
};
