import { type Account } from "@repo/models/finance";
import { accounts } from "../../schemas/accounts.js";
import { db } from "~/db/index.js";

export async function saveAccount(account: Account): Promise<Account> {
  return (
    await db
      .insert(accounts)
      .values({ ...account, updatedAt: new Date().toISOString() })
      .returning()
      .then((accounts) =>
        accounts.map((account) => account as unknown as Account),
      )
  )[0];
}
