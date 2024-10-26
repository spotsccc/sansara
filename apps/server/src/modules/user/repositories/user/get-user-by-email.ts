import { db } from "~/db";
import { eq } from "drizzle-orm";
import { type UserWithPassword } from "../../model";
import { users } from "~/db/schema";

export async function getUserByEmail(
  email: string,
): Promise<UserWithPassword | null> {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return user ?? null;
}
