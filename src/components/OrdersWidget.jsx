import WidgetContainer from "../components/WidgetContainer";
import OrderWidgetCategoryElement from "./OrderWidgetCategoryElement";
import { orders } from "../data/orders";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";


export default function OrdersWidget({ title }) {

  const countOrdersByStatusForUser = (orders) => {
    let statusCounts = [];

    userOrders.forEach((order) => {
      let status = order.status;
      if (statusCounts[status]) {
        statusCounts[status] += 1;
      } else {
        statusCounts[status] = 1;
      }
    });

    return statusCounts;
  }

  const { userId } = useUser();
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    setUserOrders(orders.filter((order) => { return order.userId == userId }))
  }, [userId])

  const orderStatuses = countOrdersByStatusForUser(userOrders);
  const { t } = useTranslation();
  return (
    <WidgetContainer title={title} className="h-[160px] w-[500px]">
      <div className="flex justify-between mx-3 mb-3 mt-3 items-center">
        <OrderWidgetCategoryElement
          name={t("ordersPage.status.unPaid")}
          value={orderStatuses["unPaid"] || 0}
        />
        <OrderWidgetCategoryElement
          name={t("ordersPage.status.unSent")}
          value={orderStatuses["unSent"] || 0}
        />
        <OrderWidgetCategoryElement
          name={t("ordersPage.status.returned")}
          value={orderStatuses["returned"] || 0}
        />
      </div>
    </WidgetContainer>
  );
}
