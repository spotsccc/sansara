import { Transaction, TransactionBase } from "@repo/models/finance";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { TransactionSchema, transactions } from "../../schemas/transactions";

export async function saveTransaction(tx: Transaction) {
  const alreadyExist = await db.query.transactions.findFirst({
    where: eq(transactions.id, tx.id),
  });

  console.log();

  if (!!alreadyExist) {
    return db
      .update(transactions)
      .set(mapTransactionToDatabase(tx))
      .where(eq(transactions.id, tx.id))
      .returning();
  }

  console.log({
    values: mapTransactionToDatabase(tx),
    query: db
      .insert(transactions)
      .values(mapTransactionToDatabase(tx))
      .returning()
      .toSQL(),
  });

  return db
    .insert(transactions)
    .values(mapTransactionToDatabase(tx))
    .returning();
}

function mapTransactionToDatabase(tx: Transaction): TransactionSchema {
  const baseTrasnaction = {
    id: tx.id,
    amount: tx.amount.amount,
    type: tx.type,
    accuracy: tx.amount.accuracy,
    currency: tx.amount.currency,
    createdAt: new Date(tx.createdAt),
    accountId: tx.accountId,
    userId: tx.userId,
    description: tx.description ?? null,
    receiveAmount: null,
    receiverId: null,
    receiveAccuracy: null,
    receiveCurrency: null,
    categoryId: null,
  };

  switch (tx.type) {
    case "transfer":
      return {
        ...baseTrasnaction,
        receiveAmount: tx.receiveAmount.amount,
        receiveCurrency: tx.receiveAmount.currency,
        receiveAccuracy: tx.receiveAmount.accuracy,
        receiverId: tx.receiverId,
      };
    case "expense":
      return {
        ...baseTrasnaction,
        categoryId: tx.categoryId,
      };
    case "income":
      return {
        ...baseTrasnaction,
      };
  }
}

function mapFromDatabase(tx: TransactionSchema): Transaction {
  const baseTrasnaction: TransactionBase = {
    amount: { amount: tx.amount, currency: tx.currency, accuracy: tx.accuracy },
    accountId: tx.accountId,
    createdAt: tx.createdAt.toISOString(),
    userId: tx.userId,
    id: tx.id,
    description: tx.description ?? undefined,
  };

  switch (tx.type) {
    case "transfer":
      return {
        type: "transfer",
        ...baseTrasnaction,
        receiverId: tx.receiverId!,
        receiveAmount: {
          amount: tx.receiveAmount!,
          accuracy: tx.receiveAccuracy!,
          currency: tx.receiveCurrency!,
        },
      };
    case "expense":
      return {
        type: "expense",
        ...baseTrasnaction,
        categoryId: tx.categoryId!,
      };
    case "income": {
      return {
        type: "income",
        ...baseTrasnaction,
      };
    }
  }

  throw new Error();
}
