<script lang="ts">
export default {
  name: 'CreateAccountCurrencyScreen'
}
</script>

<script setup lang="ts">
import { CurrencyScreen } from '../../multi-step'
import { useAccountCreateModel } from '../model'

const { currency, currencyChangeHandler } = useAccountCreateModel()
</script>

<template>
  <CurrencyScreen :currency="currency" @currencySelected="currencyChangeHandler" />
</template>
