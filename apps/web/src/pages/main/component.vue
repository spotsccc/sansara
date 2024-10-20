<script setup lang="ts">
import Button from 'primevue/button'
import { onBeforeMount, ref } from 'vue'
import type { Account } from '@repo/models/finance'
import { AccountCard } from '@/modules/finance/account-card'
import { getAccounts } from '@/shared/database/accounts-repository'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/shared/auth'

const router = useRouter()
const userStore = useUserStore()

const error = ref<null | string>(null)
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
  <div class="root">
    <div v-if="error">{{ error }}</div>
    <div class="container" v-else>
      <h1>Accounts:</h1>
      <Button :as="RouterLink" to="/accounts/create" class="createButton">
        Create new account
      </Button>
      <AccountCard v-for="account in accounts" :account :key="account.id!" />
    </div>
  </div>
</template>

<style scoped>
.root {
  padding: 24px;
}

.container {
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
