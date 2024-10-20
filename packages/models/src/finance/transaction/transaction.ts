import { v7 } from "uuid";

import { Currency, Money } from "../money/money";

export type TransactionType = "income" | "transfer" | "expense";

export type TransactionBase = {
  id: string;
  userId: string;
  accountId: string;
  createdAt: Date;
  amount: Money;
  description: string | null;
};

export type TransactionIncome = {
  type: "income";
} & TransactionBase;

export type TransactionExpense = {
  type: "expense";
  category: string;
} & TransactionBase;

export type TransactionTransfer = {
  type: "transfer";
  receiverId: string;
  receiveAmount: Money;
} & TransactionBase;

export type Transaction =
  | TransactionIncome
  | TransactionExpense
  | TransactionTransfer;

export type TransactionBaseInput = {
  accountId: string;
  amount: string;
  currency: Currency;
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
  receiveCurrency: Currency;
};

export type TransactionInput =
  | TransactionIncomeInput
  | TransactionExpenseInput
  | TransactionTransferInput;

export function createTransaction(tx: TransactionInput): Transaction {
  const baseTransaction: TransactionBase = {
    amount: { ...formatAmount(tx.amount), currency: tx.currency },
    description: tx.description ?? null,
    id: v7(),
    createdAt: new Date(),
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
        category: tx.categoryId,
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
