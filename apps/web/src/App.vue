<script setup lang="ts">
import Toast from 'primevue/toast'
import { onBeforeMount, ref } from 'vue'
import { initializeDatabase } from './shared/database'
import { startUpdateTicker, SyncReminder } from './modules/sync'

const databaseState = ref('not-started')
const dbError = ref<null | string>()
onBeforeMount(async () => {
  try {
    databaseState.value = 'started'
    await initializeDatabase()
    databaseState.value = 'ready'
  } catch (error) {
    databaseState.value = 'error'

    if (error instanceof Error) {
      dbError.value = error.message
    } else {
      dbError.value = 'Unknown error happend'
    }
  }

  startUpdateTicker()
})
</script>

<template>
  <Toast />
  <SyncReminder />
  <RouterView v-if="databaseState === 'ready'" />
  <div v-else-if="databaseState === 'started'">loading</div>
  <div v-else-if="databaseState === 'not-started'">starting</div>
  <div v-else-if="databaseState === 'error'">{{ dbError }}</div>
</template>

<style scoped></style>
