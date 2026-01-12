import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * 初回訪問時にlocalStorageから言語を取得してURLに設定するコンポーネント
 * URLに?langがない場合のみ動作
 */
const LanguageInitializer = () => {
  const router = useRouter();

  useEffect(() => {
    // routerの準備ができるまで待つ
    if (!router.isReady) return;

    // すでにURLにlangが設定されている場合は何もしない
    if (router.query.lang) return;

    // localStorageから言語を取得
    let preferredLang = "en";
    try {
      const saved = localStorage.getItem("preferredLanguage");
      if (saved === "ja" || saved === "en") {
        preferredLang = saved;
      } else {
        // ブラウザの言語設定を確認
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("ja")) {
          preferredLang = "ja";
        }
      }
    } catch (e) {
      // localStorage使用不可の場合は英語をデフォルト
    }

    // URLにlangを追加（shallowで更新してリロードを避ける）
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, lang: preferredLang },
      },
      undefined,
      { shallow: true }
    );
  }, [router.isReady, router.query.lang, router.pathname]);

  return null;
};

export default LanguageInitializer;

