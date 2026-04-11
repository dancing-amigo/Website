import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: LayoutProps) => {
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

      <div className="min-h-screen bg-background text-primary">
        <Header />
        <main className="site-shell pb-16 md:pb-24">{children}</main>
      </div>
      <Analytics />
    </>
  );
};

export default Layout;
