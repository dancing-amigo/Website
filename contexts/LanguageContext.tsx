import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/router";

type Language = "en" | "ja";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

// URLクエリから言語を取得するヘルパー
export function getLanguageFromQuery(query: { lang?: string }): Language {
  const lang = query.lang;
  if (lang === "ja" || lang === "en") {
    return lang;
  }
  return "en";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  // URLクエリから言語を取得（唯一の信頼できるソース）
  const language = useMemo<Language>(() => {
    return getLanguageFromQuery(router.query as { lang?: string });
  }, [router.query]);

  // 言語を変更する関数
  const setLanguage = useCallback(
    (newLang: Language) => {
      if (newLang === language) return;

      // localStorageに保存（次回訪問時のデフォルト用）
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("preferredLanguage", newLang);
        } catch (e) {
          // localStorage使用不可の場合は無視
        }
      }

      // URLを更新（shallow: falseでgetServerSidePropsを再実行し、記事データを再取得）
      const newQuery = { ...router.query, lang: newLang };
      router.push({
        pathname: router.pathname,
        query: newQuery,
      });
    },
    [language, router]
  );

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
