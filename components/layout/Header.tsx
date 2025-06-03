import Link from "next/link";
import { useRouter } from "next/router";
import LanguageSwitcher from "../language/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";

const Header = () => {
  const router = useRouter();
  const { language } = useLanguage();

  const navItems = [
    {
      name: language === "ja" ? "メモ" : "Memo",
      path: "/memo",
    },
    {
      name: language === "ja" ? "原則" : "Principles",
      path: "/principles",
    },
    {
      name: language === "ja" ? "作品" : "Work",
      path: "/work",
    },
  ];

  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link
          href={{ pathname: "/", query: { lang: language } }}
          className="text-2xl font-bold mb-4 sm:mb-0"
        >
          Takeshi Hashimoto
        </Link>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <LanguageSwitcher />

          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={{
                      pathname: item.path,
                      query: { lang: language },
                    }}
                    className={
                      router.pathname.startsWith(item.path)
                        ? "font-bold text-black"
                        : "text-gray-600 hover:text-black"
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
