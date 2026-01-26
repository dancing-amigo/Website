import Link from "next/link";
import { Post } from "../types";
import ArticleCard from "./memo/ArticleCard";

interface MemoListProps {
  memos: Post[];
  basePath?: string;
  emptyMessage?: string;
  showDate?: boolean;
}

const MemoList = ({
  memos,
  basePath = "/memo",
  emptyMessage = "No memos found.",
  showDate = true,
}: MemoListProps) => {
  if (memos.length === 0) {
    return <p className="text-center py-10">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-8">
      {memos.map((memo) => (
        <ArticleCard
          key={memo.slug}
          memo={memo}
          basePath={basePath}
          showDate={showDate}
        />
      ))}
    </div>
  );
};

export default MemoList;
