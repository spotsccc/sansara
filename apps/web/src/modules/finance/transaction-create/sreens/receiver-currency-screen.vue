<script lang="ts">
export default {
  name: 'ReceiverCurrencyScreen'
}
</script>

<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { computed, ref } from 'vue'
import { useCreateTransactionModel } from '../use-model'
import { Currencies } from '@repo/models/finance'

const searchString = ref('')

const currencies = computed(() => {
  return Currencies.filter((currency) => currency.includes(searchString.value))
})

const { receiverCurrencySelectHandler } = useCreateTransactionModel()
</script>

<template>
  <Input v-model.upper="searchString" placeholder="Search currency..." />
  <ul :class="$style.list">
    <li
      v-for="currency in currencies"
      :key="currency"
      @click="receiverCurrencySelectHandler(currency)"
    >
      <span :class="$style.option">
        {{ currency }}
      </span>
    </li>
  </ul>
</template>

<style module>
.option {
  font-size: 18px;
}

.list {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
