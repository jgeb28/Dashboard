import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/theme-context";
import { useUser } from "../contexts/UserContext";
import { userAccounts } from "../data/users";

export default function UserMenu() {
  const { theme } = useContext(ThemeContext);
  const { userId, changeUser } = useUser();
  const [selectedShop, setSelectedShop] = useState(userId);
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    changeUser(null);
    navigate("/login");
  };

  const handleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeShop = (index) => {
    const newUserId = index;
    setSelectedShop(index);
    changeUser(newUserId);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      const userMenu = document.getElementById("user-menu");
      if (!userMenu.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" id="user-menu">
      <svg
        onClick={handleProfile}
        className="cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.729 35V31.6667C39.729 29.8986 38.8965 28.2029 37.4147 26.9526C35.933 25.7024 33.9233 25 31.8277 25H16.0253C13.9297 25 11.92 25.7024 10.4382 26.9526C8.95647 28.2029 8.12402 29.8986 8.12402 31.6667V35M31.8277 11.6667C31.8277 15.3486 28.2902 18.3333 23.9265 18.3333C19.5628 18.3333 16.0253 15.3486 16.0253 11.6667C16.0253 7.98477 19.5628 5 23.9265 5C28.2902 5 31.8277 7.98477 31.8277 11.6667Z"
          stroke={theme === "dark" ? "white" : "black"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isOpen && (
        <div className="absolute z-50 w-[200px] border border-gray-300 dark:border-dark rounded-lg shadow-md flex flex-col bg-white top-9 right-0 dark:bg-dark-panel">
          {userAccounts.map((store) => (
            <div
              key={store.id}
              onClick={() => handleChangeShop(store.id)}
              className={`flex items-center justify-center p-3 border-b border-gray-300 last:border-none cursor-pointer dark:border-dark ${selectedShop === store.id
                  ? "bg-purple-200 dark:bg-purple-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {store.username}
            </div>
          ))}
          <div
            onClick={handleLogout}
            className="mt-auto flex items-center justify-center p-3 text-purple cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t("logout")}
          </div>
        </div>
      )}
    </div>
  );
}
