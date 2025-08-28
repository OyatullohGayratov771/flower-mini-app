import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RootRoute() {
  const { user, loading, isAdmin } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading) setChecked(true);
  }, [loading]);

  if (!checked) return <p>⏳ Tekshirilmoqda...</p>;

  if (!user) return <Navigate to="/home" replace />; // login bo‘lmagan
  if (isAdmin) return <Navigate to="/admin/products" replace />; // admin panel
  return <Navigate to="/home" replace />; // oddiy user
}
