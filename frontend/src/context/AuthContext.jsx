import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe } from "../api/users";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getMe()
      .then((r) => {
        if (mounted) setUser(r.data);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAdmin: user?.Role === "admin", // note: backend role may be lowercase "admin"
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
