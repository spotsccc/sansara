import { accounts } from "../../schemas/accounts";
import { db } from "~/db";
export async function saveAccount(account) {
    return (await db
        .insert(accounts)
        .values({ ...account, updatedAt: new Date().toISOString() })
        .returning()
        .then((accounts) => accounts.map((account) => account)))[0];
}
