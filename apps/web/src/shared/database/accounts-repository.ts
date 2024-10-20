import type { Account } from '@repo/models/finance'
import { database } from './init-database'

export function getAccounts() {
  return selectAllQuery<Account>('accounts')
}

export function saveAccount(account: Account) {
  return saveMutation(account, 'accounts')
}

export function getAccount(id: string) {
  return selectByIdQuery<Account>(id, 'accounts')
}

export function selectByIdQuery<Item>(id: string, storeName: string): Promise<Item | null> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)

    const request = store.get(id)

    // @ts-ignore
    request.onsuccess = (e) => resolve((e.target as IDBRequest<IDBTransaction>).result ?? null)
    transaction.onerror = (e) => reject((e.target as IDBRequest<IDBTransaction>).result)
  })
}

export function selectAllQuery<Item>(storeName: string): Promise<Array<Item>> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)

    const items: Array<Item> = []

    store.openCursor().onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result

      if (cursor) {
        items.push(cursor.value)
        cursor.continue()
      }
    }

    transaction.oncomplete = () => resolve(items)
    transaction.onerror = (e) => {
      reject((e.target as IDBRequest<IDBTransaction>).result)
    }
  })
}

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
