import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export function AuthRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={"/"} />;
}
