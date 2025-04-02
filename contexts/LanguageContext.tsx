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
  const [language, setLanguageState] = useState<string>("en");
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // クライアントサイドで実行されていることを確認するフラグを設定
  useEffect(() => {
    setIsClient(true);
  }, []);

  // URLとローカルストレージから言語設定を読み込む
  useEffect(() => {
    if (!isClient || !router.isReady) return;

    const urlLang = router.query.lang as string;

    if (urlLang && (urlLang === "en" || urlLang === "ja")) {
      setLanguageState(urlLang);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("preferredLanguage", urlLang);
        }
      } catch (e) {
        console.warn("Could not access localStorage", e);
      }
    } else {
      // ローカルストレージから言語設定を読み込む
      try {
        if (typeof window !== "undefined") {
          const savedLang = localStorage.getItem("preferredLanguage");
          if (savedLang && (savedLang === "en" || savedLang === "ja")) {
            setLanguageState(savedLang);

            // URLにlangパラメータがなければ追加
            if (!urlLang) {
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
        }
      } catch (e) {
        console.warn("Could not access localStorage", e);
      }
    }

    setIsInitialized(true);
  }, [router.isReady, router.query.lang, isClient]);

  // 言語を変更する関数
  const setLanguage = (lang: string) => {
    if (lang !== language) {
      setLanguageState(lang);

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("preferredLanguage", lang);

          // URL を構築し、ページを再読み込み
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("lang", lang);
          window.location.href = newUrl.toString();
        }
      } catch (e) {
        console.error("Error updating language", e);
        // フォールバック: Next.jsルーターを使用
        if (router.isReady) {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, lang },
          });
        }
      }
    }
  };

  // 子コンポーネントの条件付きレンダリング
  // isInitializedフラグがtrueになるまで子コンポーネントをレンダリングしない
  // これにより、サーバーサイドレンダリングとクライアントサイドレンダリングの不一致を防ぐ
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
