import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import OutlineButton from "../components/OutlineButton";
import WidgetContainer from "../components/WidgetContainer";
import { users } from "../data/users";
import { useUser } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { changeUser } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      alert(t("loginPage.alerts.success"));
      changeUser(user.id);
      navigate("/");
    } else {
      alert(t("loginPage.alerts.error"));
    }
  };

  return (
    <main className="bg-gray dark:bg-dark min-h-screen flex flex-col">
      <WidgetContainer
        className="w-[600px] m-auto mt-10"
        title={t("loginPage.header")}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-12 max-w-[350px] mx-auto"
        >
          <label>{t("loginPage.username")}</label>
          <Input
            type="text"
            name="username"
            placeholder="Wprowadź nazwę użytkownika..."
            className="mb-4 max-w-[300px]"
          />

          <label>{t("loginPage.password")}</label>
          <Input
            type="password"
            name="password"
            placeholder="Wprowadź hasło..."
            className="mb-4 max-w-[300px]"
          />

          <OutlineButton className="text-purple mt-4">
            {t("loginPage.submit")}
          </OutlineButton>
        </form>
      </WidgetContainer>
    </main>
  );
}
