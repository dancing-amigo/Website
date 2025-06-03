import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import MemoList from "../../../components/MemoList";
import TagCloud from "../../../components/TagCloud";
import { getMemosByTag, getAllTags } from "../../../utils/markdown";
import { Post } from "../../../types";

interface TagPageProps {
  memos: Post[];
  tag: string;
  allTags: { tag: string; count: number }[];
  language: string;
}

export default function TagPage({
  memos,
  tag,
  allTags,
  language,
}: TagPageProps) {
  const router = useRouter();
  const backLabel =
    language === "ja" ? "← メモ一覧に戻る" : "← Back to all memos";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        {language === "ja"
          ? `「${tag}」のタグがついたメモ`
          : `Memos tagged with "${tag}"`}
      </h1>

      <div className="mb-6">
        <Link
          href={{
            pathname: "/memo",
            query: { lang: language },
          }}
          className="text-blue-600 hover:underline"
        >
          {backLabel}
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <MemoList memos={memos} />
        </div>

        <aside className="md:w-1/4">
          <TagCloud tags={allTags} />
        </aside>
      </div>
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