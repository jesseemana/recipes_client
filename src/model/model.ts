import { z } from 'zod'

export const RecipeSchema = z.object({
  category: z.string(),
  ingridients: z.string().trim(),
  procedure: z.string().min(30).trim(),
  name: z.string().min(3).max(20).trim(),
  time: z.string().min(6).max(10).toLowerCase().trim(),
  total_pages: z.number().optional()
})

export const AuthSchema = z.object({
  first_name: z.string().min(3).max(24).trim().optional(),
  last_name: z.string().min(3).max(24).trim().optional(),
  email: z.string().email().toLowerCase().trim().optional(),
  password: z.string().min(6).max(24).trim().optional(),
  confirm_password: z.string().min(6).max(24).trim().optional()
}).refine(
  (form) => {
    return form.password === form.confirm_password
  },
  {
    message: `Passwords don't match`,
    path: ['confirm_password']
  }
)   