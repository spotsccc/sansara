import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { User } from '@repo/models/users'

export const useUserStore = defineStore('user', () => {
  const user = computed({
    get(): User | null {
      const userString = localStorage.getItem('user')
      return userString ? JSON.parse(userString) : null
    },
    set(user: User | null) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  })

  function userLoaded(u: User) {
    user.value = u
  }

  function userUnloaded() {
    user.value = null
  }

  return {
    user,
    userLoaded,
    userUnloaded
  }
})
