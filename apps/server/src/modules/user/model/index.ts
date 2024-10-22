import { type User } from "@repo/models/users";
import { hash, randomUUID } from "crypto";

export type UserWithPassword = User & { password: string };
export function createUser({
  password,
  email,
  username,
}: {
  password: string;
  email: string;
  username: string;
}): UserWithPassword {
  return {
    password: hash("sha256", password),
    email,
    username,
    id: randomUUID(),
  };
}

export function toClientUser(u: UserWithPassword) {
  return {
    email: u.email,
    id: u.id,
    username: u.username,
  };
}
