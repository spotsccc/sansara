import { useRouteQuery } from '@vueuse/router'
import { computed, inject, provide, ref, type InjectionKey } from 'vue'
import { createAccount } from '../account-service/account-create'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/modules/auth'
import { isError } from '@repo/result'
import { useToast } from 'primevue/usetoast'

const injectionKey: InjectionKey<ReturnType<typeof useProvideAccountCreateModel>> = Symbol(
  'account-create-injection-key'
)

export type Step = 'currency' | 'name' | 'final'

const stepsOrder: Array<Step> = ['currency', 'name', 'final']

function nextStep(step: Step) {
  const indexOfCurrentStep = stepsOrder.indexOf(step)

  if (indexOfCurrentStep === stepsOrder.length - 1) {
    return step
  }

  return stepsOrder[indexOfCurrentStep + 1]
}

function previousStep(step: Step) {
  const indexOfCurrentStep = stepsOrder.indexOf(step)

  if (indexOfCurrentStep === 0) {
    return step
  }

  return stepsOrder[indexOfCurrentStep - 1]
}

export function useProvideAccountCreateModel() {
  const router = useRouter()
  const toast = useToast()
  const userStore = useUserStore()

  const step = useRouteQuery<Step>('step', 'currency')
  const currency = useRouteQuery<string>('currency', '')

  const name = useRouteQuery<string>('name', '')
  const nameError = ref('')

  const loading = ref(false)
  const createAccountError = ref('')

  const isFirstStep = computed(() => step.value === 'currency')

  function currencyChangeHandler(c: string) {
    currency.value = c
    step.value = nextStep(step.value)
  }

  function nameChangeHandler(n: string) {
    nameError.value = ''
    name.value = n
  }

  function nameEntered() {
    if (name.value === '') {
      nameError.value = "Error can't be empty"
      return
    }

    step.value = nextStep(step.value)
  }

  function stepBackHandler() {
    step.value = previousStep(step.value)
  }

  async function accountCreateButtonClicked() {
    loading.value = true

    const createAccountResult = await createAccount({
      name: name.value,
      defaultCurrency: currency.value!,
      userId: userStore.user?.id!
    })

    loading.value = false

    if (isError(createAccountResult)) {
      const error = createAccountResult.error

      switch (error.type) {
        case 'local-save-error':
          createAccountError.value = error.message
          break
        case 'network-error':
          toast.add({
            severity: 'warn',
            summary: 'Unable to save account at server. Network error'
          })
          break
        case 'remote-save-error':
          toast.add({
            severity: 'warn',
            summary: 'Unable to save account at server. Remote server error'
          })
          break
      }

      if (error.type === 'local-save-error') {
        return
      }
    }

    router.push('/')
  }

  const model = {
    currency,
    name,
    nameError,
    step,
    isFirstStep,
    createAccountError,
    currencyChangeHandler,
    nameChangeHandler,
    nameEntered,
    accountCreateButtonClicked,
    stepBackHandler,
    loading
  }

  provide(injectionKey, model)

  return model
}

export function useAccountCreateModel() {
  return inject(injectionKey)!
}
