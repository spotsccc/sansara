import { Account } from "@repo/models/finance";
import { db } from "~/db";

export async function getAccountById(id: string): Promise<Account | null> {
  return (
    ((await db.query.accounts.findFirst({
      where: (account, { eq }) => eq(account.id, id),
    })) as Account) ?? null
  );
}
