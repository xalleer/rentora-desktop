import { defineStore } from 'pinia'
import type { IUser } from '~/types/user'
import type { ILoginPayload } from '~/types/auth'
import { useAuthApi } from '~/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null)
  const loading = ref<boolean>(false)

  const api = useAuthApi()
  const tokenCookie = useCookie('token')

  const isAuth = computed(() => !!tokenCookie.value)

  const login = async (payload: ILoginPayload) => {
    loading.value = true
    try {
      const response = await api.login(payload)

      tokenCookie.value = response.data.token
      user.value = response.data.user
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    isAuth,
    login
  }
})
