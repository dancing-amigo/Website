import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const navItems = [
    { name: "Memo", path: "/memo" },
    { name: "Bible", path: "/bible" },
    { name: "Work", path: "/work" },
  ];

  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0">
          Takeshi Hashimoto
        </Link>

        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
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
    </header>
  );
};

export default Header;
