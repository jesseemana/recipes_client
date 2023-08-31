import { forwardRef, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate} from 'react-router-dom'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import Content from '@/components/Wrappers/Content'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import InputField from '@/components/Inputs/InputField'
import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'


const Login = () => {
  useDocumentTitle('Login')

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, watch, formState: { errors }, } = useForm()

  // const formRef = forwardRef<boolean>()
  // useEffect(() => {
  //   formRef.current?.focus()
  // })

  const onSubmit = async (data: unknown) => {
    console.log(data)
    setSubmitting(true)
    try {
      const response = await axios.post('/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (response.data)
        setAuth({ 
          user: response.data.user, 
          access_token: response.data.accessToken 
        })
      navigate('/')
      // console.log(response.data.user)
      // console.log(response.data.accessToken)
      toast.success('logged in')
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(errorMessage)
      toast.error(`couldn't log in`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
      <Content>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='flex flex-col gap-2 transition-all w-[300px] px-5 py-4 rounded-sm shadow-lg bg-white'
        >
          <Heading label='login' />
          <InputField 
            id='email'
            type='text'
            htmlFor='email'
            label='email:'
            placeholder='email@example.com' 
            inputProps={register('email', { required: 'Please provide an email address' })}
            error={errors.email?.message as string}
            // ref={formRef}
          />
          <InputField 
            id='password'
            type='password'
            htmlFor='password'
            label='password:'
            placeholder='password' 
            inputProps={register('password', { required: 'Please provide password' })}
            error={errors.password?.message as string}
          />
          <InputField
            id='confirm password'
            type='password'
            htmlFor='confirm password'
            label='confirm password:'
            placeholder='confirm password'            
            inputProps={register('confirmPassword', { required: 'Confirm your password' })}
            error={errors.confirmPassword?.message as string}
          />
          <Button
            type='submit'
            disabled={submitting}
            label={'login'} 
          />
          <div className='flex gap-2 items-center'>
            <p className='text-gray-500 text-sm md:text-[17px] capitalize'>need an account?</p>
            <Button 
              type='button'
              disabled={submitting}
              label={'create account'}  
              onClick={() => navigate('/register')}
            />
          </div>
        </form>
      </Content>
    </div>
  )
}

export default Login 