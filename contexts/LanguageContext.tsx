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

  // Set isClient flag once component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't update language state on server or during hydration
  useEffect(() => {
    if (!isClient || !router.isReady) return;

    const urlLang = router.query.lang as string;

    if (urlLang && (urlLang === "en" || urlLang === "ja")) {
      setLanguageState(urlLang);

      // Only attempt localStorage in a try/catch on client
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("preferredLanguage", urlLang);
        } catch (e) {
          console.warn("Could not access localStorage", e);
        }
      }
    } else {
      // Try to get from localStorage, but only on client
      if (typeof window !== "undefined") {
        try {
          const savedLang = localStorage.getItem("preferredLanguage");
          if (savedLang && (savedLang === "en" || savedLang === "ja")) {
            setLanguageState(savedLang);

            // Add to URL if missing, but only when router is ready
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
    }
  }, [router.isReady, router.query.lang, isClient]);

  // Safe language change function
  const setLanguage = (lang: string) => {
    if (!isClient || lang === language) return;

    setLanguageState(lang);

    // Safeguarded client-side operations
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("preferredLanguage", lang);

        // Hard navigation to update the URL and refresh the page
        window.location.href = `${window.location.pathname}?lang=${lang}`;
      } catch (e) {
        console.error("Error during language change:", e);
        // Fallback to router if window operations fail
        if (router.isReady) {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, lang },
          });
        }
      }
    }
  };

  // Provide a stable value - language only changes client-side after hydration
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
