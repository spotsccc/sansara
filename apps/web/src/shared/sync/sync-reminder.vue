<script lang="ts">
export default {
  name: 'SyncRemider'
}
</script>

<script setup lang="ts">
import { useSyncStore } from './store'

const syncStore = useSyncStore()
</script>

<template>
  <div :class="$style.root" v-show="syncStore.queue.length > 0">
    <Button @click="syncStore.startSyncronizing">Sync {{ syncStore.queue.length }} items</Button>
  </div>
</template>

<style lang="css" module>
.root {
  position: absolute;
  top: 0;
}
</style>
