import Link from "next/link";
import { useRouter } from "next/router";
import { SectionKey } from "../../types";
import { getSectionMeta } from "../../utils/sections";

const sections: SectionKey[] = [
  "self-definition",
  "viewprint",
  "artifacts",
];

const Header = () => {
  const router = useRouter();

  const isActive = (section: SectionKey) => {
    const path = `/${section}`;
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="site-shell pt-10 pb-6 md:pt-10 md:pb-8">
      <div className="flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <Link
          href="/"
          className="font-display text-[1.75rem] leading-none tracking-[-0.04em] md:text-[2.2rem]"
        >
          Takeshi Hashimoto
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-col items-start gap-y-3 text-sm uppercase tracking-[0.18em] text-muted md:flex-row md:flex-wrap md:items-end md:gap-x-8 md:gap-y-2 md:pb-1">
            {sections.map((section) => {
              const meta = getSectionMeta(section);
              return (
                <li key={section}>
                  <Link
                    href={`/${section}`}
                    className={isActive(section) ? "text-primary" : "hover:text-primary"}
                  >
                    {meta.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
