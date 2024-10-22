import { db } from "~/db";
export async function getAccountById(id) {
    return ((await db.query.accounts.findFirst({
        where: (account, { eq }) => eq(account.id, id),
    })) ?? null);
}
