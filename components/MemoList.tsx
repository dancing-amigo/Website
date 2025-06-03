import Link from "next/link";
import { Post } from "../types";
import ArticleCard from "./memo/ArticleCard";

interface MemoListProps {
  memos: Post[];
}

const MemoList = ({ memos }: MemoListProps) => {
  if (memos.length === 0) {
    return <p className="text-center py-10">No memos found.</p>;
  }

  return (
    <div className="space-y-8">
      {memos.map((memo) => (
        <ArticleCard key={memo.slug} memo={memo} />
      ))}
    </div>
  );
};

export default MemoList;
