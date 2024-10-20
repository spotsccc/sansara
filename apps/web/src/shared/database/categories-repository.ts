import type { Category } from '@repo/models/finance'
import { saveMutation, selectAllQuery } from './accounts-repository'

export function getCategories() {
  return selectAllQuery<Category>('categories')
}

export function saveCategory(category: Category) {
  return saveMutation(category, 'categories')
}
