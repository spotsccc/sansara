import { api } from '@/infrastructure/api'
import { saveMutation } from '@/shared/database/accounts-repository'
import { isError } from '@repo/result'

export const LAST_SYNC_DATE_KEY = 'LAST_SYNC_DATE_KEY'

export function getLastSyncDate() {
  const stringQueue = window.localStorage.getItem(LAST_SYNC_DATE_KEY)
  return stringQueue ? new Date(stringQueue) : null
}

export function saveLastSyncDate(date: Date) {
  window.localStorage.setItem(LAST_SYNC_DATE_KEY, date.toISOString())
}

export function startUpdateTicker() {
  setInterval(async () => {
    const lastSyncDate = getLastSyncDate()
    const updatesResult = await api.getUpdates(lastSyncDate ?? new Date())

    if (isError(updatesResult)) {
      return
    }

    saveLastSyncDate(new Date())

    await saveMutation(updatesResult.success.accounts, 'accounts')
  }, 10000)
}
