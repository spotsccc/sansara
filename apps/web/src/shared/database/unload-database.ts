import { database } from './init-database'

export function unloadAccounts(): Promise<null> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('accounts', 'readwrite')

    const store = transaction.objectStore('accounts')

    const request = store.clear()

    request.onsuccess = () => resolve(null)
    request.onerror = (e) => reject((e.target as IDBRequest<IDBTransaction>).result)
  })
}

export async function unloadDatabase() {
  const toUnload = Promise.all([unloadAccounts()])

  return toUnload
}
