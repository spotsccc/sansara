<script setup lang="ts">
import { AuthService } from '@/modules/auth'
import { getValidationError } from '@/shared/lib/get-validation-error'
import { Input } from '@/shared/ui/input'
import { useSyncStore } from '@/modules/sync'
import { VStack } from '@/shared/ui/stack'
import { isError } from '@repo/result'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import { VGroup } from '@/shared/ui/group'
import { clearQueue } from '@/modules/sync/add-item'

const router = useRouter()
const syncStore = useSyncStore()
const toast = useToast()

const loading = ref(false)
const email = ref('')
const emailError = ref('')
const password = ref('')
const passwordError = ref('')

const confirmationModalOpened = ref(false)

async function loginButtonClicked() {
  if (syncStore.queue.length > 0) {
    confirmationModalOpened.value = true
    return
  }

  await login()
}

async function losingDataConfirmed() {
  await login()
  confirmationModalOpened.value = false
}

async function losingDataCanceled() {
  confirmationModalOpened.value = false
}

async function login() {
  loading.value = true
  const loginResult = await AuthService.login({ email: email.value, password: password.value })
  loading.value = false

  if (isError(loginResult)) {
    const error = loginResult.error

    if (error.type === 'validation-error') {
      emailError.value = getValidationError(error.errors, 'email')
      passwordError.value = getValidationError(error.errors, 'password')
      return
    }

    if (error.type === 'wrong-email-or-password') {
      emailError.value = error.message
      return
    }

    toast.add({ severity: 'error', summary: 'Something went wrong' })

    return
  }

  clearQueue()

  router.push('/')
}
</script>

<template>
  <Dialog
    v-model:visible="confirmationModalOpened"
    modal
    :header="`You have ${syncStore.queue.length} unsynced items. If you login into another account you will lose this items.`"
  >
    <VGroup w="100%" justify="space-between">
      <Button @click="losingDataConfirmed" severity="danger">Login and lose data</Button>
      <Button @click="losingDataCanceled" severity="secondary">Cancel</Button>
    </VGroup>
  </Dialog>
  <VStack data-testid="root" h="100dvh" justify="center" align="center" p="md" gap="xl">
    <h1 class="title">Login into your account</h1>
    <VStack
      data-testid="login-form"
      w="100%"
      is="form"
      @submit.prevent="loginButtonClicked"
      gap="md"
    >
      <Input
        testId="email"
        :error="emailError"
        v-model="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
      />
      <Input
        testId="password"
        :error="passwordError"
        type="password"
        v-model="password"
        label="Password"
        placeholder="Enter your password"
      />
      <Button data-testid="submit-button" :loading="loading" type="submit">Login</Button>
    </VStack>
    <RouterLink data-testid="dont-have-account-link" class="link" to="/auth/register">
      Don't have an account?
    </RouterLink>
  </VStack>
</template>

<style scoped>
.title {
  margin: 0;
}

.link {
  width: 100%;
  color: blueviolet;
  text-decoration: none;
}
</style>

<script lang="ts">
export default {
  name: 'LoginPage'
}
</script>
