import React from "react";

function Cart({ items, onCheckout }) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div>
      <h2>Savat</h2>
      {items.map((it) => (
        <div key={it.id}>
          {it.name} x {it.qty} = {it.price * it.qty} so‘m
        </div>
      ))}
      <h3>Jami: {total} so‘m</h3>
      {items.length > 0 && <button onClick={onCheckout}>Buyurtma berish</button>}
    </div>
  );
}

export default Cart;
