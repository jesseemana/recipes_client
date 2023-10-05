import { TypeOf } from 'zod'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import axios from '@/api/axios'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import InputField from '@/components/Inputs/InputField'

type EmailField = Omit<TypeOf<typeof AuthSchema>, 'first_name' | 'last_name' | 'password' | 'confirm_password'>

const ResetPwd = () => {  
  useDocumentTitle('Reset Password')

  const [submitting, setSubmitting] = useState(false)

  // SEND SERVER ERRROS FOR INVALID EMAILS

  const sendEmail: SubmitHandler<EmailField> = async (data) => {
    setSubmitting(true)
    try {
      await axios.post(`/reset`, JSON.stringify({ email: data.email }), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      toast.success('Email sent')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error)
        errorMessage += error
      console.error(errorMessage)
      toast.error('Email not sent')
    } finally {
      setSubmitting(false)
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm<EmailField>({
    resolver: zodResolver(AuthSchema)
  })

  return (
    <div className='max-w-full px-[4%] bg-gray-50 flex items-center justify-center h-[100vh]'>
      <div className='bg-white px-2 py-4 shadow-md rounded-md'>
        <Heading label='reset your password' />
        <form onSubmit={handleSubmit(sendEmail)} className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'>
          <InputField 
            id='email'
            htmlFor='email'
            label='email:'
            type='text' 
            placeholder='enter your email' 
            inputProps={register('email')}
            error={errors.email?.message as string}
          />
          <Button 
            type={'submit'}
            disabled={submitting} 
            label={submitting ? 'sending...' : 'send email'}
          /> 
        </form>
      </div>
    </div>
  )
}

export default ResetPwd  