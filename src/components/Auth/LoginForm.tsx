import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import Content from '@/components/Wrappers/Content'
import InputField from '@/components/Inputs/InputField'

const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
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

export type LoginFields = z.infer<typeof LoginSchema>

export const LoginForm = ({ onSubmit, submitting }: AuthProps) => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema)
  })

  return (
    <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
      <Content>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col gap-2 transition-all w-[340px] px-5 py-4 rounded-sm shadow-lg bg-white'
        >
          <Heading label='login' />

          <InputField 
            id='email'
            type='text'
            label='email:'
            htmlFor='email'
            placeholder='email@example.com' 
            inputProps={register('email')}
            error={errors.email?.message as string}
          />

          <InputField 
            id='password'
            type='password'
            label='password:'
            htmlFor='password'
            placeholder='password' 
            inputProps={register('password')}
            error={errors.password?.message as string}
          />

          <InputField
            id='confirm password'
            type='password'
            label='confirm password:'
            htmlFor='confirm password'
            placeholder='confirm password'            
            inputProps={register('confirm_password')}
            error={errors.confirm_password?.message as string}
          />

          <Link to={'/reset'} className='text-[#38D6C4] text-center underline capitalize'>forgot password?</Link>

          <Button
            type='submit'
            disabled={submitting}
            label={submitting ? 'loging in...' : 'login'} 
          />

          {/* SHOULD COME AS A PROP OF TYPE REACT ELEMENT */}
          <div className='flex gap-2 items-center'>
            <p className='text-gray-500 text-sm md:text-[17px] capitalize'>need an account?</p>
            <Button 
              type='button'
              disabled={submitting}
              label='create account'
              onClick={() => navigate('/register')}
            />
          </div>
        </form>
      </Content>
    </div>
  )
} 