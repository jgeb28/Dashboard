import WidgetContainer from "../components/WidgetContainer";
import SaleAspectListItem from "./SaleAspctListItem";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";

export default function SalesQualityWidget({ title, className = "h-[160px] w-[500px]" }) {
  const { userId } = useUser();
  const [scoreData, setScoreData] = useState({ score: 0, scale: 0 });
  const [worstAspects, setWorstAspects] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId) return;

    const fetchScoreAndAspects = async () => {
      try {
        const scoreRes = await fetch(`http://localhost:8080/api/users/${userId}/score`);
        if (!scoreRes.ok) throw new Error("Failed to fetch score");
        const scoreJson = await scoreRes.json();
        setScoreData(scoreJson);

        const aspectsRes = await fetch(`http://localhost:8080/api/users/${userId}/aspects/worst`);
        if (!aspectsRes.ok) throw new Error("Failed to fetch worst aspects");
        const aspectsJson = await aspectsRes.json();
        setWorstAspects(aspectsJson);
      } catch (error) {
        console.error("Error fetching sales quality data:", error);
      }
    };

    fetchScoreAndAspects();
  }, [userId]);

  const getCategory = (score, scale) => {
    const percentage = (score / scale) * 100;

    if (percentage <= 20) return t("sellerCategories.worstSeller");
    if (percentage <= 40) return t("sellerCategories.badSeller");
    if (percentage <= 60) return t("sellerCategories.normalSeller");
    if (percentage <= 80) return t("sellerCategories.goodSeller");
    if (percentage <= 100) return t("sellerCategories.superSeller");

  };

  return (
    <WidgetContainer title={title} className={` ${className}`}>
      <div className="flex justify-between">
        <div className="flex">
          <div className="m-3">
            <img src="/star_filled.svg" className="h-20" />
          </div>
          <div className="flex flex-col m-3">
            <div className="text-[16px] mb-2">
              {t("salesQualityWidget.score")} {scoreData.score}/{scoreData.scale}
            </div>
            <div className="text-[16px]">{t("salesQualityWidget.rankLabel")}</div>
            <div className="text-[16px]">{getCategory(scoreData.score, scoreData.scale)}</div>
          </div>
        </div>
        <div className="flex flex-col mb-1 mt-2 mx-3 items-center">
          <div className="mb-2 text-[12px]">{t("salesQualityWidget.aspectsToImprove")}</div>
          {worstAspects.map((aspect) => (
            <SaleAspectListItem key={aspect.Id} name={aspect.Name} />
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
}
