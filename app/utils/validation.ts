import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Електронна пошта обов\'язкова')
    .email('Невірний формат електронної пошти'),
  password: z
    .string()
    .min(6, 'Пароль має містити мінімум 6 символів')
})

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Ім\'я має містити мінімум 2 символи')
    .max(50, 'Ім\'я надто довге'),
  email: z
    .string()
    .min(1, 'Електронна пошта обов\'язкова')
    .email('Невірний формат електронної пошти'),
  phone: z
    .string()
    .min(1, 'Номер телефону обов\'язковий')
    .regex(/^\+\d{10,15}$/, 'Невірний формат номера телефону'),
  password: z
    .string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .regex(/[A-Z]/, 'Пароль має містити хоча б одну велику літеру')
    .regex(/[a-z]/, 'Пароль має містити хоча б одну малу літеру')
    .regex(/[0-9]/, 'Пароль має містити хоча б одну цифру'),
  role: z.enum(['landlord', 'tenant'], {
    errorMap: () => ({ message: 'Оберіть роль' })
  })
})

export type LoginForm = z.infer<typeof loginSchema>
export type SignupForm = z.infer<typeof signupSchema>
