import { createError, isError } from "@repo/result";
import { getAccountById } from "../repository/account/get-account-by-id.js";
import { saveAccount } from "../repository/account/save-account.js";
import {
  type Transaction,
  type TransactionExpense,
  type TransactionIncome,
  type TransactionTransfer,
  applyTransaction,
} from "@repo/models/finance";

export function applyTransactionService(transaction: Transaction) {
  switch (transaction.type) {
    case "income":
      return applyIncomeTransaction(transaction);
    case "transfer":
      return applyTransferTransaction(transaction);
    case "expense":
      return applyExpenseTransaction(transaction);
    default:
      throw new Error("Unkown transaction type");
  }
}

async function applyIncomeTransaction(tx: TransactionIncome) {
  const account = await getAccountById(tx.accountId);

  if (!account) {
    return createError({ message: "account not found" });
  }

  const applyResult = applyTransaction(account, tx);

  if (isError(applyResult)) {
    return applyResult;
  }

  await saveAccount(applyResult.success);

  return applyResult;
}

async function applyExpenseTransaction(tx: TransactionExpense) {
  const account = await getAccountById(tx.accountId);

  if (!account) {
    return createError({ message: "account not found" });
  }

  const applyResult = applyTransaction(account, tx);

  if (isError(applyResult)) {
    return applyResult;
  }

  await saveAccount(applyResult.success);

  return applyResult;
}

async function applyTransferTransaction(tx: TransactionTransfer) {
  const account = await getAccountById(tx.accountId);
  const receiverAccount = await getAccountById(tx.receiverId);

  if (!account) {
    return createError({ message: "account not found" });
  }

  if (!receiverAccount) {
    return createError({ type: "Receive account does not exist" });
  }

  const applyResult = applyTransaction(account, tx);

  if (isError(applyResult)) {
    return applyResult;
  }

  const applyTransferResult = applyTransaction(receiverAccount, tx);

  if (isError(applyTransferResult)) {
    return applyTransferResult;
  }

  await saveAccount(applyTransferResult.success);
  await saveAccount(applyResult.success);

  return applyResult;
}
