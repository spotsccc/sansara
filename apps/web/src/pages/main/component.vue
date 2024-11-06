<script setup lang="ts">
import Button from 'primevue/button'
import { onBeforeMount, ref } from 'vue'
import type { Account } from '@repo/models/finance'
import { AccountCard } from '@/modules/finance/account-card'
import { getAccounts } from '@/shared/database/accounts-repository'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/modules/auth'

const router = useRouter()
const userStore = useUserStore()

const accounts = ref<Array<Account>>([])

onBeforeMount(async () => {
  if (userStore.user === null) {
    router.push({ name: 'login' })
    return
  }
  accounts.value = await getAccounts()
})
</script>

<template>
  <div data-testid="root" class="root">
    <h1 data-testid="title">Accounts:</h1>
    <Button
      data-testid="create-account-button"
      :as="RouterLink"
      to="/accounts/create"
      class="createButton"
    >
      Create new account
    </Button>
    <div data-testid="account-list">
      <AccountCard v-for="account in accounts" :account :key="account.id!" />
    </div>
  </div>
</template>

<style scoped>
.root {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.createButton {
  width: 100%;
}
</style>

<script lang="ts">
export default {
  name: 'MainPage'
}
</script>
