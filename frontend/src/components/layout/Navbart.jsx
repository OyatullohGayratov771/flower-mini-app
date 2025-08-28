import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { items } = useCart();
  const { user, isAdmin } = useAuth();
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-rose-100">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl text-rose-700">Bloom</Link>
        <div className="flex items-center gap-6">
          (
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `hover:text-rose-600 ${isActive ? "text-rose-700 font-medium" : ""}`}
            >
              Profile
            </NavLink>
          )

          <NavLink 
            to="/shop" 
            className={({ isActive }) => `hover:text-rose-600 ${isActive ? "text-rose-700 font-medium" : ""}`}
          >
            Shop
          </NavLink>

          {isAdmin && (
            <NavLink 
              to="/admin/orders" 
              className={({ isActive }) => `hover:text-rose-600 ${isActive ? "text-rose-700 font-medium" : ""}`}
            >
              Admin
            </NavLink>
          )}

          <NavLink to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6"/>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-rose-600 text-white rounded-full px-1.5">
                {count}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
