import type { Account } from "@repo/models/finance";
import { eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { accounts } from "~/db/schema.js";

export async function getAccountById(id: string): Promise<Account | null> {
  return (
    ((await db.query.accounts.findFirst({
      where: eq(accounts.id, id),
    })) as Account) ?? null
  );
}
