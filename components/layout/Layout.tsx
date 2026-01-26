import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const defaultTitle = "Takeshi Hashimoto";
  const finalTitle = title || defaultTitle;

  return (
    <>
      <Head>
        <title>{finalTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container-narrow py-8 md:py-12">
          {children}
        </main>

        <footer className="container-narrow py-12 border-t border-border">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-small text-muted">
            <span>© {new Date().getFullYear()} Takeshi Hashimoto</span>
            <span className="text-muted/40">·</span>
            <a
              href="https://x.com/dancing_amigo"
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              X（@dancing_amigo）
            </a>
          </div>
        </footer>
      </div>

      <Analytics />
    </>
  );
};

export default Layout;
