import type { Role } from "./role";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar: string;
};

export type StoredUser = User & { password: string };
