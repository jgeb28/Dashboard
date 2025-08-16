import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WidgetContainer from "../components/WidgetContainer";
import OutlineButton from "../components/OutlineButton";
import Table from "../components/subpages/Table";
import SalesQualityWidget from "../components/SalesQualityWidget";
import { useUser } from "../contexts/UserContext";

export default function Quality() {
  const { t } = useTranslation();
  const { userId } = useUser();
  const ordersPerPage = 5;

  const [page, setPage] = useState(0);
  const [paginatedAspects, setPaginatedAspects] = useState([]);
  const [allAspects, setAllAspects] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchAspects = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/aspects`);
        if (!response.ok) throw new Error("Failed to fetch aspects");
        const data = await response.json();
        setAllAspects(data);
        setPage(0);
      } catch (error) {
        console.error("Error fetching aspects:", error);
      }
    };

    fetchAspects();
  }, [userId]);

  useEffect(() => {
    setPaginatedAspects(
      allAspects.slice(page * ordersPerPage, (page + 1) * ordersPerPage)
    );
  }, [page, allAspects]);

  const totalPages = Math.ceil(allAspects.length / ordersPerPage);

  const handlePreviousClick = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (page < totalPages - 1) setPage(prev => prev + 1);
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
          data={paginatedAspects.map((aspect, index) => ({
            id: page * ordersPerPage + index + 1,
            aspect: aspect.Name,
            points: aspect.points,
            scale: aspect.scale,
          }))}
        />

        <div className="flex gap-4 mt-4 justify-end">
          <OutlineButton onClick={handlePreviousClick} disabled={page === 0}>
            {t("previous")}
          </OutlineButton>

          <OutlineButton onClick={handleNextClick} disabled={page >= totalPages - 1}>
            {t("next")}
          </OutlineButton>
        </div>
      </div>
    </WidgetContainer>
  );
}
