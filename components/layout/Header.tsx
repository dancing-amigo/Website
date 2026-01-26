import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "../../contexts/LanguageContext";

const Header = () => {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const navItems = [
    {
      name: language === "ja" ? "ホーム" : "Home",
      path: "/",
    },
    {
      name: language === "ja" ? "メモ" : "Memo",
      path: "/memo",
    },
    {
      name: language === "ja" ? "世界観" : "Worldview",
      path: "/worldview",
    },
    {
      name: language === "ja" ? "原則" : "Principals",
      path: "/principals",
    },
    {
      name: language === "ja" ? "抱負" : "Aspiration",
      path: "/aspiration",
    },
  ];

  const createLinkHref = (pathname: string) => ({
    pathname,
    query: { lang: language },
  });

  const toggleLanguage = () => {
    setLanguage(language === "ja" ? "en" : "ja");
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(path);
  };

  return (
    <header className="px-6 py-8">
      <nav className="flex items-baseline">
        {/* ナビゲーション - 左側 */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={createLinkHref(item.path)}
                className={`text-small transition-opacity ${
                  isActive(item.path)
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 言語切り替え - 右端 */}
        <button
          onClick={toggleLanguage}
          className="text-small text-muted hover:text-primary transition-colors ml-auto leading-none"
        >
          {language === "ja" ? "EN" : "JP"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
