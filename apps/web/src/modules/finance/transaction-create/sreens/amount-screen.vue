<script lang="ts">
export default {
  name: 'AmountScreen'
}
</script>

<script setup lang="ts">
import { AmountInput } from '../amount-input'
import Button from 'primevue/button'
import { useCreateTransactionModel } from '../use-model'
import { VStack } from '@/shared/ui/stack'

const { amountHandler, amount, amountEntered, currency } = useCreateTransactionModel()
</script>

<template>
  <VStack h="100%" justify="center">
    <AmountInput :model-value="amount" @update:model-value="amountHandler" :currency="currency!" />
  </VStack>
  <Button @click="amountEntered">Next</Button>
</template>
