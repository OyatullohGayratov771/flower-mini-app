import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <p>⏳ Tekshirilmoqda...</p>;

  // Tizimga kirmagan foydalanuvchi
  if (!user) return <Navigate to="/home" replace />;  

  // Admin bo‘lmagan foydalanuvchi
  if (!isAdmin) return <Navigate to="/home" replace />;  

  return children;
}
