export const Role = {
  Admin: "admin",
  Manager: "manager",
  Viewer: "viewer",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
