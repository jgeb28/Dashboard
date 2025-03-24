import WidgetContainer from "../components/WidgetContainer";
import OrderWidgetCategoryElement from "./OrderWidgetCategoryElement";
import { orders } from "../data/orders";
import { useTranslation } from "react-i18next";

export default function OrdersWidget({ title }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const orderStatuses = countOrdersByStatusForUser(userId, orders);
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

export const countOrdersByStatusForUser = (userId, orders) => {
  const userOrders = orders.filter((order) => order.userId === userId);

  const statusCounts = {};

  userOrders.forEach((order) => {
    const status = order.status;
    if (statusCounts[status]) {
      statusCounts[status] += 1;
    } else {
      statusCounts[status] = 1;
    }
  });

  return statusCounts;
};
