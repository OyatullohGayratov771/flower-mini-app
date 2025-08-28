import React from "react";
import client from "../../api/client";

function AdminOrderList({ orders }) {
  const handleStatus = async (id, status) => {
    await client.put(`/admin/orders/${id}/status`, { status });
    alert("Status yangilandi ✅");
    window.location.reload();
  };

  return (
    <div>
      {orders.map((o) => (
        <div key={o.ID} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>ID: {o.ID}</p>
          <p>User: {o.User?.FirstName} {o.User?.LastName}</p>
          <p>Status: {o.Status}</p>
          <p>Items:</p>
          <ul>
            {o.items.map((it) => (
              <li key={it.ID}>{it.product.Name} x {it.Qty}</li>
            ))}
          </ul>
          <button onClick={() => handleStatus(o.id, "approved")}>✅ Tasdiqlash</button>
          <button onClick={() => handleStatus(o.id, "rejected")}>❌ Bekor qilish</button>
        </div>
      ))}
    </div>
  );
}

export default AdminOrderList;
