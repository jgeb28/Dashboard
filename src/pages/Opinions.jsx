import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";
import WidgetContainer from "../components/WidgetContainer";
import Table from "../components/subpages/Table";
import DropDownMenu from "../components/DropDownMenu";
import OutlineButton from "../components/OutlineButton";

export default function Opinions() {
  const { t } = useTranslation();
  const { userId } = useUser();
  const opinionsPerPage = 8;

  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("positive");
  const [filteredOpinions, setFilteredOpinions] = useState([]);
  const [paginatedOpinions, setPaginatedOpinions] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchOpinions = async () => {
      try {
        const filterParam = category !== "all" ? `/${category}` : "";
        const response = await fetch(`http://localhost:8080/api/opinions${filterParam}/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch opinions");
        const data = await response.json();
        setFilteredOpinions(data);
        setPage(0); 
      } catch (error) {
        console.error("Error fetching opinions:", error);
      }
    };

    fetchOpinions();
  }, [userId, category]);

  useEffect(() => {
    setPaginatedOpinions(
      filteredOpinions.slice(
        page * opinionsPerPage,
        (page + 1) * opinionsPerPage
      )
    );
  }, [page, filteredOpinions]);

  const totalPages = Math.ceil(filteredOpinions.length / opinionsPerPage);

  const handlePreviousClick = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (page < totalPages - 1) setPage(prev => prev + 1);
  };

  return (
    <WidgetContainer className="m-4" title={t("opinionPage.title")}>
      <div className="px-12 py-4">
        <DropDownMenu
          label={t("opinionPage.filter")}
          options={[
            { label: t("opinionPage.positive"), value: "positive" },
            { label: t("opinionPage.negative"), value: "negative" },
            { label: t("opinionPage.all"), value: "all" },
          ]}
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <Table
          columns={[
            "ID",
            t("opinionPage.rate"),
            t("opinionPage.comment"),
            t("opinionPage.category"),
            t("details"),
          ]}
          data={paginatedOpinions.map((opinion, index) => ({
            id: page * opinionsPerPage + index + 1,
            rate: `${opinion.rate}/5`,
            comment: opinion.description,
            category: opinion.rate >= 3
              ? t("opinionPage.positive")
              : t("opinionPage.negative"),
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

