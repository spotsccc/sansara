import { db } from "~/db";
import { users } from "../../schemas/users";
import { UserWithPassword } from "../model";

export async function saveUser(
  user: UserWithPassword,
): Promise<UserWithPassword> {
  const inserResult = await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({ target: users.id, set: user })
    .returning();

  return inserResult[0];
}
