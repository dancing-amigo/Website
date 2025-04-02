import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import SearchBar from "../../components/SearchBar";
import MemoList from "../../components/MemoList";
import TagCloud from "../../components/TagCloud";
import { getAllMemos, getAllTags } from "../../utils/markdown";
import { Post } from "../../types";

interface WeeklyMemoPageProps {
  memos: Post[];
  tags: { tag: string; count: number }[];
  language: string;
}

export default function WeeklyMemoPage({
  memos,
  tags,
  language,
}: WeeklyMemoPageProps) {
  const router = useRouter();

  const title = language === "ja" ? "週間メモ" : "Weekly Memo";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      <SearchBar />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <MemoList memos={memos} />
        </div>

        <aside className="md:w-1/4">
          <TagCloud tags={tags} />
        </aside>
      </div>
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
