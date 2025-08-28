// pages/Cart.jsx
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-6 text-center text-gray-500">Savatcha bo‘sh 🛒</p>;
  }

  // umumiy narx hisoblash
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.PriceCents) || 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Savatcha</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.ID}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <span>
              {item.Name} –{" "}
              {Number(item.PriceCents)
                ? Number(item.PriceCents).toLocaleString() + " so‘m"
                : "Narxi belgilanmagan"}
            </span>
            <button
              onClick={() => removeFromCart(item.ID)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              ❌ O‘chirish
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right text-xl font-bold">
        Umumiy: {total.toLocaleString()} so‘m
      </div>
      <button
              onClick={() => alert("To'lov funksiyasi hali mavjud emas.")}
              className="bg-green-500 text-white px-3 py-1 rounded-lg"
            >
              💳 To'lov qilish
            </button>
    </div>
  );
}
