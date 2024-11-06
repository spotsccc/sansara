import {
  applyTransaction,
  createCategory,
  createTransaction,
  type TransactionExpenseInput,
  type TransactionIncomeInput,
  type TransactionInput,
  type TransactionTransfer,
  type TransactionTransferInput
} from '@repo/models/finance'
import { getAccount } from '@/shared/database/accounts-repository'
import { createError, createSuccess, isError } from '@repo/result'
import { TransactionsRepository } from '@/shared/database'
import { useUserStore } from '@/modules/auth'
import { CategoriesRepository } from '@/shared/database/categories-repository'

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never

const ERRORS = {
  accountNotFound: 'local-acccount-not-found' as const,
  receiverNotFound: 'local-receiver-not-found' as const,
  unauthorized: 'local-unauthorized' as const
}

export async function createTransactionService(
  input: DistributiveOmit<TransactionInput, 'userId'>
) {
  const userStore = useUserStore()

  if (!userStore.user) {
    return createError({ type: ERRORS.unauthorized })
  }

  switch (input.type) {
    case 'income':
      return createIncomeTransactionService({
        userId: userStore.user.id,
        ...input
      })

    case 'expense':
      return createExpenseTransactionService({
        userId: userStore.user.id,
        ...input
      })
    case 'transfer':
      return createTransferTransactionService({
        userId: userStore.user.id,
        ...input
      })
    default:
      throw new Error('Unknown transaction type')
  }
}

async function createIncomeTransactionService(input: TransactionIncomeInput) {
  const transaction = createTransaction(input)

  const account = await getAccount(transaction.accountId)

  if (!account) {
    return createError({ type: ERRORS.accountNotFound })
  }

  const applyTransactionResult = applyTransaction(account, transaction)

  if (isError(applyTransactionResult)) {
    return applyTransactionResult
  }

  return TransactionsRepository.saveTransaction(transaction, [applyTransactionResult.success])
}

async function createTransferTransactionService(input: TransactionTransferInput) {
  const transaction = createTransaction(input) as TransactionTransfer

  const account = await getAccount(transaction.accountId)
  const receiver = await getAccount(transaction.receiverId)

  if (!account) {
    return createError({ type: ERRORS.accountNotFound })
  }

  if (!receiver) {
    return createError({ type: ERRORS.receiverNotFound })
  }

  const applyTransactionResult = applyTransaction(account, transaction)
  const applyTransactionToReceiverResult = applyTransaction(receiver, transaction)

  if (isError(applyTransactionResult)) {
    return applyTransactionResult
  }

  if (isError(applyTransactionToReceiverResult)) {
    return applyTransactionToReceiverResult
  }

  return TransactionsRepository.saveTransaction(transaction, [
    applyTransactionResult.success,
    applyTransactionToReceiverResult.success
  ])
}

async function createExpenseTransactionService(input: TransactionExpenseInput) {
  const transaction = createTransaction(input)

  const account = await getAccount(transaction.accountId)

  if (!account) {
    return createError({ type: ERRORS.accountNotFound })
  }

  const applyTransactionResult = applyTransaction(account, transaction)

  if (isError(applyTransactionResult)) {
    return applyTransactionResult
  }

  return TransactionsRepository.saveTransaction(transaction, [applyTransactionResult.success])
}

export async function createCategoryService(input: string) {
  const userStore = useUserStore()

  if (!userStore.user) {
    return createError({ type: ERRORS.unauthorized })
  }

  const category = createCategory({ title: input, userId: userStore.user!.id })

  await CategoriesRepository.saveCategory(category)

  return createSuccess({ category })
}
