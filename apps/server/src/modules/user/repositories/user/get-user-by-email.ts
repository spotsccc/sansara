import { db } from "~/db/index.js";
import { eq } from "drizzle-orm";
import { type UserWithPassword } from "../../model/index.js";
import { users } from "~/db/schema.js";

export async function getUserByEmail(
  email: string,
): Promise<UserWithPassword | null> {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user ?? null;
}
