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

  // URL から言語を取得して設定
  useEffect(() => {
    const urlLang = router.query.lang as string;
    if (urlLang && (urlLang === "en" || urlLang === "ja")) {
      setLanguageState(urlLang);
      localStorage.setItem("preferredLanguage", urlLang);
    } else {
      // localStorage から言語設定を読み込む
      const savedLang =
        typeof window !== "undefined"
          ? localStorage.getItem("preferredLanguage")
          : null;
      if (savedLang && (savedLang === "en" || savedLang === "ja")) {
        setLanguageState(savedLang);
        // URL に言語パラメータがない場合は追加
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
  }, [router.query.lang, router.pathname]);

  // 言語を変更する関数
  const setLanguage = (lang: string) => {
    // 現在の言語と異なる場合のみ処理
    if (lang !== language) {
      setLanguageState(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("preferredLanguage", lang);
      }

      // URL を構築し、ハードリロードのためにwindow.locationを使用
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("lang", lang);
      window.location.href = newUrl.toString();

      // 前のコードを削除または置き換え
      // router.replace(...)
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
