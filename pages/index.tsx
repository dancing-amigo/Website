import Link from "next/link";
import { GetServerSideProps } from "next";
import MemoList from "../components/MemoList";
import AnonymousMessageForm from "../components/contact/AnonymousMessageForm";
import { getAllMemos } from "../utils/markdown";
import { Post } from "../types";
import { useLanguage } from "../contexts/LanguageContext";

interface HomeProps {
  latestMemos: Post[];
}

export default function Home({ latestMemos }: HomeProps) {
  const { language } = useLanguage();

  const title =
    language === "ja"
      ? "私の個人サイトへようこそ"
      : "Welcome to My Personal Site";

  const subtitle =
    language === "ja"
      ? "私の考え、原則、そして作品を世界と共有する場所です。"
      : "A place where I share my thoughts, principles, and work with the world.";

  const latestMemosTitle =
    language === "ja" ? "最新のメモ" : "Latest Memos";
  const viewAllLabel = language === "ja" ? "すべて見る" : "View all";

  return (
    <div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{latestMemosTitle}</h2>
          <Link
            href={{
              pathname: "/memo",
              query: { lang: language },
            }}
            className="text-blue-600 hover:underline"
          >
            {viewAllLabel}
          </Link>
        </div>

        <MemoList memos={latestMemos} />
      </section>

      {/* 匿名メッセージフォームを追加 */}
      <section className="mt-16">
        <AnonymousMessageForm />
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
