<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useTemplateRef } from 'vue'

defineOptions({
  inheritAttrs: false
})

const inputRef = useTemplateRef('input')

defineExpose({ inputRef })
defineProps<{ label?: string; error?: string; placeholder?: string; type?: string }>()

const [model, modifiers] = defineModel<string>({
  set(value) {
    if (modifiers.upper) {
      return value.toUpperCase()
    }
    return value
  }
})
</script>

<template>
  <div class="inputContainer">
    <label class="label" v-show="!!label" for="label">{{ label }}</label>
    <InputText ref="input" v-bind="$attrs" :placeholder v-model="model" :type />
    <span class="errorLabel" v-show="!!error" id="label">{{ error }}</span>
  </div>
</template>

<style scoped>
.label {
  font-size: 14px;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.errorLabel {
  color: red;
  font-size: 12px;
}
</style>

<script lang="ts">
export default {
  name: 'VInput'
}
</script>
