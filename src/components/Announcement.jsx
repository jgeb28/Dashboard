import { useTranslation } from "react-i18next";

export default function Announcement({ subtext = "" }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-10">
      <h2>{t("noDataToDisplay")}</h2>
      <p>{subtext}</p>
    </div>
  );
}
