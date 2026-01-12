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

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {tags.map(({ tag }) => (
        <Link
          key={tag}
          href={{
            pathname: `/memo/tag/${tag}`,
            query: { lang: language },
          }}
          className="text-small text-muted hover:text-primary transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagCloud;
