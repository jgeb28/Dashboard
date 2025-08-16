import WidgetContainer from "../components/WidgetContainer";
import DropDownMenu from "./DropDownMenu";
import OfferListItem from "./OfferListItem";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

export default function RankingWidget({ title }) {
  const { userId } = useUser();
  const [selectedOption, setSelectedOption] = useState("mostFrequent")
  const [sortedOffers, setSortedOffers] = useState([])

  const options = [
    { label: "rankingFilter.mostFrequent", value: "mostFrequent" },
    { label: "rankingFilter.leastFrequent", value: "leastFrequent" },
  ];

   useEffect(() => {
    if (!userId) return;

    const fetchOffers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/offers/${userId}`); 
        if (!response.ok) throw new Error("Failed to fetch offers");
        const data = await response.json();

        const userOffers = data;
        const sorted = [...userOffers].sort((a, b) =>
          selectedOption === "mostFrequent" ? b.units - a.units : a.units - b.units
        );

        setSortedOffers(sorted);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [userId, selectedOption]);



  return (
    <WidgetContainer
      title={title}
      className="overflow-hidden flex flex-col h-[517px] w-[400px]"
    >
      <div className="ml-auto mr-3 mt-2">
        <DropDownMenu
          options={options}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
      </div>
      <div className="flex flex-col h-[calc(90%)] overflow-auto">
        {sortedOffers.length > 0 ? (
          sortedOffers.map((offer, index) => (
            <OfferListItem
              key={index}
              image={offer.pictureAddr}
              name={offer.name}
              units={offer.units}
              revenue={offer.revenue}
              viewsNumber={offer.numberOfViews}
              showViews={selectedOption === "leastFrequent"}
            />
          ))
        ) : (
          <div className="text-center mt-4 text-gray-500">No offers found.</div>
        )}
      </div>
    </WidgetContainer>
  );
}