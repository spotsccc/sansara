export let database: IDBDatabase

export function initializeDatabase() {
  const request = window.indexedDB.open('plata', 1)

  return new Promise((resolve, reject) => {
    request.onerror = (error) => reject(error)
    request.onsuccess = (evt) => {
      const db = (evt.target as IDBOpenDBRequest).result
      database = db
      resolve(db)
    }
    request.onupgradeneeded = (evt) => {
      const db = (evt.target as IDBOpenDBRequest).result

      db.createObjectStore('accounts', {
        keyPath: 'id'
      })

      db.createObjectStore('transactions', {
        keyPath: 'id'
      })

      db.createObjectStore('categories', {
        keyPath: 'id'
      })
    }
  })
}
