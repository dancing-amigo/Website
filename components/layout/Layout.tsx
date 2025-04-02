import Head from "next/head";
import Header from "./Header";
import { useLanguage } from "../../contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title = "My Personal Website" }: LayoutProps) => {
  const { language } = useLanguage();

  const siteTitle =
    language === "ja" ? "個人ウェブサイト" : "My Personal Website";
  const finalTitle = title || siteTitle;

  const description =
    language === "ja"
      ? "週間メモ、原則、そして仕事を共有する個人ウェブサイト"
      : "Personal website with weekly memos, principles, and work";

  return (
    <>
      <Head>
        <title>{finalTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content={language} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-12">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()}{" "}
          {language === "ja" ? "個人ウェブサイト" : "My Personal Website"}
        </p>
      </footer>
    </>
  );
};

export default Layout;
