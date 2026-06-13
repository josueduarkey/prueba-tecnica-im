import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { usePermissions } from "../../hooks/usePermissions";
import { Paths, Permission } from "../../routes/routes";
import { Button } from "../ui/Button";

export function Sidebar() {
  const { user, logout } = useAuth();
  const { can } = usePermissions();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-primary-light text-primary"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="flex flex-col gap-6 border-b border-gray-200 bg-white p-4 md:w-64 md:border-b-0 md:border-r">
      <div className="px-2 flex justify-center items-center flex-col gap-3">
        <img src="/impresos-multiples.png" alt="Logo" className="w-32" />
        <p className="text-xs text-gray-500">Gestión de Proyectos</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <NavLink to={Paths.dashboard} end className={linkClass}>
          Proyectos
        </NavLink>
        {can(Permission.ViewUsers) && (
          <NavLink to={Paths.users} className={linkClass}>
            Usuarios
          </NavLink>
        )}
      </nav>

      <div className="border-t border-gray-200 pt-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-9 w-9 rounded-full"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {user?.name}
            </p>
            <p className="text-xs capitalize text-gray-500">{user?.role}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}
