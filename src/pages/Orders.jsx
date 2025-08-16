import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WidgetContainer from "../components/WidgetContainer";
import DropDownMenu from "../components/DropDownMenu";
import Table from "../components/subpages/Table";
import OutlineButton from "../components/OutlineButton";
import { useUser } from "../contexts/UserContext";

export default function Orders() {
  const { t } = useTranslation();
  const { userId } = useUser();

  const ordersPerPage = 8;
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("UNPAID");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paginatedOrders, setPaginatedOrders] = useState([]);

  const statusOptions = [
    { label: t("ordersPage.status.unpaid"), value: "UNPAID" },
    { label: t("ordersPage.status.paid"), value: "PAID" },
    { label: t("ordersPage.status.shipped"), value: "SHIPPED" },
    { label: t("ordersPage.status.delivered"), value: "DELIVERED" },
  ];

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/orders/${userId}?status=${status}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setFilteredOrders(data);
        setPage(0);
      } catch (error) {
        console.error(error);
        setFilteredOrders([]);
      }
    };

    fetchOrders();
  }, [userId, status]);

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
        <div className="mb-4 flex justify-end">
          <DropDownMenu
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

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
            status: t(`ordersPage.status.${order.status.toLowerCase()}`),
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

