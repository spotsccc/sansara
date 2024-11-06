import { updateBalance } from "./update-balance";
import { type Account } from "./account";
import { createEmptyMoney, minus, plus } from "../money";
import type {
  Transaction,
  TransactionIncome,
  TransactionExpense,
  TransactionTransfer,
} from "../transaction";
import { type Result, createError, createSuccess, isError } from "@repo/result";

export const ERRORS = {
  notEnoughtFunds: "not-enought-funds" as const,
};

export function applyTransaction(account: Account, transaction: Transaction) {
  switch (transaction.type) {
    case "income":
      return createSuccess(applyTransactionIncome(account, transaction));
    case "transfer":
      return applyTransactionTransfer(account, transaction);
    case "expense":
      return applyTransactionExpense(account, transaction);
    default:
      throw new Error("Unexcepted transaction type");
  }
}

export function applyTransactionIncome(
  account: Account,
  transaction: TransactionIncome,
): Account {
  const current =
    account.balance[transaction.amount.currency] ??
    createEmptyMoney(transaction.amount.currency);

  const updatedCurrent = plus(current, transaction.amount);

  return updateBalance(account, updatedCurrent);
}

export function applyTransactionExpense(
  account: Account,
  transaction: TransactionExpense,
) {
  const current = account.balance[transaction.amount.currency];

  if (!current) {
    return createError({ type: ERRORS.notEnoughtFunds });
  }

  const updatedCurrent = minus(current, transaction.amount);

  if (isError(updatedCurrent)) {
    return updatedCurrent;
  }

  return createSuccess(updateBalance(account, updatedCurrent.success));
}

export function applyTransactionTransfer(
  account: Account,
  transaction: TransactionTransfer,
) {
  if (account.id === transaction.accountId) {
    const current = account.balance[transaction.amount.currency];

    const updatedCurrent = minus(current, transaction.amount);

    if (isError(updatedCurrent)) {
      return updatedCurrent;
    }

    return createSuccess(updateBalance(account, updatedCurrent.success));
  }

  let current = account.balance[transaction.receiveAmount.currency];

  current = plus(current, transaction.receiveAmount);

  return createSuccess(updateBalance(account, current));
}
