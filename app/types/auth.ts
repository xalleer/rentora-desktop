import type { IUser } from '~/types/user'

export interface ILoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: IUser
}
