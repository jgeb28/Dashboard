import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DropDownMenu from "./DropDownMenu";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent() {
  const [selectedOption, setSelectedOption] = useState("day");
  const [selectedData, setSelectedData] = useState("revenue");
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState({ labels: [], revenue: [], itemsSold: [] });
  const { userId } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/orders/${userId}/sales/${selectedOption}`
        );
        if (!response.ok) throw new Error("Failed to fetch chart data");
        const data = await response.json();

        const labels = data.map((item) => {
          const date = new Date(item.period);
          if (selectedOption === "day") {
            return date.getHours().toString().padStart(2, "0") + ":00";
          }
          if (selectedOption === "week") {
            return date.toISOString().slice(5, 10); 
          }
          return date.toISOString().slice(0, 7);
        });

        setChartData({
          labels,
          revenue: data.map((item) => item.revenue),
          itemsSold: data.map((item) => item.itemsSold),
        });
      } catch (error) {
        console.error(error);
        setChartData({ labels: [], revenue: [], itemsSold: [] });
      }
    };

    fetchData();
  }, [userId, selectedOption]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label:
          selectedData === "revenue"
            ? t("chartDataFilter.revenue")
            : t("chartDataFilter.itemsSold"),
        data:
          selectedData === "revenue"
            ? chartData.revenue
            : chartData.itemsSold,
        fill: false,
        borderColor:
          selectedData === "revenue"
            ? "rgb(116, 75, 192)"
            : "rgb(75, 192, 192)",
        backgroundColor:
          selectedData === "revenue"
            ? "rgba(116, 75, 192, 0.2)"
            : "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  const periodOptions = [
    { label: t("chartPeriodFilter.day"), value: "day" },
    { label: t("chartPeriodFilter.week"), value: "week" },
    { label: t("chartPeriodFilter.month"), value: "month" }, 
  ];
  const dataOptions = [
    { label: t("chartDataFilter.revenue"), value: "revenue" },
    { label: t("chartDataFilter.itemsSold"), value: "itemsSold" },
  ];
  const typeOptions = [
    { label: t("chartTypeFilter.bar"), value: "bar" },
    { label: t("chartTypeFilter.line"), value: "line" },
  ];

  return (
    <div className="mx-6 h-[200px]">
      {chartType === "line" ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
      <div className="flex items-center mt-2 gap-2">
        <DropDownMenu
          label="Time Period"
          options={periodOptions}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        <DropDownMenu
          label="Data Type"
          options={dataOptions}
          value={selectedData}
          onChange={(e) => setSelectedData(e.target.value)}
        />
        <DropDownMenu
          label="Chart Type"
          options={typeOptions}
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        />
      </div>
    </div>
  );
}
