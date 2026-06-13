import type { Role } from "../types/role";

export const Paths = {
  login: "/login",
  dashboard: "/",
  users: "/users",
} as const;

export const Permission = {
  ViewProjects: "view_projects",
  CreateProjects: "create_projects",
  EditProjects: "edit_projects",
  DeleteProjects: "delete_projects",
  UpdateStatus: "update_status",
  ViewUsers: "view_users",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    Permission.ViewProjects,
    Permission.CreateProjects,
    Permission.EditProjects,
    Permission.DeleteProjects,
    Permission.ViewUsers,
  ],
  manager: [Permission.ViewProjects, Permission.UpdateStatus],
  viewer: [Permission.ViewProjects],
};
