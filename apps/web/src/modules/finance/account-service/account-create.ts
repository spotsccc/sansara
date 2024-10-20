import { api } from '@/shared/api'
import { saveAccount } from '@/shared/database/accounts-repository'
import {
  type Currency,
  createAccount as createAccountModel,
  type Account
} from '@repo/models/finance'
import { createError, createSuccess, isError, type Result } from '@repo/result'
import type { AccountSaveOutput } from '../../../../../../packages/contracts/src/finance/account/create'
import { addUnsyncItem } from '@/shared/sync'

type CreateAccountOutput = Result<
  Account,
  | { type: 'local-save-error' | 'network-error'; message: string }
  | {
      type: 'remote-save-error'
      remoteError: Extract<AccountSaveOutput, { tag: 'error' }>['error']
    }
>

export async function createAccount(accountDraft: {
  name: string
  userId: string
  defaultCurrency: Currency
}): Promise<CreateAccountOutput> {
  const account = createAccountModel(accountDraft)

  try {
    await saveAccount(account)
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: 'local-save-error' as const, message: error.message })
    }
    return createError({ type: 'local-save-error' as const, message: 'Unknown error' })
  }

  try {
    const res = await api.saveAccount(account)

    if (isError(res)) {
      addUnsyncItem({ type: 'account', id: account.id })
      return createError({ type: 'remote-save-error' as const, remoteError: res.error })
    }
  } catch (error) {
    if (error instanceof Error) {
      addUnsyncItem({ type: 'account', id: account.id })
      return createError({ type: 'network-error' as const, message: error.message })
    }

    addUnsyncItem({ type: 'account', id: account.id })
    return createError({ type: 'network-error' as const, message: 'Unknown error' })
  }
  return createSuccess(account)
}
