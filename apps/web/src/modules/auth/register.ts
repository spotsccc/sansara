import { api } from '@/infrastructure/api'
import { useUserStore } from '@/modules/auth'
import { reloadDatabase } from '@/shared/database/unload-database'
import type { RegisterInput } from '@repo/contracts/auth'
import { isError } from '@repo/result'

export async function register(input: RegisterInput) {
  const userStore = useUserStore()

  const registerResult = await api.register(input)

  if (isError(registerResult)) {
    return registerResult
  }

  userStore.userLoaded(registerResult.success.user)

  const initialLoadResult = await api.initialLoad()

  if (isError(initialLoadResult)) {
    return initialLoadResult
  }

  const initialData = initialLoadResult.success

  await reloadDatabase({ accounts: initialData.accounts, transactions: [], categories: [] })

  return registerResult
}
