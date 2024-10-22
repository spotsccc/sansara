import { db } from "~/db";
export async function getUserByEmail(email) {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    });
    return user ?? null;
}
