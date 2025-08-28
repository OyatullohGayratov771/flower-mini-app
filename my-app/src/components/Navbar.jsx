// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center p-4 bg-pink-500 text-white shadow-md">
      <Link to="/" className="text-xl font-bold">
        🌸 Flower Shop
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="relative">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
