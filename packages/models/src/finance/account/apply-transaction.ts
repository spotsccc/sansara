import { updateBalance } from "./update-balance";
import { type Account } from "./account";
import { createEmptyMoney, minus, plus } from "../money";
import type {
  Transaction,
  TransactionIncome,
  TransactionExpense,
  TransactionTransfer,
} from "../transaction";
import { type Result, createError, createSuccess } from "@repo/result";

export type ApplyTransactionErrors = "Account has not enought funds";

export function applyTransaction(
  account: Account,
  transaction: Transaction,
): Result<Account, { type: ApplyTransactionErrors }> {
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
): Result<Account, { type: ApplyTransactionErrors }> {
  const current = account.balance[transaction.amount.currency];

  if (!current) {
    return createError({ type: "Account has not enought funds" });
  }

  const updatedCurrent = minus(current, transaction.amount);

  return createSuccess(updateBalance(account, updatedCurrent));
}

export function applyTransactionTransfer(
  account: Account,
  transaction: TransactionTransfer,
): Result<Account, { type: ApplyTransactionErrors }> {
  if (account.id === transaction.accountId) {
    let current = account.balance[transaction.amount.currency];

    current = minus(current, transaction.amount);

    return createSuccess(updateBalance(account, current));
  }

  let current = account.balance[transaction.receiveAmount.currency];

  current = plus(current, transaction.receiveAmount);

  return createSuccess(updateBalance(account, current));
}
