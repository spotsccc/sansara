<script lang="ts">
export default {
  name: 'AccountCreateNameScreen'
}
</script>

<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { VStack } from '@/shared/ui/stack'
import Button from 'primevue/button'
import { useAccountCreateModel } from '../model'

const { name, nameError, nameChangeHandler, nameEntered } = useAccountCreateModel()
</script>

<template>
  <VStack h="100%" justify="space-between">
    <Input
      placeholder="Enter account name"
      v-model:model-value="name"
      @update:model-value="nameChangeHandler"
      :error="nameError"
    />
    <Button :disabled="nameError.length !== 0" @click="nameEntered">Next</Button>
  </VStack>
</template>
