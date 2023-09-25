import { z } from 'zod'

export const RecipeSchema = z.object({
  category: z.string(),
  ingridients: z.string().trim(),
  procedure: z.string().min(30).trim(),
  time: z.string().toLowerCase().trim(),
  name: z.string().min(3).max(20).trim(),
})

export const RegisterSchema = z.object({
  first_name: z.string().min(3).max(24).trim(),
  last_name: z.string().min(3).max(24).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(24),
  confirm_password: z.string().min(6).max(24)
}).refine(
  (form) => {
    return form.password === form.confirm_password
  },
  {
    message: `Passwords don't match`,
    path: ['confirm_password']
  }
)

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(24),
  confirm_password: z.string().min(6).max(24)
}).refine(
  (form) => {
    return form.password === form.confirm_password
  },
  {
    message: `Passwords don't match`,
    path: ['confirm_password']
  }
)   