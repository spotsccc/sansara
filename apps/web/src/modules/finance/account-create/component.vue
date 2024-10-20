<script lang="ts" setup>
import { VStack } from '@/shared/ui/stack'
import { type Step, useProvideAccountCreateModel } from './model'
import { CurrencyScreen, Final, NameScreen } from './screens'
import { computed, type Component } from 'vue'
import { MultiStepHeader } from '../multi-step'

defineProps<{ backUrl?: string }>()

const { step, stepBackHandler, isFirstStep } = useProvideAccountCreateModel()

const screensMap: Record<Step, Component> = {
  currency: CurrencyScreen,
  name: NameScreen,
  final: Final
}

const screen = computed(() => screensMap[step.value])

const titleMap: Record<Step, string> = {
  currency: 'Select default currency',
  name: 'Enter account name',
  final: 'Review account data'
}

const title = computed(() => titleMap[step.value])
</script>

<template>
  <VStack p="md" h="100dvh" gap="md">
    <MultiStepHeader
      :title="title"
      :backUrl="backUrl ?? '/'"
      @stepBack="stepBackHandler"
      :hideStepBack="isFirstStep"
    />
    <component :is="screen" />
  </VStack>
</template>
