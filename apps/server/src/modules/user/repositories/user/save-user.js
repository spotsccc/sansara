import { db } from "~/db/index.js";
import { users } from "../../schemas/users.js";
export async function saveUser(user) {
    const inserResult = await db
        .insert(users)
        .values(user)
        .onConflictDoUpdate({ target: users.id, set: user })
        .returning();
    return inserResult[0];
}
