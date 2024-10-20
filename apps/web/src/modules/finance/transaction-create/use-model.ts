import { useRouteQuery } from '@vueuse/router'
import { firstStep, nextStep, previosStep, stepIndex, type Step } from './step'
import { computed, inject, onBeforeMount, provide, ref, type InjectionKey } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  type Account,
  type Category,
  type Currency,
  type TransactionType
} from '@repo/models/finance'
import { getAccounts } from '@/shared/database/accounts-repository'
import { getCategories } from '@/shared/database/categories-repository'
import { createCategoryService, createTransactionService } from './service'
import { isError } from '@repo/result'

const transactionCreateModelKey: InjectionKey<ReturnType<typeof useProvideCreateTransactionModel>> =
  Symbol('transactionCreateModel')

export function useProvideCreateTransactionModel() {
  const router = useRouter()
  const route = useRoute()

  const accounts = ref<Array<Account>>([])
  const account = computed(() =>
    accounts.value.find((a) => a.id === (route.params['accountId'] as string))
  )
  const categories = ref<Array<Category>>([])
  const backUrl = useRouteQuery<string>('backUrl', `/accounts/${account.value?.id ?? ''}`)
  const isFirstStep = computed(() => stepIndex(step.value, type.value) === 0)
  const creating = ref(false)
  const loading = ref(false)

  function stepBack() {
    step.value = previosStep(step.value, type.value)
  }

  onBeforeMount(async () => {
    loading.value = true

    categories.value = await getCategories()
    accounts.value = await getAccounts()

    loading.value = false
  })

  /**
   * Common transaction fields
   */

  const type = useRouteQuery<TransactionType>('type', 'income')
  const step = useRouteQuery<Step>('step', firstStep(type.value))
  const currency = useRouteQuery<Currency>('currency')
  const amount = useRouteQuery<string>('amount', '')

  function currencySelectHandler(c: Currency) {
    currency.value = c
    step.value = nextStep(step.value, type.value)
  }

  function amountHandler(a: string) {
    amount.value = a
  }

  function amountEntered() {
    step.value = nextStep(step.value, type.value)
  }

  /**
   * Expense transaction fields
   */

  const categoryId = useRouteQuery<string>('category', '')
  const category = computed(() => categories.value.find((c) => c.id === categoryId.value) ?? null)
  const newCategoryCreating = ref(false)

  async function newCategoryCreateHandler(newCategory: string) {
    newCategoryCreating.value = true

    const createCategoryResult = await createCategoryService(newCategory)

    if (isError(createCategoryResult)) {
      throw new Error('Implement error hadnling!!!')
    }

    // todo: Add error handling
    categories.value = await getCategories()

    newCategoryCreating.value = false
    categorySelectHander(createCategoryResult.success.category.id)
  }

  function categorySelectHander(ci: string) {
    categoryId.value = ci
    step.value = nextStep(step.value, type.value)
  }

  /**
   * Transfer transaction fields
   */
  const receiverId = useRouteQuery('receiver_id')
  const receiverCurrency = useRouteQuery<Currency>('receiver_currency')
  const receiverAmount = useRouteQuery<string>('receiver_amount', '')
  const receiver = computed(() => accounts.value.find((a) => a.id === receiverId.value))

  function receiverAmountHandler(a: string) {
    receiverAmount.value = a
  }

  function receiverAmountEntered() {
    step.value = nextStep(step.value, type.value)
  }

  function receiverCurrencySelectHandler(c: Currency) {
    receiverCurrency.value = c
    step.value = nextStep(step.value, type.value)
  }

  function receiverSelectHandler(ri: string) {
    receiverId.value = ri
    step.value = nextStep(step.value, type.value)
  }

  async function createTransactionHandler() {
    creating.value = true

    // todo: Add error handling
    const result = await createTransactionService({
      amount: amount.value,
      type: type.value,
      currency: currency.value,
      accountId: account.value!.id,
      //@ts-ignore
      categoryId: categoryId.value,
      receiverId: receiverId.value,
      receiveCurrency: receiverCurrency.value,
      receiveAmount: receiverAmount.value
    })

    if (isError(result)) {
      console.log(result.error)
    }

    creating.value = false
    router.push(backUrl.value)
  }

  const model = {
    type,
    loading,
    step,
    currency,
    amount,
    receiverCurrency,
    currencySelectHandler,
    amountEntered,
    createTransactionHandler,
    amountHandler,
    account,
    isFirstStep,
    stepBack,
    backUrl,
    creating,
    categoryId,
    categories,
    newCategoryCreateHandler,
    newCategoryCreating,
    categorySelectHander,
    category,
    receiverCurrencySelectHandler,
    receiverSelectHandler,
    receiverAmountEntered,
    receiverAmountHandler,
    receiverAmount,
    accounts,
    receiver
  }

  provide(transactionCreateModelKey, model)

  return model
}

export function useCreateTransactionModel() {
  return inject(transactionCreateModelKey)!
}
