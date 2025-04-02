import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  // Important: Initialize with a default value and only update after client-side code runs
  const [language, setLanguageState] = useState<string>("en");
  // Track if we're on client side
  const [isClient, setIsClient] = useState(false);

  // This effect runs once to set isClient true
  useEffect(() => {
    setIsClient(true);
  }, []);

  // URL から言語を取得して設定 - only runs on client
  useEffect(() => {
    if (!isClient) return;

    const urlLang = router.query.lang as string;
    if (urlLang && (urlLang === "en" || urlLang === "ja")) {
      setLanguageState(urlLang);
      try {
        localStorage.setItem("preferredLanguage", urlLang);
      } catch (e) {
        console.warn("Could not access localStorage", e);
      }
    } else {
      // localStorage から言語設定を読み込む
      try {
        const savedLang = localStorage.getItem("preferredLanguage");
        if (savedLang && (savedLang === "en" || savedLang === "ja")) {
          setLanguageState(savedLang);
          // URL に言語パラメータがない場合は追加
          if (!urlLang && router.isReady) {
            router.replace(
              {
                pathname: router.pathname,
                query: { ...router.query, lang: savedLang },
              },
              undefined,
              { shallow: true }
            );
          }
        }
      } catch (e) {
        console.warn("Could not access localStorage", e);
      }
    }
  }, [router.query.lang, router.pathname, router.isReady, isClient]);

  // 言語を変更する関数
  const setLanguage = (lang: string) => {
    // 現在の言語と異なる場合のみ処理
    if (lang !== language) {
      setLanguageState(lang);

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("preferredLanguage", lang);
        }
      } catch (e) {
        console.warn("Could not access localStorage", e);
      }

      // URL を構築し、ハードリロードのためにwindow.locationを使用
      try {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("lang", lang);
        window.location.href = newUrl.toString();
      } catch (e) {
        console.error("Error updating URL", e);
        // Fallback method if URL manipulation fails
        if (router.isReady) {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, lang },
          });
        }
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
