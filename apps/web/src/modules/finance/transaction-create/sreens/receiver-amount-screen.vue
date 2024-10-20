<script lang="ts">
export default {
  name: 'ReceiverAmountScreen'
}
</script>

<script setup lang="ts">
import { AmountInput } from '../amount-input'
import Button from 'primevue/button'
import { useCreateTransactionModel } from '../use-model'
import { VStack } from '@/shared/ui/stack'

const { receiverCurrency, receiverAmountHandler, receiverAmountEntered, receiverAmount } =
  useCreateTransactionModel()
</script>

<template>
  <VStack h="100%" justify="center">
    <AmountInput
      :model-value="receiverAmount"
      @update:model-value="receiverAmountHandler"
      :currency="receiverCurrency!"
    />
  </VStack>
  <Button @click="receiverAmountEntered">Next</Button>
</template>
