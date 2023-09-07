import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import Content from '@/components/Wrappers/Content'
import InputField from '@/components/Inputs/InputField'

const RegisterSchema = z.object({
  first_name: z.string().min(3).max(24),
  last_name: z.string().min(3).max(24),
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

export type RegisterFields = z.infer<typeof RegisterSchema>

export const RegisterForm = ({ onSubmit, submitting }: AuthProps) => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema)
  })

  return (
    <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
      <Content>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col gap-2 transition-all w-[300px] md:w-auto lg:w-[500px] px-5 py-5 rounded-sm shadow-lg bg-white'
        >
          <Heading label='create account' />

          <div className='flex flex-col md:flex-row gap-4 items-start'>
            <div className='flex flex-col w-full gap-3'>
              <InputField 
                id='first name'
                type='text'
                label='first name:'
                htmlFor='first name'
                placeholder='first name' 
                inputProps={register('first_name')}
                error={errors.first_name?.message as string}
              />
            </div>

            <div className='flex flex-col w-full gap-3'>
              <InputField 
                id='last name'
                type='text'
                label='last name:'
                htmlFor='last name'
                placeholder='last name' 
                inputProps={register('last_name')}
                error={errors.last_name?.message as string}
              />
            </div>
          </div>

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

          <Button
            type='submit'
            disabled={submitting}
            label={submitting ? 'registering...' : 'register'} 
          />

          {/* SHOULD COME AS A PROP OF REACT ELEMENT TYPE */}
          <div className='flex gap-2 items-center'>
            <p className='text-gray-500 text-sm md:text-[17px] capitalize'>already have an account?</p>
            <Button 
              type='button'
              disabled={submitting}
              label='login' 
              onClick={() => navigate('/login')}
            />
          </div>
        </form>
      </Content>
    </div>
  )
}   