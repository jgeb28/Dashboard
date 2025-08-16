import WidgetContainer from "../components/WidgetContainer";
import OrderWidgetCategoryElement from "./OrderWidgetCategoryElement";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";


export default function OrdersWidget({ title }) {

  const { userId } = useUser();
  const [orderStatusCounts, setOrderStatusCounts] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId) return;

    const fetchOrderStatusCounts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/statistics/${userId}`); 
        if (!response.ok) 
          throw new Error("Failed to fetch order status counts");
        const data = await response.json(); 
        setOrderStatusCounts(data);
      } catch (error) {
        console.error("Error fetching order status counts:", error);
      }
    };

    fetchOrderStatusCounts();
  }, [userId]);

  return (
    <WidgetContainer title={title} className="h-[160px] w-[500px]">
      <div className="flex justify-between mx-3 mb-3 mt-3 items-center">
        <OrderWidgetCategoryElement
          name={t("ordersPage.status.unpaid")}
          value={orderStatusCounts["UNPAID"] || 0}
        />
        <OrderWidgetCategoryElement
          name={t("ordersPage.status.paid")}
          value={orderStatusCounts["PAID"] || 0}
        />
        <OrderWidgetCategoryElement
          name={t("ordersPage.status.shipped")}
          value={orderStatusCounts["SHIPPED"] || 0}
        />
      </div>
    </WidgetContainer>
  );
}
