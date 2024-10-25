import { eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { accounts } from "~/db/schema.js";
export async function getAccounts(userId) {
    const accs = await db.query.accounts.findMany({
        where: eq(accounts.userId, userId),
    });
    return accs;
}
