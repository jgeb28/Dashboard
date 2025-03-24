import { useState } from "react";
import OpinionListItem from "./OpinionListItem";
import SplitedWidgetContainer from "./SplitedWidgetContainer";
import DropDownMenu from "./DropDownMenu";
import { opinions } from "../data/opinions"; // Import opinions from external file

export default function OpinionsWidget({ title }) {
    const [selectedFilter, setSelectedFilter] = useState("all");

    const options = [
        { label: "opinionsFilter.positive", value: "positive" },
        { label: "opinionsFilter.negative", value: "negative" },
        { label: "opinionsFilter.all", value: "all" }
    ];

    const filteredOpinions = opinions
        .filter(opinion => {
            if (selectedFilter === "positive") return opinion.rate >= 4;
            if (selectedFilter === "negative") return opinion.rate <= 2;
            return true;
        })
        .slice(0, 5);

    return (
        <SplitedWidgetContainer title={title} className="">
            <div className="flex flex-col absolute right-1/2 top-[40px]">
                <div className="ml-auto flex">
                    <DropDownMenu 
                        options={options}
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                    />
                </div>
            </div>

            {filteredOpinions.map((opinion, index) => (
                <OpinionListItem 
                    key={index}
                    rate={opinion.rate}
                    description={opinion.description}
                    className="relative"
                >
                    <div className="absolute bottom-0 left-0 w-[calc(100%-10px)] h-[1px] bg-gray-300"></div>
                </OpinionListItem>
            ))}
        </SplitedWidgetContainer>
    );
}
