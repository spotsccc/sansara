import { db } from "~/db";
import { users } from "../../schemas/users";
export async function saveUser(user) {
    const inserResult = await db
        .insert(users)
        .values(user)
        .onConflictDoUpdate({ target: users.id, set: user })
        .returning();
    return inserResult[0];
}
