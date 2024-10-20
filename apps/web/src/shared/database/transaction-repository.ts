import type { Account, Transaction } from '@repo/models/finance'
import { database } from './init-database'

export function saveTransaction(transaction: Transaction, accounts: Array<Account>) {
  return new Promise((resolve, reject) => {
    const tx = database.transaction(['accounts', 'transactions'], 'readwrite')

    const accountsStore = tx.objectStore('accounts')
    const transactionsStore = tx.objectStore('transactions')

    for (const account of accounts) {
      accountsStore.put(account)
    }

    transactionsStore.put(transaction)

    tx.oncomplete = () => resolve(null)
    //@ts-ignore
    tx.onerror = (e) => reject(e.target.result)
  })
}
