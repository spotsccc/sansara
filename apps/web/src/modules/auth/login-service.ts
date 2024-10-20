import { api } from '@/infrastructure/api'
import { useUserStore } from '@/shared/auth'
import { unloadDatabase } from '@/shared/database'
import { loadDatabase } from '@/shared/database/load-database'
import type { LoginInput } from '@repo/contracts/auth'
import { isError } from '@repo/result'

export async function loginService(input: LoginInput) {
  const userStore = useUserStore()

  const loginResult = await api.login(input)

  if (isError(loginResult)) {
    return loginResult
  }

  userStore.userLoaded(loginResult.success.user)

  await unloadDatabase()

  const initialLoadResult = await api.initialLoad()

  if (isError(initialLoadResult)) {
    return initialLoadResult
  }

  const initialData = initialLoadResult.success

  const loadDatabaseResult = await loadDatabase(initialData)

  if (isError(loadDatabaseResult)) {
    return loadDatabaseResult
  }

  return loginResult
}
