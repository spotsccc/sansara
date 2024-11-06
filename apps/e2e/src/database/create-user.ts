import { User } from "@repo/models/users";
import { getPool } from "./pool";
import { hash, randomUUID } from "crypto";

export type CreateUserInput = Omit<User, "id"> & { password: string };

export async function createUser({
  email,
  password,
  username,
}: CreateUserInput) {
  const pool = getPool();

  const client = await pool.connect();

  await client.query(
    "INSERT INTO users  (email, username, password, id) VALUES ($1, $2, $3, $4);",
    [email, username, hash("sha512", password), randomUUID()],
  );
}
