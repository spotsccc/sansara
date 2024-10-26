import { type Account } from "@repo/models/finance";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { accounts } from "~/db/schema";

export async function getAccounts(userId: string): Promise<Array<Account>> {
  const accs = await db.query.accounts.findMany({
    where: eq(accounts.userId, userId),
  });

  return accs as Array<Account>;
}
