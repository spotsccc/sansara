export { useUserStore } from './store'
import { login } from './login'
import { register } from './register'
import { useUserStore } from './store'

export const AuthService = {
  login,
  register,
  useUserStore
}
