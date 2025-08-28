import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const LS_KEY = "flower_cart_v2";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === product.ID);
      if (exist)
        return prev.map((i) =>
          i.id === product.ID ? { ...i, qty: i.qty + qty } : i
        );
      return [
        ...prev,
        {
          id: product.ID,
          name: product.Name,
          price_cents: product.PriceCents,
          currency: product.Currency,
          image_url: product.ImageURL,
          qty,
        },
      ];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const setQty = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  const clear = () => setItems([]);

  const total_cents = useMemo(
    () => items.reduce((s, i) => s + i.price_cents * i.qty, 0),
    [items]
  );
  const currency = items[0]?.currency || "UZS";

  const value = useMemo(
    () => ({ items, add, remove, setQty, clear, total_cents, currency }),
    [items, total_cents, currency]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
