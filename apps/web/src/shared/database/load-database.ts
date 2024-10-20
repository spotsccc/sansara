import type { Account } from '@repo/models/finance'
import { database } from './init-database'
import { createError, createSuccess } from '@repo/result'

export function saveMutation<Item>(item: Item | Array<Item>, storeName: string) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)

    if (Array.isArray(item)) {
      for (const i of item) {
        store.put(i)
      }
    } else {
      store.put(item)
    }

    transaction.oncomplete = (e) => {
      resolve((e.target as IDBRequest<IDBTransaction>).result)
    }
    transaction.onerror = (e) => {
      reject((e.target as IDBRequest<IDBTransaction>).result)
    }
  })
}

export async function loadDatabase({ accounts }: { accounts: Array<Account> }) {
  try {
    await saveMutation(accounts, 'accounts')

    return createSuccess(null)
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: 'local-save-error', message: error.message })
    }

    return createError({ type: 'local-save-error', message: 'Unknown error' })
  }
}
