import WidgetContainer from "../components/WidgetContainer";
import { useTranslation } from "react-i18next";
import { orders } from "../data/orders";
import { useState, useEffect } from "react";
import OutlineButton from "../components/OutlineButton";
import DropDownMenu from "../components/DropDownMenu";
import Table from "../components/subpages/Table";

export default function Orders() {
  const { t } = useTranslation();
  const userId = JSON.parse(localStorage.getItem("userId"));

  const ordersPerPage = 8;
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("unPaid");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paginatedOrders, setPaginatedOrders] = useState([]);

  useEffect(() => {
    const newFilteredOrders = orders.filter(
      (order) => order.userId === userId && order.status === category
    );
    setFilteredOrders(newFilteredOrders);
    setPage(0);
  }, [category]);

  useEffect(() => {
    setPaginatedOrders(
      filteredOrders.slice(page * ordersPerPage, (page + 1) * ordersPerPage)
    );
  }, [page, filteredOrders]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePreviousClick = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  return (
    <WidgetContainer className="m-4" title={t("ordersPage.title")}>
      <div className="px-12 py-4">
        <DropDownMenu
          label={t("ordersPage.status.Unpaid")}
          options={[
            { label: t("ordersPage.status.unPaid"), value: "unPaid" },
            { label: t("ordersPage.status.unSent"), value: "unSent" },
            { label: t("ordersPage.status.returned"), value: "returned" },
          ]}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Table
          columns={[
            "ID",
            t("ordersPage.orderDate"),
            t("ordersPage.status.column"),
            t("ordersPage.price"),
            t("details"),
          ]}
          data={paginatedOrders.map((order) => ({
            id: order.id,
            date: order.date,
            status: t(`ordersPage.status.${order.status}`),
            price: order.price,
          }))}
        />
        <div className="flex gap-4 mt-4 justify-end">
          <OutlineButton onClick={handlePreviousClick} disabled={page === 0}>
            {t("previous")}
          </OutlineButton>

          <OutlineButton
            onClick={handleNextClick}
            disabled={page >= totalPages - 1}
          >
            {t("next")}
          </OutlineButton>
        </div>
      </div>
    </WidgetContainer>
  );
}
