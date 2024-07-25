import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export function AuthRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to={"/"} />;
  return <Outlet />;
}
