<script lang="ts">
export default {
  name: 'CurrencyScreen'
}
</script>

<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { computed, ref } from 'vue'
import { VStack } from '@/shared/ui/stack'
import { type Currency, Currencies } from '@repo/models/finance'

defineEmits<{ (e: 'currencySelected', currency: Currency): void }>()
defineProps<{ currency: Currency | null }>()

const searchString = ref('')

const currencies = computed(() => {
  return Currencies.filter((currency) => currency.includes(searchString.value))
})
</script>

<template>
  <VStack gap="md" h="100%" style="overflow: hidden">
    <Input v-model.upper="searchString" placeholder="Search currency..." />
    <VStack is="ul" m="0" p="0" gap="sm" :class="$style.list">
      <li
        v-for="currency in currencies"
        :key="currency"
        @click="$emit('currencySelected', currency)"
      >
        <span :class="$style.option">
          {{ currency }}
        </span>
      </li>
    </VStack>
  </VStack>
</template>

<style module>
.list {
  overflow: scroll;
  list-style: none;
}

.option {
  font-size: 18px;
  cursor: pointer;
}
</style>
