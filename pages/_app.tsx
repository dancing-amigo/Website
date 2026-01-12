import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { LanguageProvider } from "../contexts/LanguageContext";
import ErrorBoundary from "../components/ErrorBoundary";
import LanguageInitializer from "../components/utils/LanguageInitializer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <LanguageInitializer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
