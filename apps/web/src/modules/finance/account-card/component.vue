<script setup lang="ts">
import Card from 'primevue/card'
import { RouterLink } from 'vue-router'
import Graphic from './assets/graphic.svg'
import { formatMoney } from './format-money'
import type { Account } from '@repo/models/finance'

defineProps<{ account: Account }>()
</script>

<template>
  <Card data-testid="account-card" class="card">
    <template #content>
      <div class="root">
        <div class="leftColumn">
          <div class="accountInfo">
            <div data-testid="name">{{ account.name }}</div>
            <div data-testid="balance">
              {{ formatMoney(account.balance[account.defaultCurrency]) }}
            </div>
          </div>
          <div class="links">
            <RouterLink :to="`/accounts/${account.id}/transactions/create?type=income&backUrl=/`">
              <div class="rounded income">
                <i class="pi pi-arrow-down"></i>
              </div>
            </RouterLink>
            <RouterLink :to="`/accounts/${account.id}/transactions/create?type=expense&backUrl=/`">
              <div class="rounded expense">
                <i class="pi pi-arrow-up"></i>
              </div>
            </RouterLink>
            <RouterLink :to="`/accounts/${account.id}/transactions/create?type=transfer&backUrl=/`">
              <div class="rounded transfer">
                <i class="pi pi-arrows-v"></i>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="rightColumn">
          <Graphic />
          <RouterLink class="analyticsLink" :to="`/accounts/${account.id}/analytics`">
            Analytics
          </RouterLink>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card {
  width: 100%;
}

.root {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.leftColumn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.accountInfo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.analyticsLink {
  color: blue;
  text-decoration: none;
  color: blueviolet;
}

.links {
  display: flex;
  gap: 12px;
}

.rightColumn {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.rounded {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: black;
  text-align: center;
  line-height: 36px;
}

.income {
  background: green;
}

.expense {
  background: red;
}

.transfer {
  background: yellow;
}
</style>

<script lang="ts">
export default {
  name: 'AccountCard'
}
</script>
