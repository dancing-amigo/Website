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

      <Header />

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-12">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} Takeshi Hashimoto
        </p>
      </footer>

      <Analytics />
    </>
  );
};

export default Layout;
