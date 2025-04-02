import Head from "next/head";
import Header from "./Header";
import NoSSR from "../utils/NoSSR";
import { useLanguage } from "../../contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const { language } = useLanguage();

  // Provide a fixed title so it's the same on server and client
  // This prevents hydration mismatch with titles
  const defaultTitle = "Takeshi Hashimoto";
  const finalTitle = title || defaultTitle;

  return (
    <>
      <Head>
        <title>{finalTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoSSR>
        <Header />
      </NoSSR>

      <main className="container mx-auto px-4 py-8">{children}</main>

      <NoSSR>
        <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-12">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Takeshi Hashimoto
          </p>
        </footer>
      </NoSSR>
    </>
  );
};

export default Layout;
