import { SectionKey } from "../../types";
import { getSectionMeta } from "../../utils/sections";

interface SectionHeroProps {
  section: SectionKey;
}

const SectionHero = ({ section }: SectionHeroProps) => {
  const meta = getSectionMeta(section);

  return (
    <header className="mb-6 md:mb-8">
      <h1 className="font-display text-2xl leading-[0.95] tracking-[-0.05em] md:text-4xl">
        {meta.title}
      </h1>
    </header>
  );
};

export default SectionHero;
