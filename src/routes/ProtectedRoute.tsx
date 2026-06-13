import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Paths } from "./routes";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={Paths.login} replace />;
  }

  return <Outlet />;
}
