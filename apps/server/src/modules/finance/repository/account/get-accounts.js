import { db } from "~/db";
export async function getAccounts(userId) {
    const accounts = await db.query.accounts.findMany({
        where: (account, { eq }) => eq(account.userId, userId),
    });
    return accounts;
}
