import { v7 } from "uuid";

import { moneySchema, type Money } from "../money/money";
import { z } from "zod";

export const transactionBaseSchema = z.object({
  description: z.string().optional(),
  amount: moneySchema,
  accountId: z.string(),
  userId: z.string(),
  id: z.string(),
  createdAt: z.string(),
});

export const transactionIncomeSchema = transactionBaseSchema.extend({
  type: z.literal("income"),
});

export const transactionExpenseSchema = transactionBaseSchema.extend({
  type: z.literal("expense"),
  categoryId: z.string(),
});

export const transactionTransferSchema = transactionBaseSchema.extend({
  type: z.literal("transfer"),
  receiveAmount: moneySchema,
  receiverId: z.string(),
});

export const transactionSchema = z.discriminatedUnion("type", [
  transactionTransferSchema,
  transactionExpenseSchema,
  transactionIncomeSchema,
]);

export type TransactionType = "income" | "transfer" | "expense";

export type TransactionBase = z.infer<typeof transactionBaseSchema>;

export type TransactionIncome = z.infer<typeof transactionIncomeSchema>;

export type TransactionExpense = z.infer<typeof transactionExpenseSchema>;

export type TransactionTransfer = z.infer<typeof transactionTransferSchema>;

export type Transaction = z.infer<typeof transactionSchema>;

export type TransactionBaseInput = {
  accountId: string;
  amount: string;
  currency: string;
  description?: string;
  userId: string;
};

export type TransactionIncomeInput = {
  type: "income";
} & TransactionBaseInput;

export type TransactionExpenseInput = TransactionBaseInput & {
  type: "expense";
  categoryId: string;
};

export type TransactionTransferInput = TransactionBaseInput & {
  type: "transfer";
  receiverId: string;
  receiveAmount: string;
  receiveCurrency: string;
};

export type TransactionInput =
  | TransactionIncomeInput
  | TransactionExpenseInput
  | TransactionTransferInput;

export function createTransaction(tx: TransactionInput): Transaction {
  const baseTransaction: TransactionBase = {
    amount: { ...formatAmount(tx.amount), currency: tx.currency },
    description: tx.description,
    id: v7(),
    createdAt: new Date().toISOString(),
    accountId: tx.accountId,
    userId: tx.userId,
  };

  switch (tx.type) {
    case "income":
      return {
        ...baseTransaction,
        type: "income",
      };
    case "expense":
      return {
        ...baseTransaction,
        type: "expense",
        categoryId: tx.categoryId,
      };
    case "transfer":
      return {
        ...baseTransaction,
        type: "transfer",
        receiveAmount: {
          ...formatAmount(tx.receiveAmount),
          currency: tx.receiveCurrency,
        },
        receiverId: tx.receiverId,
      };
  }
}

export function formatAmount(amount: string) {
  const indexOfPoint =
    amount.indexOf(".") === -1 ? amount.length : amount.indexOf(".");

  const formattedAmount = amount.replace(".", "");
  const accuracy = amount.length - indexOfPoint;

  return {
    accuracy,
    amount: trimLeftZeroes(formattedAmount),
  };
}

export function trimLeftZeroes(integerPart: string) {
  let i = 0;
  for (; i < integerPart.length; i++) {
    if (integerPart[i] !== "0") {
      break;
    }
  }

  if (i === integerPart.length) {
    return "0";
  }

  return integerPart.slice(i);
}
