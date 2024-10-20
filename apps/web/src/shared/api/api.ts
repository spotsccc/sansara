import { hc } from 'hono/client'
import type { AppType } from 'server'
import type { LoginInput, RegisterInput } from '@repo/contracts/auth'
import type { AccountCreateInput } from '@repo/contracts/finance'
import { ref } from 'vue'
import { getConfig } from '../config/get-config'

function createRequest<I = void, O = unknown>(fn: (input: I) => Promise<O>) {
  const isPending = ref(false)

  return {
    request: async (input: I) => {
      let res
      try {
        isPending.value = true
        res = await fn(input)
        isPending.value = false
      } catch (error) {
        isPending.value = false
        throw error
      }
      return res
    },
    isPending
  }
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

const login = createRequest(async (data: LoginInput) => {
  const res = await client.auth.login.$post({ json: data })

  return res.json()
})

const register = createRequest(async (data: RegisterInput) => {
  const res = await client.auth.register.$post({ json: data })

  return res.json()
})

const getAccount = createRequest(async (id: number) => {
  const res = await client.finance.accounts[':id'].$get({ param: { id: String(id) } })

  return res.json()
})

async function saveAccount(data: AccountCreateInput) {
  const res = await client.finance.accounts.$post({ json: data })
  return res.json()
}

async function initialLoad() {
  const res = await client.sync.load.$get()
  return res.json()
}

export const api = {
  login,
  register,
  saveAccount,
  initialLoad
}
