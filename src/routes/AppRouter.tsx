import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleGuard } from "./RoleGuard";
import { Paths, Permission } from "./routes";

export function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path={Paths.login}
        element={user ? <Navigate to={Paths.dashboard} replace /> : <Login />}
      />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={Paths.dashboard} element={<Dashboard />} />
          <Route element={<RoleGuard permission={Permission.ViewUsers} />}>
            <Route path={Paths.users} element={<Users />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
