import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/theme-context";
import { DarkModeIcon, LightModeIcon } from "../assets/icons";
import UserMenu from "../components/UserMenu";

export default function Layout() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const menu = [
    { name: t("dashboard"), link: "/" },
    { name: t("ordersPage.title"), link: "/orders" },
    { name: t("salesQuality"), link: "/quality" },
    { name: t("opinionPage.title"), link: "/opinions" },
  ];

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "pl" ? "en" : "pl");
  };

  const changeTheme = () => {
    const isDark = theme === "dark";
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <section className="bg-gray dark:bg-dark  min-h-screen">
      <header className="flex w-full bg-white dark:bg-dark-panel py-3 px-4 justify-center">
        <h2 className="flex items-center w-full dark:text-white">
          MyHui Dashboard
        </h2>
        <div className="flex w-full items-center justify-end gap-6 dark:text-white">
          <button
            className="cursor-pointer select-none "
            onClick={changeLanguage}
          >
            {i18n.language.toUpperCase()}
          </button>

          {theme === "dark" ? (
            <LightModeIcon handleClick={changeTheme} />
          ) : (
            <DarkModeIcon handleClick={changeTheme} />
          )}

          <UserMenu />
        </div>
      </header>
      <div className="flex bg-gray dark:bg-dark min-h-screen">
        <aside className="min-h-screen bg-white dark:bg-dark-panel dark:text-white min-w-[250px] ">
          <nav className="list-none">
            {menu.map((item, index) => (
              <li
                key={index}
                className={`${index === 0 ? "border-t" : ""} border-b border-gray-300 dark:border-dark`}
              >
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `block w-full h-full px-4 py-3 ${isActive
                      ? "bg-gray dark:bg-dark"
                      : "border-gray-300 dark:border-dark"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </nav>
        </aside>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
