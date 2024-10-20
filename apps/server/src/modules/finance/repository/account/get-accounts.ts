import { Account } from "@repo/models/finance";
import { db } from "~/db";

export async function getAccounts(userId: string): Promise<Array<Account>> {
  const accounts = await db.query.accounts.findMany({
    where: (account, { eq }) => eq(account.userId, userId),
  });

  return accounts as Array<Account>;
}
