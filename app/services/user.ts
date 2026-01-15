import type { IUser } from '~/types/user'

export const useUserApi = () => {
  const { $api } = useNuxtApp()

  return {

    getMe: () =>
      $api.get<IUser>('auth/me')

  }
}
