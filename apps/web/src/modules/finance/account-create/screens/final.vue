<script lang="ts">
export default {
  name: 'AccountCreateNameScreen'
}
</script>

<script setup lang="ts">
import { VGroup } from '@/shared/ui/group'
import { VStack } from '@/shared/ui/stack'
import Button from 'primevue/button'
import { useAccountCreateModel } from '../model'

const { name, currency, loading, accountCreateButtonClicked, createAccountError } =
  useAccountCreateModel()
</script>

<template>
  <VStack justify="space-between" h="100%">
    <VStack gap="md">
      <VGroup justify="space-between">
        <span>Name:</span>
        <span data-testid="name">{{ name }}</span>
      </VGroup>
      <VGroup justify="space-between">
        <span>Default currency:</span>
        <span data-testid="currency">{{ currency }}</span>
      </VGroup>
      <span>{{ createAccountError }}</span>
    </VStack>
    <Button data-testid="confirm-button" @click="accountCreateButtonClicked" :loading="loading"
      >Create account</Button
    >
  </VStack>
</template>
