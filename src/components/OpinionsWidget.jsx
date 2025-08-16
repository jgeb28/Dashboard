import { useEffect, useState } from "react";
import OpinionListItem from "./OpinionListItem";
import SplitedWidgetContainer from "./SplitedWidgetContainer";
import DropDownMenu from "./DropDownMenu";
import { useUser } from "../contexts/UserContext";


export default function OpinionsWidget({ title }) {
    const { userId } = useUser();
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [userOpinions, setUserOpinions] = useState([]);

    const options = [
        { label: "opinionsFilter.positive", value: "positive" },
        { label: "opinionsFilter.negative", value: "negative" },
        { label: "opinionsFilter.all", value: "all" }
    ];

    useEffect(() => {
        if (!userId) return;

        const fetchOpinions = async () => {
            try {
                const filterParam = selectedFilter !== "all" ? `/${selectedFilter}` : "";
                const response = await fetch(`http://localhost:8080/api/opinions${filterParam}/${userId}`);
                if (!response.ok)
                    throw new Error("Failed to fetch opinions");
                const data = await response.json();
                setUserOpinions(data.slice(0, 5)); 
            } catch (error) {
                console.error("Error fetching opinions:", error);
            }
        };

        fetchOpinions();
    }, [userId, selectedFilter]);

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

            {userOpinions.map((opinion, index) => (
                <OpinionListItem
                    key={index}
                    rate={opinion.rate}
                    description={opinion.description}
                    productName={opinion.productName}
                    className="relative"
                >
                    <div className="absolute bottom-0 left-0 w-[calc(100%-10px)] h-[1px] bg-gray-300"></div>
                </OpinionListItem>
            ))}
        </SplitedWidgetContainer>
    );
}
