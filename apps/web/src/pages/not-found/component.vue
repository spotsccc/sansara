<script setup lang="ts">
import { VStack } from '@/shared/ui/stack'
import { RouterLink } from 'vue-router'
</script>

<template>
  <VStack>
    <h1>Not found</h1>
    <RouterLink :to="{ name: 'home' }">Go to home</RouterLink>
  </VStack>
</template>
