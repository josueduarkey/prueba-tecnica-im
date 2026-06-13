import usersData from "../data/user.json";
import { simulateError, simulateRequest } from "./http";
import type { Credentials } from "../types/credentials";
import type { StoredUser, User } from "../types/users";

const users = usersData as unknown as StoredUser[];

export function login({ email, password }: Credentials): Promise<User> {
  const match = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!match) {
    return simulateError("Correo o contraseña incorrectos");
  }

  const user: User = {
    id: match.id,
    name: match.name,
    email: match.email,
    role: match.role,
    avatar: match.avatar,
  };

  return simulateRequest(user);
}
