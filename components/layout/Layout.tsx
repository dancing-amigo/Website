import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/next";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const menuItems = ["Ethos", "Logos", "Pathos"];

const Layout = ({ children, title, description }: LayoutProps) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
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
              ? "absolute inset-x-0 top-0 z-20 py-8 text-white/90"
              : "site-shell py-10"
          }
        >
          <div
            className={
              isHome
                ? "flex items-center justify-between px-12 md:px-20"
                : "flex items-center justify-between"
            }
          >
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="font-display text-3xl leading-none drop-shadow">
              Takeshi Hashimoto
            </a>
            <nav aria-label="Primary">
              <ul
                className={
                  isHome
                    ? "flex gap-6 text-base font-medium tracking-[0.16em] text-white/80 drop-shadow md:gap-10"
                    : "flex gap-6 text-base font-medium tracking-[0.16em] text-muted md:gap-10"
                }
              >
                {menuItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className={isHome ? "hover:text-white" : "hover:text-primary"}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main className={isHome ? "" : "site-shell pb-16 md:pb-24"}>{children}</main>
      </div>
      <Analytics />
    </>
  );
};

export default Layout;
