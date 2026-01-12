import { useLanguage } from "../../contexts/LanguageContext";

interface WorkItem {
  title: string;
  description: {
    ja: string;
    en: string;
  };
  url: string;
}

const works: WorkItem[] = [
  {
    title: "Singular Radio",
    description: {
      ja: "テクノロジー、思考、未来について語るPodcast",
      en: "A podcast about technology, thinking, and the future",
    },
    url: "https://www.youtube.com/@SingularRadio",
  },
  {
    title: "Laplace",
    description: {
      ja: "戦略と確率のボードゲーム",
      en: "A board game of strategy and probability",
    },
    url: "https://www.laplace.zone/",
  },
  {
    title: "YouTube",
    description: {
      ja: "個人チャンネル",
      en: "Personal channel",
    },
    url: "https://www.youtube.com/@takeshi-hashimoto",
  },
  {
    title: "X",
    description: {
      ja: "@dancing_amigo",
      en: "@dancing_amigo",
    },
    url: "https://x.com/dancing_amigo",
  },
];

export default function WorkPage() {
  const { language } = useLanguage();

  const title = language === "ja" ? "作品" : "Work";

  return (
    <div className="fade-in">
      <header className="mb-16">
        <h1 className="font-serif text-display">{title}</h1>
      </header>

      <div className="space-y-0">
        {works.map((work, index) => (
          <a
            key={work.url}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-8 border-b border-border first:border-t"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl group-hover:opacity-60 transition-opacity">
                  {work.title}
                </h2>
                <p className="mt-1 text-muted text-small">
                  {work.description[language as "ja" | "en"]}
                </p>
              </div>
              <span className="text-muted text-small shrink-0 group-hover:opacity-60 transition-opacity">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
