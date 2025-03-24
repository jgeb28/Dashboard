import ChartComponent from "./ChartComponent";
import WidgetContainer from "./WidgetContainer";

export default function SalesChartWidget({title}) {
    return (
     <WidgetContainer title={title} className="flex flex-col mb-3 w-[600px] h-[290px]">
        <ChartComponent />
     </WidgetContainer>
    );
}