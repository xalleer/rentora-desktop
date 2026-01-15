import type { IUser } from '~/types/user'
import { useUserApi } from '~/services/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const loading = ref<boolean>(false)
  const api = useUserApi()

  const user = ref<IUser | null>(null)

  const getMe = async () => {
    loading.value = true
    try {
      const response = await api.getMe()
      user.value = response.data
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getMe,
    user
  }
})
