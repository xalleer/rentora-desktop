export enum UserRole {
  LANDLORD = 'LANDLORD',
  TENANT = 'TENANT'
}

export interface IUser {
  displayName: string
  phone: string
  email: string
  role: UserRole
}
