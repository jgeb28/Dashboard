import WidgetContainer from "../components/WidgetContainer";
import { useTranslation } from "react-i18next";
import { aspects } from "../data/aspects";
import { useState, useEffect } from "react";
import OutlineButton from "../components/OutlineButton";
import Table from "../components/subpages/Table";
import SalesQualityWidget from "../components/SalesQualityWidget";
import { useUser } from "../contexts/UserContext";


export default function Quality() {
  const { t } = useTranslation();
  const { userId } = useUser();

  const ordersPerPage = 5;
  const [page, setPage] = useState(0);
  const [paginated, setPaginated] = useState([]);

  useEffect(() => {
    const filteredAspects = aspects.filter(
      (aspect) => aspect.userId === userId
    ).map(({ userId, ...aspect }) => aspect);

    setPaginated(
      filteredAspects.slice(page * ordersPerPage, (page + 1) * ordersPerPage)
    );
  }, [page, userId]);

  const totalPages = Math.ceil(
    aspects.filter((aspect) => aspect.userId === userId).length / ordersPerPage
  );

  const handlePreviousClick = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  return (
    <WidgetContainer className="m-4" title={t("qualityPage.title")}>
      <div className="px-12 py-4">
        <SalesQualityWidget className="mb-12 dark:shadow-dark" />
        <Table
          columns={[
            "ID",
            t("qualityPage.aspect"),
            t("qualityPage.points"),
            t("qualityPage.scale"),
            t("details"),
          ]}
          data={paginated}
        />
        <div className="flex gap-4 mt-4 justify-end">
          <OutlineButton onClick={handlePreviousClick} disabled={page === 0}>
            {t("previous")}
          </OutlineButton>

          <OutlineButton
            onClick={handleNextClick}
            disabled={page >= totalPages - 1}
          >
            {t("next")}
          </OutlineButton>
        </div>
      </div>
    </WidgetContainer>
  );
}
