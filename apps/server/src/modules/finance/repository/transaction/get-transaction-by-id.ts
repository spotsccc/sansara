import { db } from "~/db";

export async function getTransactionById(id: number) {
  const tx = await db.query.transactions.findFirst({
    where: (tx, { eq }) => eq(tx.id, id),
  });
}
