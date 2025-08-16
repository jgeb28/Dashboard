import SalesQualityWidget from "../components/SalesQualityWidget";

import { useTranslation } from "react-i18next";
import OrdersWidget from "../components/OrdersWidget";
import RankingWidget from "../components/RankingWidget";
import OpinionsWidget from "../components/OpinionsWidget";
import SalesChartWidget from "../components/SalesChartWidget";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray dark:bg-dark dark:text-white relative">
      <div className="absolute top-[-48px] left-[40px]">
        {t('dailyTipLabel')}: {t('dailyTip')}
      </div>
        <div className="flex flex-col gap-[10px] m-3">
          <div className="flex flex-wrap gap-[10px] max-w-[1030px]">
            <div className=''><SalesQualityWidget title={t('dashboardPage.salesQualityWidgetTitle')}/></div>
            <div className=''> <OrdersWidget title={t('dashboardPage.ordersWidgetTitle')} /></div>
          </div>
          <div className="flex flex-wrap gap-[10px] max-w-[1030px]">
            <div className=''><RankingWidget title={t('dashboardPage.rankingWigetTitle')} /></div>
            <div className="flex flex-col  max-w-[600px]">
              <SalesChartWidget title={t('dashboardPage.salesChartWidgetTitle')} />
              <OpinionsWidget title={t('dashboardPage.opinionsWidgetTitle')} />
            </div>
          </div>
        </div>
      </div>
  );
}