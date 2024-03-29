import { TypeOf } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import useHandleAuth from '@/hooks/useHandleAuth'
import Content from '@/components/Wrappers/Content'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import InputField from '@/components/Inputs/InputField'

export type RegisterFields = TypeOf<typeof AuthSchema>


const Register = () => {
  useDocumentTitle('Register')

  const { submitting, navigate, onRegister } = useHandleAuth()

  const { register, handleSubmit, setFocus, formState: { errors } } = useForm<RegisterFields>({
    resolver: zodResolver(AuthSchema)
  })

  useEffect(() => {
    setFocus('first_name')
  }, [setFocus])

  return (
    <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
      <Content>
        <div className='rounded-sm shadow-lg bg-white px-5 py-5'>
          <Heading label='create account' /> <hr />
          <form 
            onSubmit={handleSubmit(onRegister)} 
            className='flex flex-col gap-2 transition-all w-[300px] md:w-auto lg:w-[500px] px-4 py-4'
          >
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
              placeholder='********' 
              inputProps={register('password')}
              error={errors.password?.message as string}
            />

            <InputField
              id='confirm password'
              type='password'
              label='confirm password:'
              htmlFor='confirm password'
              placeholder='********'            
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
                onClick={() => navigate('/auth/login')}
              />
            </div>
          </form>
        </div>
      </Content>
    </div>
  )
}   

export default Register   