import { useLanguage } from "../../contexts/LanguageContext";
import Link from "next/link";

interface WorkItem {
  title: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  url: string;
  icon: string;
  category: "podcast" | "game" | "social";
}

const works: WorkItem[] = [
  {
    title: {
      ja: "Singular Radio",
      en: "Singular Radio",
    },
    description: {
      ja: "テクノロジー、思考、未来について語るPodcast",
      en: "A podcast about technology, thinking, and the future",
    },
    url: "https://www.youtube.com/@SingularRadio",
    icon: "🎙️",
    category: "podcast",
  },
  {
    title: {
      ja: "Laplace",
      en: "Laplace",
    },
    description: {
      ja: "戦略と確率のボードゲーム",
      en: "A board game of strategy and probability",
    },
    url: "https://www.laplace.zone/",
    icon: "🎲",
    category: "game",
  },
  {
    title: {
      ja: "YouTube",
      en: "YouTube",
    },
    description: {
      ja: "個人チャンネル",
      en: "Personal channel",
    },
    url: "https://www.youtube.com/@takeshi-hashimoto",
    icon: "📺",
    category: "social",
  },
  {
    title: {
      ja: "X (Twitter)",
      en: "X (Twitter)",
    },
    description: {
      ja: "@dancing_amigo",
      en: "@dancing_amigo",
    },
    url: "https://x.com/dancing_amigo",
    icon: "𝕏",
    category: "social",
  },
];

export default function WorkPage() {
  const { language } = useLanguage();

  const title = language === "ja" ? "作品" : "Work";
  const subtitle =
    language === "ja"
      ? "私が取り組んでいるプロジェクトや活動"
      : "Projects and activities I'm working on";

  const categoryLabels = {
    podcast: language === "ja" ? "Podcast" : "Podcast",
    game: language === "ja" ? "ゲーム" : "Game",
    social: language === "ja" ? "ソーシャル" : "Social",
  };

  // カテゴリーごとにグループ化
  const groupedWorks = works.reduce((acc, work) => {
    if (!acc[work.category]) {
      acc[work.category] = [];
    }
    acc[work.category].push(work);
    return acc;
  }, {} as Record<string, WorkItem[]>);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-12">{subtitle}</p>

      <div className="space-y-12">
        {Object.entries(groupedWorks).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-lg font-medium text-gray-500 mb-4 uppercase tracking-wide">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((work) => (
                <a
                  key={work.url}
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{work.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {work.title[language as "ja" | "en"]}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {work.description[language as "ja" | "en"]}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

