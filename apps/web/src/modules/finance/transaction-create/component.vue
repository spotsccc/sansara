<script setup lang="ts">
import { AmountScreen, CurrencyScreen, FinalScreen, CategoryScreen } from './sreens'
import { useProvideCreateTransactionModel } from './use-model'
import type { Step } from './step'
import { computed, type Component } from 'vue'
import { VStack } from '@/shared/ui/stack'
import { TransactionHeader } from './header'
import ReceiverCurrencyScreen from './sreens/receiver-currency-screen.vue'
import ReceiverScreen from './sreens/receiver-screen.vue'
import ReceiverAmountScreen from './sreens/receiver-amount-screen.vue'

const { step, loading, account } = useProvideCreateTransactionModel()

const screenMap: Record<Step, Component> = {
  category: CategoryScreen,
  final: FinalScreen,
  currency: CurrencyScreen,
  amount: AmountScreen,
  receiverCurrency: ReceiverCurrencyScreen,
  receiver: ReceiverScreen,
  receiverAmount: ReceiverAmountScreen
}

const screen = computed(() => screenMap[step.value])
</script>

<template>
  <VStack h="100dvh" p="md" gap="md">
    <VStack v-if="loading">Loading</VStack>
    <template v-else-if="account !== null">
      <TransactionHeader />
      <component :is="screen" />
    </template>
    <h1 v-else>Error while loading account</h1>
  </VStack>
</template>

<script lang="ts">
export default {
  name: 'TransactionCreate'
}
</script>
