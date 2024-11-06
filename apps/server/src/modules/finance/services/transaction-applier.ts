import {
  type Transaction,
  type TransactionIncome,
  applyTransaction,
  type TransactionExpense,
  type TransactionTransfer,
} from "@repo/models/finance";
import { createError, isError } from "@repo/result";
import { getAccountById } from "../repository/account/get-account-by-id";
import { saveAccount } from "../repository/account/save-account";
import { saveTransaction } from "../repository/transaction/save-transaction";

const ERRORS = {
  accountNotFound: "remote-account-not-found" as const,
  receiverNotFound: "remote-receiver-not-found" as const,
};

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
    return createError({ type: ERRORS.accountNotFound });
  }

  const applyResult = applyTransaction(account, tx);

  if (isError(applyResult)) {
    return createError({ type: "remote" as const, internal: applyResult });
  }

  await saveTransaction(tx);
  await saveAccount(applyResult.success);

  return applyResult;
}

async function applyExpenseTransaction(tx: TransactionExpense) {
  const account = await getAccountById(tx.accountId);

  if (!account) {
    return createError({ type: ERRORS.accountNotFound });
  }

  const applyResult = applyTransaction(account, tx);

  if (isError(applyResult)) {
    return createError({ type: "remote" as const, internal: applyResult });
  }

  await saveTransaction(tx);
  await saveAccount(applyResult.success);

  return applyResult;
}

async function applyTransferTransaction(tx: TransactionTransfer) {
  const account = await getAccountById(tx.accountId);
  const receiverAccount = await getAccountById(tx.receiverId);

  if (!account) {
    return createError({ type: ERRORS.accountNotFound });
  }

  if (!receiverAccount) {
    return createError({ type: ERRORS.receiverNotFound });
  }

  const applyResult = applyTransaction(account, tx);
  const applyTransferResult = applyTransaction(receiverAccount, tx);

  if (isError(applyResult)) {
    return createError({ type: "remote" as const, internal: applyResult });
  }

  if (isError(applyTransferResult)) {
    return createError({
      type: "remote" as const,
      internal: applyTransferResult,
    });
  }

  await saveTransaction(tx);
  await saveAccount(applyTransferResult.success);
  await saveAccount(applyResult.success);

  return applyResult;
}
