import usersData from "../data/user.json";
import { simulateRequest } from "./http";
import type { StoredUser, User } from "../types/users";

const users = usersData as unknown as StoredUser[];

export function getUsers(): Promise<User[]> {
  const list: User[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  }));

  return simulateRequest(list);
}
