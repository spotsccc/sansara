import { eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { accounts } from "~/db/schema.js";
export async function getAccountById(id) {
    return ((await db.query.accounts.findFirst({
        where: eq(accounts.id, id),
    })) ?? null);
}
