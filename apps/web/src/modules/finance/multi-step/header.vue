<script lang="ts">
export default {
  name: 'MultiStepHeader'
}
</script>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { VGroup } from '@/shared/ui/group'

defineProps<{ title: string; backUrl: string; hideStepBack?: boolean }>()
defineEmits<{ (e: 'stepBack'): void }>()
</script>

<template>
  <VGroup is="header" w="100%" justify="space-between" align="center">
    <button :class="$style.unstyledButton" @click="$emit('stepBack')">
      <i
        v-show="!hideStepBack"
        style="font-size: 1.5rem"
        :class="['pi pi-arrow-left', $style.icon]"
      />
    </button>
    <h2 :class="$style.title">{{ title }}</h2>
    <RouterLink style="text-decoration: none" :to="backUrl">
      <i style="font-size: 1.5rem" :class="['pi pi-times', $style.icon]" />
    </RouterLink>
  </VGroup>
</template>

<style module>
.title {
  margin: 0;
  text-align: center;
}

.unstyledButton {
  padding: 0;
  margin: 0;
  background: inherit;
  outline: none;
  border: none;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
}
</style>
