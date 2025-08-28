import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <p>⏳ Tekshirilmoqda...</p>;

  // Tizimga kirmagan foydalanuvchi
  if (!user) return <Navigate to="/" replace />;  

  // Admin foydalanuvchi user sahifaga kira olmasin
  if (isAdmin) return <Navigate to="/admin/products" replace />;

  return children;
}