import { object, string, number } from 'zod'

export const RecipeSchema = object({
  category: string(),
  ingridients: string().nonempty({ message: 'Provide the ingridients' })
    .trim().toLowerCase(),
  procedure: string().nonempty({ message: 'Procedure cannot be empty' })
    .min(30).trim(),
  name: string().nonempty({ message: 'Please, rovide the name' })
    .min(3).max(20).toLowerCase().trim(),
  time: string().nonempty({ message: 'Field cannot be empty' })
    .min(6).max(10).toLowerCase().trim(),
  total_pages: number().optional()
})

export const AuthSchema = object({
  first_name: string().nonempty({ message: 'Provide a first name' })
    .min(3, 'Must be 3 at least characters long')
    .max(24, 'Name cannot contain more thamn 24 characters')
    .toLowerCase().trim().optional(),
  last_name: string().nonempty({ message: 'Provide a last name' })
    .min(3, 'Must be 3 at least characters long')
    .max(24, 'Name cannot contain more thamn 24 characters')
    .toLowerCase().trim().optional(),
  email: string().nonempty({ message: 'Provide an email' })
    .email('Please enter a valid email').toLowerCase().trim().optional(),
  password: string().nonempty({ message: 'Password is required' })
    .regex(new RegExp(".*[A-Z].*"), "Password must contain at least one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "Password must contain at least one lowercase character")
    .regex(new RegExp(".*\\d.*"), "Password must contain at least one number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "Password must contain at least one special character")
    .min(8, "Password must be at least 8 characters long").optional(),
  confirm_password: string().nonempty({ message: 'Confirm Password is required' })
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