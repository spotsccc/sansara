import type { Category } from '@repo/models/finance'
import { saveMutation, selectAllQuery } from './accounts-repository'
import { api } from '@/infrastructure/api'
import { createSuccess } from '@repo/result'

function getCategories() {
  return selectAllQuery<Category>('categories')
}

async function saveCategory(category: Category) {
  // todo: error handling
  await saveMutation(category, 'categories')
  await api.saveCategory(category)
  return createSuccess(category)
}

export const CategoriesRepository = {
  saveCategory,
  getCategories
}
