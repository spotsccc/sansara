import {
  applyTransaction,
  createCategory,
  createTransaction,
  type TransactionInput
} from '@repo/models/finance'
import { getAccount } from '@/shared/database/accounts-repository'
import { createError, createSuccess, isError } from '@repo/result'
import { saveTransaction } from '@/shared/database/transaction-repository'
import { useUserStore } from '@/shared/auth'
import { saveCategory } from '@/shared/database/categories-repository'

export async function createTransactionService(input: Omit<TransactionInput, 'userId'>) {
  const userStore = useUserStore()

  const transaction = createTransaction({
    userId: userStore.user!.id,
    accountId: input.accountId,
    description: input.description,
    type: input.type,
    amount: input.amount,
    currency: input.currency,
    //@ts-ignore
    categoryId: input.categoryId,
    //@ts-ignore
    receiverId: input.receiverId,
    //@ts-ignore
    receiveAmount: input.receiveAmount,
    //@ts-ignore
    receiveCurrency: input.receiveCurrency
  })

  const account = await getAccount(transaction.accountId)

  if (!account) {
    return createError({ type: 'account-not-found' })
  }

  const applyTransactionResult = applyTransaction(account, transaction)

  if (isError(applyTransactionResult)) {
    return applyTransactionResult
  }

  if (transaction.type === 'transfer') {
    const receiver = await getAccount(transaction.receiverId)

    if (!receiver) {
      return createError({ type: 'reveiver-not-found' })
    }

    const applyTransactionToReceiverResult = applyTransaction(receiver, transaction)

    if (isError(applyTransactionToReceiverResult)) {
      return applyTransactionToReceiverResult
    }

    // todo: error handling
    await saveTransaction(transaction, [
      applyTransactionResult.success,
      applyTransactionToReceiverResult.success
    ])
    // todo: Save transaction to server

    return createSuccess({ transaction })
  }

  // todo: error handling
  await saveTransaction(transaction, [applyTransactionResult.success])
  // todo: Save transaction to server

  return createSuccess({ transaction })
}

export async function createCategoryService(input: string) {
  const userStore = useUserStore()

  const category = createCategory({ title: input, userId: userStore.user!.id })

  // todo: error handling
  await saveCategory(category)

  // todo: save category to server

  return createSuccess({ category })
}
