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
  first_name: z.string()
    .min(3, 'Must be 3 at least characters long')
    .max(24, 'Name cannot contain more thamn 24 characters').trim().optional(),
  last_name: z.string()
    .min(3, 'Must be 3 at least characters long')
    .max(24, 'Name cannot contain more thamn 24 characters').trim().optional(),
  email: z.string().email('Please enter a valid email').toLowerCase().trim().optional(),
  password: z.string()
    .regex(new RegExp(".*[A-Z].*"), "Password must contain at least one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "Password must contain at least one lowercase character")
    .regex(new RegExp(".*\\d.*"), "Password must contain at least one number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "Password must contain at least one special character")
    .min(8, "Password must be at least 8 characters long").optional(),
  confirm_password: z.string()
    .regex(new RegExp(".*[A-Z].*"), "Password must contain at least one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "Password must contain at least one lowercase character")
    .regex(new RegExp(".*\\d.*"), "Password must contain at least one number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "Password must contain at least one special character")
    .min(8, "Password must be at least 8 characters long").optional(),
}).refine((form) => { return form.password === form.confirm_password }, {
    message: `Passwords don't match`,
    path: ['confirm_password']
  }
)   