<script lang="ts">
export default {
  name: 'CategoryScreen'
}
</script>

<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { VStack } from '@/shared/ui/stack'
import Button from 'primevue/button'
import { useCreateTransactionModel } from '../use-model'
import { computed, ref, watch } from 'vue'

const { categories, newCategoryCreateHandler, newCategoryCreating, categorySelectHander } =
  useCreateTransactionModel()

const categorySearchString = ref('')
const newCategoryError = ref('')

const filteredCategories = computed(() => {
  return categories.value.filter(({ title }) => title.includes(categorySearchString.value))
})

watch(categorySearchString, () => {
  newCategoryError.value = ''
})

function createButtonHander() {
  if (categorySearchString.value === '') {
    newCategoryError.value = "Category can't be empty"
    return
  }

  newCategoryCreateHandler(categorySearchString.value)
}
</script>

<template>
  <VStack h="100%" gap="md" is="form" @submit.prevent="createButtonHander">
    <Input v-model="categorySearchString" :error="newCategoryError" />
    <VStack
      :class="$style.list"
      v-if="filteredCategories.length > 0"
      style="overflow-y: scroll"
      is="ul"
      height="100%"
    >
      <li
        @click="categorySelectHander(category.id)"
        v-for="category of filteredCategories"
        :key="category.id"
      >
        {{ category.title }}
      </li>
    </VStack>
    <Button :loading="newCategoryCreating" type="submit" v-else>Create new category</Button>
  </VStack>
</template>

<style module>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
