export type Item = {
  type: 'account' | 'transaction'
  id: string
}

const QUEUE_KEY = 'sync-queue'
export const UPDATE_SYNC_QUEUE_EVENT = 'update-sync-queue'

export function getQueue(): Array<Item> {
  const stringQueue = window.localStorage.getItem(QUEUE_KEY)
  return stringQueue ? JSON.parse(stringQueue) : []
}

export function addUnsyncItem(item: Item) {
  const stringQueue = window.localStorage.getItem(QUEUE_KEY)
  const queue: Array<Item> = stringQueue ? JSON.parse(stringQueue) : []

  queue.push(item)

  saveQueue(queue)
}

export function saveQueue(queue: Array<Item>) {
  window.localStorage.setItem('sync-queue', JSON.stringify(queue))

  const event = new Event(UPDATE_SYNC_QUEUE_EVENT)

  window.dispatchEvent(event)
}

export function clearQueue() {
  window.localStorage.setItem('sync-queue', JSON.stringify([]))
  const event = new Event(UPDATE_SYNC_QUEUE_EVENT)

  window.dispatchEvent(event)
}
