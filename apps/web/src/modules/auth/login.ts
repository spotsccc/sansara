import { api } from '@/infrastructure/api'
import { useUserStore } from '@/modules/auth'
import { reloadDatabase } from '@/shared/database/unload-database'
import type { LoginInput } from '@repo/contracts/auth'
import { isError } from '@repo/result'
import { clearQueue } from '../sync/add-item'

export async function login(input: LoginInput) {
  const userStore = useUserStore()

  const loginResult = await api.login(input)

  if (isError(loginResult)) {
    return loginResult
  }

  userStore.userLoaded(loginResult.success.user)

  const initialLoadResult = await api.initialLoad()

  if (isError(initialLoadResult)) {
    return initialLoadResult
  }

  const initialData = initialLoadResult.success

  await reloadDatabase({ accounts: initialData.accounts, transactions: [], categories: [] })
  clearQueue()

  return loginResult
}
