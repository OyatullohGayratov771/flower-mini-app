import React, { useEffect, useState } from "react";
import client from "../../api/client";
import AdminOrderList from "../../components/admin/AdminOrderList";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    client.get("/admin/orders").then((res) => {
      setOrders(res.data || []);
    });
  }, []);

  return (
    <div>
      <h2>Buyurtmalar</h2>
      <AdminOrderList orders={orders} />
    </div>
  );
}

export default Orders;
