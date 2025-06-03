import Head from "next/head";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title = "My Personal Website" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Personal website with memos, principles, and work"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-12">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} My Personal Website
        </p>
      </footer>
    </>
  );
};

export default Layout;
