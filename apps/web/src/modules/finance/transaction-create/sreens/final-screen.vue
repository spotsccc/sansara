<script lang="ts">
export default {
  name: 'FinalScreen'
}
</script>

<script setup lang="ts">
import { VStack } from '@/shared/ui/stack'
import { useCreateTransactionModel } from '../use-model'
import { VGroup } from '@/shared/ui/group'
import Button from 'primevue/button'

const {
  currency,
  amount,
  account,
  createTransactionHandler,
  creating,
  type,
  category,
  receiver,
  receiverAmount,
  receiverCurrency
} = useCreateTransactionModel()
</script>

<template>
  <VStack h="100%" justify="space-between">
    <VStack gap="md">
      <VGroup justify="space-between">
        <span>Account:</span>
        <span>{{ account!.name }}</span>
      </VGroup>

      <VGroup justify="space-between">
        <span>Transaction type:</span>
        <span>{{ type }}</span>
      </VGroup>

      <VGroup v-show="type === 'expense'" justify="space-between">
        <span>Category:</span>
        <span>{{ category?.title ?? '' }}</span>
      </VGroup>

      <VGroup justify="space-between">
        <span>Amount:</span>
        <span>{{ amount }} {{ currency }}</span>
      </VGroup>

      <VGroup v-show="type === 'transfer'" justify="space-between">
        <span>Receiver:</span>
        <span>{{ receiver?.name ?? '' }}</span>
      </VGroup>

      <VGroup v-show="type === 'transfer'" justify="space-between">
        <span>Amount:</span>
        <span>{{ receiverAmount }} {{ receiverCurrency }}</span>
      </VGroup>
    </VStack>
    <Button :loading="creating" @click="createTransactionHandler">Create transaction</Button>
  </VStack>
</template>

<style lang="css" scoped>
.title {
  margin: 0;
}
</style>
