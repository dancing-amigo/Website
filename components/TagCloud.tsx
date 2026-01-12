import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

interface TagCloudProps {
  tags: { tag: string; count: number }[];
}

const TagCloud = ({ tags }: TagCloudProps) => {
  const { language } = useLanguage();

  if (tags.length === 0) {
    return null;
  }

  // Calculate font size based on tag count
  const maxCount = Math.max(...tags.map((tag) => tag.count));
  const getSize = (count: number) => {
    const min = 0.8;
    const max = 1.6;
    return min + (count / maxCount) * (max - min) + "rem";
  };

  const title = language === "ja" ? "タグ" : "Tags";

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={{
              pathname: `/memo/tag/${tag}`,
              query: { lang: language },
            }}
            style={{ fontSize: getSize(count) }}
            className="hover:text-blue-700"
          >
            #{tag} <span className="text-xs text-gray-500">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
