<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import InputNumber from 'primevue/inputnumber'

const initialFontSize = 48

const model = defineModel<string>()
defineProps<{ currency: string }>()

const inputRef = useTemplateRef('input')
const divRef = useTemplateRef<HTMLDivElement>('div')
const fontSize = ref(initialFontSize)
const fontSizeStyle = computed(() => ({ fontSize: `${fontSize.value}px` }))

watch(model, () => {
  if (inputRef.value && divRef.value) {
    // @ts-ignore
    const inputWidth = inputRef.value.rootEl.getBoundingClientRect().width
    const textWidth = divRef.value.getBoundingClientRect().width

    if (textWidth > 0 && fontSize.value >= 12 && fontSize.value <= 48) {
      const newFontSize = fontSize.value * (inputWidth / 2 / textWidth)

      if (newFontSize < 12) {
        fontSize.value = 12
        return
      }

      if (newFontSize > 48) {
        fontSize.value = 48
        return
      }

      fontSize.value = newFontSize
    }
  }
})

const value = computed(() => (model.value?.length === 0 ? undefined : Number(model.value)))

function inputHandler(v: { value: number }) {
  model.value = v.value === null ? '' : String(v.value)
}
</script>

<template>
  <div ref="div" class="hiddenDiv" :style="fontSizeStyle">{{ model }}</div>
  <InputNumber
    @input="inputHandler"
    :model-value="value"
    inputClass="input"
    :input-style="fontSizeStyle"
    :placeholder="`0.00 ${currency}`"
    ref="input"
    :suffix="`${currency}`"
    :max-fraction-digits="12"
  />
</template>

<style scoped>
.hiddenDiv {
  width: auto;
  display: inline;
  visibility: hidden;
  position: fixed;
  overflow: auto;
}

::v-deep(.input) {
  text-align: center;
  height: 60px;
  width: 100%;
  border: none;
  background: inherit;
}
</style>

<script lang="ts">
export default {
  name: 'AmountInput'
}
</script>
