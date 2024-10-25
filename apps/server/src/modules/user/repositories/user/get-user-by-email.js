import { db } from "~/db/index.js";
import { eq } from "drizzle-orm";
import { users } from "~/db/schema.js";
export async function getUserByEmail(email) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });
    return user ?? null;
}
