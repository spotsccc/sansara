<script setup lang="ts">
import { computed } from 'vue'
import {
  type BaseComponentProps,
  mapBaseComponentPropsToStyles,
  mapMayBeSizeProperty,
  SPACING_VAR
} from '../types'

const props = defineProps<
  {
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    justify?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    align?: 'scratch' | 'center' | 'flex-start' | 'flex-end'
  } & BaseComponentProps
>()

const styles = computed(() => {
  return {
    justifyContent: props.justify ?? 'flex-start',
    alignItems: props.align ?? 'scratch',
    gap: mapMayBeSizeProperty(props.gap, SPACING_VAR),
    ...mapBaseComponentPropsToStyles(props)
  }
})
</script>

<template>
  <component :is="$attrs.is ?? 'div'" :class="['root']" :style="styles">
    <slot />
  </component>
</template>

<style lang="css" scoped>
.root {
  display: flex;
}
</style>

<script lang="ts">
export default {
  name: 'VStack'
}
</script>
