import { db } from "~/db";
import { UserWithPassword } from "../model";

export async function getUserByEmail(
  email: string,
): Promise<UserWithPassword | null> {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
  return user ?? null;
}
