import { defineStore } from 'pinia'
import type { IUser } from '~/types/user'
import type { ILoginPayload } from '~/types/auth'
import { AuthApi } from '~/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null)
  const loading = ref<boolean>(false)

  const isAuth = computed(() => !!useCookie('token').value)

  const login = async (payload: ILoginPayload) => {
    loading.value = true
    try {
      const response = await AuthApi.login(payload)
      const token = useCookie('token')
      token.value = response.data.token
      user.value = response.data.user
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return {
    user,
    loading,
    isAuth,
    login
  }
})
