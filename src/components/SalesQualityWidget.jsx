import WidgetContainer from "../components/WidgetContainer";
import SaleAspectListItem from "./SaleAspctListItem";
import { aspects } from "../data/aspects";
import { useTranslation } from "react-i18next";

export default function SalesQualityWidget({ title, className = "h-[160px] w-[500px]" }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const { t } = useTranslation();

  const userAspects = aspects.filter((aspect) => aspect.userId === userId);

  const getLowestAspects = () => {
    if (!userAspects || userAspects.length === 0) return [];

    const aspectsWithScores = userAspects.map((aspect) => ({
      ...aspect,
      score: aspect.points / aspect.scale,
    }));

    aspectsWithScores.sort((a, b) => a.score - b.score);

    return aspectsWithScores.slice(0, 3);
  };

  const calcPoints = () => {
    return userAspects.reduce((acc, curr) => acc + curr.points, 0);
  };

  const calcAllPoints = () => {
    return userAspects.reduce((acc, curr) => acc + curr.scale, 0);
  };

  const getCategory = (score) => {
    if (score <= 10) return t("sellerCategories.worstSeller");
    if (score <= 20) return t("sellerCategories.badSeller");
    if (score <= 30) return t("sellerCategories.normalSeller");
    if (score <= 40) return t("sellerCategories.goodSeller");
    if (score <= 50) return t("sellerCategories.bestSeller");
  };

  return (
    <WidgetContainer title={title} className={` ${className}`}>
      <div className="flex justify-between">
        <div className="flex">
          <div className="m-3">
            <img src="/star_filled.svg" className="h-20"></img>
          </div>
          <div className="flex flex-col m-3">
            <div className="text-[16px] mb-2">
              {t("salesQualityWidget.score")} {calcPoints()}/{calcAllPoints()}
            </div>
            <div className="text-[16px]">
              {t("salesQualityWidget.rankLabel")}
            </div>
            <div className="text-[16px]">{getCategory(calcPoints())}</div>
          </div>
        </div>
        <div className="flex flex-col mb-1 mt-2 mx-3 items-center">
          <div className="mb-2 text-[12px]">
            {t("salesQualityWidget.aspectsToImprove")}
          </div>
          {getLowestAspects()?.map((aspect, index) => (
            <SaleAspectListItem key={index} name={aspect.aspect} />
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
}
