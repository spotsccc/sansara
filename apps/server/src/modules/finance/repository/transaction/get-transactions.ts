import { db } from "~/db";
import { fromDatabase } from "./mappers";

export async function getTransactions(userId: string) {
  const transactions = await db.query.transactions.findMany({
    where: (tx, { eq }) => eq(tx.userId, userId),
  });

  return transactions.map(fromDatabase);
}
