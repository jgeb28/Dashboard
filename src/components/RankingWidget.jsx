import WidgetContainer from "../components/WidgetContainer";
import DropDownMenu from "./DropDownMenu";
import OfferListItem from "./OfferListItem";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

import { offers } from "../data/offers";

export default function RankingWidget({ title }) {
  const { userId } = useUser();
  const [selectedOption, setSelectedOption] = useState("mostFrequent")
  const [sortedOffers, setSortedOffers] = useState([])

  const options = [
    { label: "rankingFilter.mostFrequent", value: "mostFrequent" },
    { label: "rankingFilter.leastFrequent", value: "leastFrequent" },
  ];

  useEffect(() => {
    let userOffers = offers.filter((offer) => offer.userId === userId)
    setSortedOffers([...userOffers].sort((a, b) => {
      return selectedOption === "mostFrequent" ? b.units - a.units : a.units - b.units;
    }));
  }, [selectedOption, userId])


  return (
    <WidgetContainer
      title={title}
      className="overflow-hidden flex flex-col h-[450px] w-[400px]"
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