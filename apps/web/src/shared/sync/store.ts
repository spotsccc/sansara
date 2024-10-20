import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '.'
import { api } from '../api'
import { getAccount } from '../database/accounts-repository'
import { UPDATE_SYNC_QUEUE_EVENT, getQueue, saveQueue } from './add-item'

export const useSyncStore = defineStore('sync-store', () => {
  const queue = ref<Array<Item>>(getQueue())

  window.addEventListener(UPDATE_SYNC_QUEUE_EVENT, () => {
    queue.value = getQueue()
  })

  async function startSyncronizing() {
    const notSynced = []
    while (queue.value.length) {
      const itemToSync = queue.value.shift()

      switch (itemToSync?.type) {
        case 'account':
          const account = await getAccount(itemToSync.id)
          if (account) {
            try {
              api.saveAccount(account)
            } catch (e) {
              notSynced.push(itemToSync)
            }
          }
      }
    }

    saveQueue(notSynced.reverse())
  }

  return {
    queue,
    startSyncronizing
  }
})
