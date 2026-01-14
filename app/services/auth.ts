import type { AuthResponse, ILoginPayload } from '~/types/auth'

export const useAuthApi = () => {
  const { $api } = useNuxtApp()

  return {
    login: (data: ILoginPayload) =>
      $api.post<AuthResponse>('/auth/login', data)
  }
}
