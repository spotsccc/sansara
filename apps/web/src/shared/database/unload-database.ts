import type { Account, Category, Transaction } from '@repo/models/finance'
import { database } from './init-database'
import { saveMutation } from './accounts-repository'

export function unloadAccounts(): Promise<null> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('accounts', 'readwrite')

    const store = transaction.objectStore('accounts')

    const request = store.clear()

    request.onsuccess = () => resolve(null)
    request.onerror = (e) => reject((e.target as IDBRequest<IDBTransaction>).result)
  })
}

export function unloadTransactions(): Promise<null> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('transactions', 'readwrite')

    const store = transaction.objectStore('transactions')

    const request = store.clear()

    request.onsuccess = () => resolve(null)
    request.onerror = (e) => reject((e.target as IDBRequest<IDBTransaction>).result)
  })
}

export function unloadCategories(): Promise<null> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('categories', 'readwrite')

    const store = transaction.objectStore('categories')

    const request = store.clear()

    request.onsuccess = () => resolve(null)
    request.onerror = (e) => reject((e.target as IDBRequest<IDBTransaction>).result)
  })
}

export async function reloadDatabase({
  accounts,
  transactions,
  categories
}: {
  accounts: Array<Account>
  transactions: Array<Transaction>
  categories: Array<Category>
}) {
  await Promise.all([unloadAccounts(), unloadTransactions(), unloadCategories()])

  await Promise.all([
    saveMutation(accounts, 'accounts'),
    saveMutation(transactions, 'transactions'),
    saveMutation(categories, 'categories')
  ])
}
