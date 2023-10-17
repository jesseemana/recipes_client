import { TypeOf } from 'zod'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import useHandleAuth from '@/hooks/useHandleAuth'
import Content from '@/components/Wrappers/Content'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import InputField from '@/components/Inputs/InputField'

export type LoginFields = Omit<TypeOf<typeof LoginSchema>, 'first_name' | 'last_name' >


const Login = () => {
  useDocumentTitle('Login')
  
  const { submitting, navigate, onLogin } = useHandleAuth()

  const { register, handleSubmit, setFocus, formState: { errors } } = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema)
  })

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  return (
    <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
      <Content>
        <div className='bg-white px-5 py-4 shadow-lg rounded-sm'>
          <Heading label='login' /> <hr/>
          <form 
            onSubmit={handleSubmit(onLogin)} 
            className='flex flex-col gap-2 transition-all w-[300px] md:w-auto lg:w-[400px] py-4'
          >
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
              placeholder='********' 
              inputProps={register('password')}
              error={errors.password?.message as string}
            /> 

            <Link 
              to={'/auth/reset'} 
              className='text-[#38D6C4] text-center text-sm md:text-[15px] underline capitalize'
            >
              forgot password?
            </Link>

            <Button
              type='submit'
              disabled={submitting}
              label={submitting ? 'loging in...' : 'login'} 
            />

            {/* SHOULD COME AS A PROP OF TYPE REACT ELEMENT */}
            <div className='flex gap-2 items-center'>
              <p className='text-gray-500 text-sm md:text-[15px] capitalize'>need an account?</p>
              <Button 
                type='button'
                disabled={submitting}
                label='create account'
                onClick={() => navigate('/auth/register')}
              />
            </div>
          </form>
        </div>
      </Content>
    </div>
  )
}   

export default Login  