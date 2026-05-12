import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContentEntry } from "../types";
import { getEntriesByDirectory } from "../utils/content";

interface HeroContent {
  id: string;
  href: string;
  label: "Ethos" | "Logos" | "Pathos";
  title: string;
  excerpt: string;
}

interface HomeProps {
  heroContents: HeroContent[];
}

const ethosHeroContent: HeroContent = {
  id: "ethos",
  href: "/ethos",
  label: "Ethos",
  title: "世界を探究し、理解し、継承する。",
  excerpt:
    "人生のテーマ",
};

function entryToHeroContent(
  entry: ContentEntry,
  label: "Logos" | "Pathos"
): HeroContent {
  return {
    id: entry.slug,
    href: `/${entry.slug}`,
    label,
    title: entry.title,
    excerpt: entry.excerpt || entry.date || label,
  };
}

function shuffleContents(contents: HeroContent[]) {
  return [...contents].sort(() => Math.random() - 0.5);
}

export default function Home({ heroContents }: HomeProps) {
  const [contents, setContents] = useState(heroContents);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const activeContent = contents[activeIndex] || heroContents[0];

  useEffect(() => {
    setContents(shuffleContents(heroContents));
    setActiveIndex(0);
    setCycle(0);
  }, [heroContents]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;

        if (nextIndex >= contents.length) {
          setContents(shuffleContents(heroContents));
          setCycle((currentCycle) => currentCycle + 1);
          return 0;
        }

        setCycle((currentCycle) => currentCycle + 1);
        return nextIndex;
      });
    }, 7600);

    return () => window.clearInterval(timer);
  }, [contents.length, heroContents]);

  return (
    <div className="fade-in">
      <section
        className="relative flex min-h-screen items-center overflow-hidden bg-black"
        style={{ minHeight: "100dvh" }}
      >
        <div className="absolute inset-0 bg-[url('/hero-space-mobile.png')] bg-cover bg-center md:bg-[url('/hero-space.png')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/55" />
        <div className="hero-toc-layer" aria-live="polite">
          <Link
            key={`${activeContent.id}-${cycle}`}
            href={activeContent.href}
            className="hero-toc-card group"
          >
            <span className="mb-4 block text-xs uppercase tracking-[0.42em] text-white/65 md:text-sm">
              {activeContent.label}
            </span>
            <span className="block font-display text-3xl leading-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] transition-colors group-hover:text-white/85 md:whitespace-nowrap md:text-5xl">
              {activeContent.title}
            </span>
            <span className="mt-5 block max-w-[34rem] text-sm leading-7 text-white/78 drop-shadow md:text-base md:leading-8">
              {activeContent.excerpt}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const logosContents = getEntriesByDirectory("logos").map((entry) =>
    entryToHeroContent(entry, "Logos")
  );
  const pathosContents = getEntriesByDirectory("pathos").map((entry) =>
    entryToHeroContent(entry, "Pathos")
  );

  return {
    props: {
      heroContents: [ethosHeroContent, ...logosContents, ...pathosContents],
    },
  };
};
