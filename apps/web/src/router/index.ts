import { AccountCreatePage } from '@/pages/acccount-create'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { NotFoundPage } from '@/pages/not-found'
import { RegisterPage } from '@/pages/register'
import { TransactionCreatePage } from '@/pages/transaction-create'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/accounts/:accountId/transactions/create',
      name: 'transaction-create',
      component: TransactionCreatePage
    },
    {
      path: '/accounts/create',
      name: 'account-crate',
      component: AccountCreatePage
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ]
})

export default router
