import { type Account } from "@repo/models/finance";
import { accounts } from "../../schemas/accounts";
import { db } from "~/db";
import { eq } from "drizzle-orm";

export async function saveAccount(account: Account): Promise<Account> {
  const alreadyExist = await db.query.accounts.findFirst({
    where: eq(accounts.id, account.id),
  });

  if (!!alreadyExist) {
    return (
      await db
        .update(accounts)
        .set({ ...account, updatedAt: new Date().toISOString() })
        .where(eq(accounts.id, account.id))
        .returning()
    )[0] as Account;
  }

  return (
    await db
      .insert(accounts)
      .values({ ...account, updatedAt: new Date().toISOString() })
      .returning()
  )[0] as Account;
}
