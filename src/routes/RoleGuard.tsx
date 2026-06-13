import { Navigate, Outlet } from "react-router";
import { usePermissions } from "../hooks/usePermissions";
import { Paths } from "./routes";
import type { Permission } from "./routes";

export function RoleGuard({ permission }: { permission: Permission }) {
  const { can } = usePermissions();

  if (!can(permission)) {
    return <Navigate to={Paths.dashboard} replace />;
  }

  return <Outlet />;
}
