import { hc, type InferResponseType } from 'hono/client'
import type { AppType } from 'server'
import type { LoginInput, RegisterInput } from '@repo/contracts/auth'
import { ref } from 'vue'
import { getConfig } from '@/config'
import { createError, type Result } from '@repo/result'
import type { AccountSaveInput } from '@repo/contracts/finance'
import type { Category, Transaction } from '@repo/models/finance'

function createRequest<I = void, O = unknown>(fn: (input: I) => Promise<O>) {
  const isPending = ref(false)

  return {
    request: async (input: I) => {
      let res
      try {
        isPending.value = true
        res = await fn(input)
        isPending.value = false
        return res
      } catch (error) {
        isPending.value = false
        throw error
      }
    },
    isPending
  }
}

export type ApiResponse<R extends Result<unknown, unknown>> = Promise<
  Result<
    Extract<R, { tag: 'success' }>['success'],
    Extract<R, { tag: 'error' }>['error'] | ApiError | JsonParsingError
  >
>

export const API_ERROR = 'api-error' as const
export const JSON_PARSING_ERROR = 'json-parsing-error' as const

export type ApiError = {
  type: typeof API_ERROR
  message: string
}

export type JsonParsingError = {
  type: typeof JSON_PARSING_ERROR
  message: string
}

const client = hc<AppType>(getConfig().api.url, {
  fetch(input, requestInit, _, __) {
    return fetch(input, { ...requestInit, credentials: 'include' })
  }
})

const getAccounts = createRequest(async () => {
  const res = await client.finance.accounts.$get()

  return res.json()
})

async function login(data: LoginInput) {
  let res
  try {
    res = await client.auth.login.$post({ json: data })
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: 'api-error' as const, message: error.message })
    }
    return createError({ type: 'api-error' as const, message: 'Unknown error' })
  }

  try {
    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: 'json-parsing-error' as const, message: error.message })
    }
    return createError({ type: 'json-parsing-error' as const, message: 'Unknown error' })
  }
}

async function getUpdates(lastSyncDate: Date) {
  let res
  try {
    res = await client.sync['get-updates'].$get({
      query: { sync_date: lastSyncDate.toISOString() }
    })
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: 'api-error' as const, message: error.message })
    }
    return createError({ type: 'api-error' as const, message: 'Unknown error' })
  }

  try {
    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: 'json-parsing-error' as const, message: error.message })
    }
    return createError({ type: 'json-parsing-error' as const, Message: 'Unknown error' })
  }
}

async function register(data: RegisterInput) {
  const res = await client.auth.register.$post({ json: data })

  return res.json()
}

const getAccount = createRequest(async (id: number) => {
  const res = await client.finance.accounts[':id'].$get({ param: { id: String(id) } })

  return res.json()
})

async function saveAccount(data: AccountSaveInput) {
  const res = await client.finance.accounts.$post({ json: data })
  return res.json()
}

async function initialLoad(): ApiResponse<InferResponseType<typeof client.sync.load.$get>> {
  let res
  try {
    res = await client.sync.load.$get()
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: API_ERROR, message: error.message })
    }
    return createError({ type: API_ERROR, message: 'Unknown error' })
  }

  try {
    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      return createError({ type: JSON_PARSING_ERROR, message: error.message })
    }
    return createError({ type: JSON_PARSING_ERROR, message: 'Unknown error' })
  }
}

async function saveTransaction(data: Transaction) {
  const res = await client.finance.transactions.$post({ json: data })
  return res.json()
}

async function saveCategory(data: Category) {
  const res = await client.finance.categories.$post({ json: data })
  return res.json()
}

export const api = {
  saveTransaction,
  login,
  register,
  saveAccount,
  initialLoad,
  getUpdates,
  saveCategory
}
