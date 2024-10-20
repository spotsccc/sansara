<script lang="ts">
export default {
  name: 'ReceiverScreen'
}
</script>

<script setup lang="ts">
import { getAccounts } from '@/shared/database/accounts-repository'
import { VStack } from '@/shared/ui/stack'
import type { Account } from '@repo/models/finance'
import { computed, onBeforeMount, ref } from 'vue'
import { useCreateTransactionModel } from '../use-model'
import { Input } from '@/shared/ui/input'

const accounts = ref<Array<Account>>([])
const { account, receiverSelectHandler } = useCreateTransactionModel()

const receiverSearchString = ref('')

onBeforeMount(async () => {
  accounts.value = (await getAccounts()).filter((a) => a.id !== account.value?.id)
})

const filteredAccounts = computed(() => {
  return accounts.value.filter((a) => a.name.includes(receiverSearchString.value))
})
</script>

<template>
  <Input v-model="receiverSearchString" />
  <VStack :class="$style.list" h="100%" is="ul">
    <li v-for="acc of filteredAccounts" :key="acc.id" @click="receiverSelectHandler(acc.id)">
      {{ acc.name }}
    </li>
  </VStack>
</template>

<style module>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
