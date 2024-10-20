import type { TransactionType } from '@repo/models/finance'

export type Step =
  | 'currency'
  | 'amount'
  | 'category'
  | 'final'
  | 'receiverAmount'
  | 'receiverCurrency'
  | 'receiver'

export const Scenarios: Record<TransactionType, Array<Step>> = {
  income: ['currency', 'amount', 'final'],
  expense: ['currency', 'amount', 'category', 'final'],
  transfer: ['currency', 'amount', 'receiver', 'receiverCurrency', 'receiverAmount', 'final']
}

export function firstStep(type: TransactionType) {
  const scenario = Scenarios[type]
  return scenario[0]
}

export function stepIndex(step: Step, type: TransactionType) {
  const scenario = Scenarios[type]

  return scenario.indexOf(step)
}

export function nextStep(currentStep: Step, type: TransactionType) {
  const scenario = Scenarios[type]
  const indexOfCurrentStep = stepIndex(currentStep, type)

  return scenario[
    indexOfCurrentStep === scenario.length - 1 ? indexOfCurrentStep : indexOfCurrentStep + 1
  ]
}

export function previosStep(currentStep: Step, type: TransactionType) {
  const scenario = Scenarios[type]
  const indexOfCurrentStep = stepIndex(currentStep, type)

  return scenario[indexOfCurrentStep === 0 ? indexOfCurrentStep : indexOfCurrentStep - 1]
}
