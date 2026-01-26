import { GetServerSideProps } from "next";
import MemoList from "../../components/MemoList";
import { getAllAspirations } from "../../utils/markdown";
import { Post } from "../../types";
import { useLanguage } from "../../contexts/LanguageContext";

interface AspirationPageProps {
  aspirations: Post[];
  language: string;
}

export default function AspirationPage({
  aspirations,
  language,
}: AspirationPageProps) {
  const { language: contextLanguage } = useLanguage();
  const currentLang = language || contextLanguage;

  const title = currentLang === "ja" ? "抱負" : "Aspiration";
  const emptyMessage =
    currentLang === "ja" ? "まだ抱負はありません。" : "No aspirations yet.";

  return (
    <div className="fade-in">
      <header className="mb-16">
        <h1 className="font-serif text-display mb-4">{title}</h1>
      </header>

      <MemoList
        memos={aspirations}
        basePath="/aspiration"
        emptyMessage={emptyMessage}
        showDate={false}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const language = (query.lang as string) || "en";
  const aspirations = getAllAspirations(language);

  return {
    props: {
      aspirations,
      language,
    },
  };
};
