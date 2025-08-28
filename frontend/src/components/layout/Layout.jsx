import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
  const { items: cart } = useCart();
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50 to-pink-50">
      
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/80 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 rounded-b-2xl">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-serif font-bold text-pink-600 hover:text-pink-700 transition">
        <img src="/icons/tulips_icon.png" alt="Logo" className="w-8 h-8 inline-block mr-2 -mt-1"/>
           Luxury Flowers
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          {user && !isAdmin && (
            <>
              <Link to="/shop" className="flex items-center gap-1 hover:text-pink-500 transition">
                <img src="/icons/user/shop.png" alt="Shop" className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">Shop</span>
              </Link>

              <Link to="/cart" className="relative flex items-center gap-1 hover:text-pink-500 transition">
                <img src="icons/user/flower-shop.png" alt="Cart" className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    {cart.length}
                  </span>
                )}
              </Link>

              <Link to="/profile" className="flex items-center gap-1 hover:text-pink-500 transition">
                <img src="icons/user/user.png" alt="Profile" className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">Profile</span>
              </Link>
            </>
          )}

          {user && isAdmin && (
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <Link to="/admin/products" className="flex items-center hover:text-pink-500 transition">
                <img src="/icons/admin/add_products.png" alt="Products" className="w-6 h-6 sm:w-6 sm:h-6" />
              </Link>
              <Link to="/admin/orders" className="flex items-center hover:text-pink-500 transition">
                <img src="/icons/admin/orders.png" alt="Orders" className="w-6 h-6 sm:w-6 sm:h-6" />
              </Link>
              <Link to="/admin/categories" className="flex items-center hover:text-pink-500 transition">
                <img src="/icons/admin/categories.png" alt="Categories" className="w-6 h-6 sm:w-6 sm:h-6" />
              </Link>
              <Link to="/admin/profile" className="flex items-center hover:text-pink-500 transition">
                <img src="/icons/admin/admin_profile.png" alt="Profile" className="w-6 h-6 sm:w-6 sm:h-6" />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-6 sm:p-10">{children}</main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-inner py-8 text-center space-y-4 rounded-t-2xl">
        <p className="text-gray-600 text-sm sm:text-base">
          © {new Date().getFullYear()} Luxury Flower Shop. Barcha huquqlar himoyalangan.
        </p>
        <div className="flex justify-center gap-6 text-pink-600 text-lg">
          <a href="https://t.me/@x_azamat_x" target="_blank" rel="noreferrer" className="hover:text-pink-800 transition">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href="https://instagram.com/x.azamat.x" target="_blank" rel="noreferrer" className="hover:text-pink-800 transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="tel:+998901234567" className="hover:text-pink-800 transition">
            <i className="fas fa-phone-alt"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}
