import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/next";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const menuItems = ["Ethos", "Logos", "Pathos"];

const Layout = ({ children, title, description }: LayoutProps) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pageTitle = title ? `${title} | Takeshi Hashimoto` : "Takeshi Hashimoto";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={description || "Takeshi Hashimoto personal archive"}
        />
      </Head>
      {isHome ? (
        <style jsx global>{`
          body {
            background: #000;
            background-image: none;
          }
        `}</style>
      ) : null}

      <div className="min-h-screen bg-background text-primary">
        <header
          className={
            isHome
              ? "absolute inset-x-0 top-0 z-20 py-10 text-white/90"
              : "site-shell py-10"
          }
        >
          <div
            className={
              isHome
                ? "site-shell relative flex items-center justify-between"
                : "relative flex items-center justify-between"
            }
          >
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-2xl leading-none drop-shadow md:static md:translate-x-0 md:text-3xl"
            >
              Takeshi Hashimoto
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
              className={
                isHome
                  ? "ml-auto flex h-11 w-11 items-center justify-center text-white/90 drop-shadow transition-colors hover:text-white"
                  : "ml-auto flex h-11 w-11 items-center justify-center text-primary transition-colors hover:text-accent"
              }
            >
              <span className="relative block h-4 w-6" aria-hidden="true">
                <span className="absolute left-0 top-0 h-px w-6 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-6 bg-current" />
                <span className="absolute bottom-0 left-0 h-px w-6 bg-current" />
              </span>
            </button>
          </div>
        </header>

        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-30 bg-black/45"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <aside
          className={`fixed inset-y-0 right-0 z-40 w-[min(82vw,22rem)] bg-[#11100f]/95 px-8 py-8 text-white shadow-[-24px_0_80px_rgba(0,0,0,0.32)] backdrop-blur transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!isSidebarOpen}
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-xl leading-none">Menu</p>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
            >
              <span className="relative block h-5 w-5" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>
          <nav aria-label="Primary" className="mt-16">
            <ul className="space-y-8">
              {menuItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className="block font-display text-3xl leading-tight tracking-[0.08em] text-white/82 transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={isHome ? "" : "site-shell pb-16 md:pb-24"}>{children}</main>
      </div>
      <Analytics />
    </>
  );
};

export default Layout;
