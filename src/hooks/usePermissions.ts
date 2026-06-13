import { useAuth } from "./useAuth";
import { rolePermissions } from "../routes/routes";
import type { Permission } from "../routes/routes";

export function usePermissions() {
  const { user } = useAuth();
  const permissions = user ? rolePermissions[user.role] : [];

  const can = (permission: Permission) => permissions.includes(permission);

  return { can };
}
