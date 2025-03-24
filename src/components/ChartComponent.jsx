import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DropDownMenu from './DropDownMenu'; 
import OutlineButton from './OutlineButton';
import { useTranslation } from 'react-i18next';
import mockedDataTable from '../data/chartData';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function ChartComponent() {
  const [selectedOption, setSelectedOption] = useState('day'); 
  const [selectedData, setSelectedData] = useState('revenue'); 
  const [chartType, setChartType] = useState('line'); 

  const { t } = useTranslation();

  const dayData = mockedDataTable.filter(item => item.period === 'day'|| !item.period);
  const weekData = mockedDataTable.filter(item => item.period === 'week');
  const monthData = mockedDataTable.filter(item => item.period === 'month');
  console.log(monthData)

  const chartData = {
    day: {
      labels: dayData.map(item =>  {
        let date = new Date(item.date)
        const formattedHour = date.getHours().toString().padStart(2, '0') + ':00';
  
        return formattedHour;
      }),
      revenue: dayData.map(item => item.revenue),
      itemsSold: dayData.map(item => item.itemsSold),
    },
    week: {
      labels: weekData.map(item => item.date.slice(5,10)),
      revenue: weekData.map(item => item.revenue),
      itemsSold: weekData.map(item => item.itemsSold),
    },
    year: {
      labels: monthData.map(item => item.date.slice(0,7)),
      revenue: monthData.map(item => item.revenue),
      itemsSold: monthData.map(item => item.itemsSold),
    },
  };

  const data = {
    labels: chartData[selectedOption].labels,
    datasets: [
      {
        label: selectedData === 'revenue' ? t('chartDataFilter.revenue') : t('chartDataFilter.itemsSold'),
        data: selectedData === 'revenue' ? chartData[selectedOption].revenue : chartData[selectedOption].itemsSold,
        fill: false,
        borderColor: selectedData === 'revenue' ? 'rgb(116, 75, 192)' : 'rgb(75, 192, 192)',
        backgroundColor: selectedData === 'revenue' ? 'rgba(116, 75, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)', // Background color for bar chart
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  const periodOptions = [
    { label: "chartPeriodFilter.day", value: "day" },
    { label: "chartPeriodFilter.week", value: "week" },
    { label: "chartPeriodFilter.year", value: "year" }
  ];
  const dataOptions = [
    { label: "chartDataFilter.revenue", value: "revenue" },
    { label: "chartDataFilter.itemsSold", value: "itemsSold" }
  ];
  const typeOptions = [
    { label: "chartTypeFilter.bar", value: "bar" },
    { label: "chartTypeFilter.line", value: "line" }
  ];
  return (
    <div className="mx-6 h-[200px]">
        {chartType === 'line' ? (
            <Line data={data} options={options} />
        ) : (
            <Bar data={data} options={options} />
        )}
        <div className='flex items-center mt-2'>
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
