<script setup lang="ts">
import { api } from '@/infrastructure/api'
import { AuthService, useUserStore } from '@/modules/auth'
import { getValidationError } from '@/shared/lib/get-validation-error'
import { Input } from '@/shared/ui/input'
import { VStack } from '@/shared/ui/stack'
import { isError } from '@repo/result'
import Button from 'primevue/button'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const password = ref('')
const passwordError = ref('')
const email = ref('')
const emailError = ref('')
const repeatPassword = ref('')
const repeatPasswordError = ref('')
const username = ref('')
const usernameError = ref('')
const loading = ref(false)

watch(password, () => {
  passwordError.value = ''
  repeatPasswordError.value = ''
})

watch(username, () => {
  usernameError.value = ''
})

watch(email, () => {
  emailError.value = ''
})

watch(repeatPassword, () => {
  repeatPasswordError.value = ''
  passwordError.value = ''
})

async function register() {
  loading.value = true
  const res = await AuthService.register({
    username: username.value,
    email: email.value,
    repeatPassword: repeatPassword.value,
    password: password.value
  })
  loading.value = false

  if (isError(res)) {
    const error = res.error

    switch (error.type) {
      case 'validation-error':
        emailError.value = getValidationError(error.errors, 'email')
        usernameError.value = getValidationError(error.errors, 'username')
        passwordError.value = getValidationError(error.errors, 'password')
        repeatPasswordError.value = getValidationError(error.errors, 'repeatPassword')
        return

      case 'username-already-exists':
        usernameError.value = error.message
        return

      case 'email-already-exists':
        emailError.value = error.message
        return

      case 'internal-error':
        return
    }
  }

  router.push('/')
}
</script>

<template>
  <VStack data-testid="root" justify="center" align="center" p="md" h="100dvh" gap="xl">
    <h1 data-testid="title" class="title">Register new account</h1>
    <VStack
      data-testid="register-form"
      is="form"
      @submit.prevent="register"
      w="100%"
      maw="500px"
      align="scratch"
      gap="md"
      justify="space-between"
    >
      <Input
        testId="email"
        v-model="email"
        label="Email"
        placeholder="Enter email"
        :error="emailError"
        type="email"
      />
      <Input
        testId="username"
        type="text"
        v-model="username"
        label="Username"
        placeholder="Enter username"
        :error="usernameError"
      />
      <Input
        testId="password"
        type="password"
        v-model="password"
        label="Password"
        placeholder="Enter password"
        :error="repeatPasswordError"
      />
      <Input
        testId="repeat-password"
        type="password"
        v-model="repeatPassword"
        label="Repeat password"
        placeholder="Repeate password"
        :error="repeatPasswordError"
      />

      <Button data-testid="submit-button" type="submit" :loading>Register</Button>
    </VStack>
    <RouterLink data-testid="already-have-account-link" class="link" to="/auth/login">
      Already have an account?
    </RouterLink>
  </VStack>
</template>

<style lang="css" scoped>
.title {
  margin: 0;
  text-align: center;
}

.link {
  width: 100%;
  color: blueviolet;
  text-decoration: none;
}
</style>

<script lang="ts">
export default {
  name: 'RegisterPage'
}
</script>
