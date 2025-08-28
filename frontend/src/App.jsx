import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import ShopHome from "./pages/shop/ShopHome";
import ProductPage from "./pages/product/ProductPage";
import CartPage from "./pages/order/CartPage";
import ProfilePage from "./pages/user/ProfilePage";

// Admin pages
import ProductsPage from "./pages/admin/ProductsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CategoriesPage from "./pages/admin/CategoriesPage";

// Route guards
import AdminRoute from "./components/admin/AdminRoute";
import UserRoute from "./components/UserRoute";
import RootRoute from "./components/RootRoute";
import ProductPageSlug from "./pages/product/ProductPage";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            {/* Bosh sahifa tekshiradi */}
            <Route path="/" element={<RootRoute />} />

            {/* User sahifalari */}
            <Route path="/home" element={<UserRoute><HomePage /></UserRoute>} />
            <Route path="/profile" element={<UserRoute><ProfilePage /></UserRoute>} />
            <Route path="/shop" element={<UserRoute><ShopHome /></UserRoute>} />
            <Route path="/products/:slug" element={<UserRoute><ProductPageSlug /></UserRoute>} />
            <Route path="/cart" element={<UserRoute><CartPage /></UserRoute>} />

            {/* Admin sahifalari */}
            <Route path="/admin/profile" element={<AdminRoute><ProfilePage /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><ProductsPage /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><OrdersPage /></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><CategoriesPage /></AdminRoute>} />
            <Route path="/admin/prodcuts/upload_photo" element={<AdminRoute><ProductsPage /></AdminRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}
