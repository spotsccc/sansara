import type { Account, Transaction } from '@repo/models/finance'
import { database } from './init-database'
import { createError, createSuccess, isError, type Result } from '@repo/result'
import { api } from '@/infrastructure/api'

export type SaveTransactionResult = Result<
  Transaction,
  { type: 'local-save-error'; internal: unknown }
>

function saveTransactionLocal(
  transaction: Transaction,
  accounts: Array<Account>
): Promise<SaveTransactionResult> {
  return new Promise((resolve, reject) => {
    const tx = database.transaction(['accounts', 'transactions'], 'readwrite')

    const accountsStore = tx.objectStore('accounts')
    const transactionsStore = tx.objectStore('transactions')

    for (const account of accounts) {
      accountsStore.put(account)
    }

    transactionsStore.put(transaction)

    tx.oncomplete = () => resolve(createSuccess(transaction))
    tx.onerror = (e) =>
      reject(
        createError({
          internal: (e.target as IDBRequest<IDBTransaction>).result,
          type: 'local-save-error'
        })
      )
  })
}

async function saveTransaction(tx: Transaction, accounts: Array<Account>) {
  const localSaveResult = await saveTransactionLocal(tx, accounts)

  if (isError(localSaveResult)) {
    return localSaveResult
  }

  const remoteSaveResult = await api.saveTransaction(tx)

  if (isError(remoteSaveResult)) {
    return remoteSaveResult
  }

  return remoteSaveResult
}

export const TransactionsRepository = {
  saveTransaction
}
