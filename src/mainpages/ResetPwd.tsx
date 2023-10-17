import { TypeOf } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import useAuthReset from '@/hooks/useAuthReset'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import InputField from '@/components/Inputs/InputField'

export type EmailField = Pick<TypeOf<typeof AuthSchema>, 'email'>

const ResetPwd = () => {
  useDocumentTitle('Reset Password') 

  const { submitting, error, sendEmail } = useAuthReset() 

  const { register, handleSubmit, setFocus, formState: { errors } } = useForm<EmailField>({
    resolver: zodResolver(AuthSchema)
  })

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  return (
    <div className='max-w-full px-[4%] bg-gray-50 flex items-center justify-center h-[100vh]'>
      <div className='bg-white px-2 py-4 shadow-md rounded-md'>
        <Heading label='reset your password' /> <hr/>
        <form 
          onSubmit={handleSubmit(sendEmail)} 
          className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'
        >
          <InputField 
            id='email'
            type='text' 
            label='email:'
            htmlFor='email'
            placeholder='enter your email' 
            inputProps={register('email')}
            error={errors.email?.message as string}
          />

          <p className='bg-red-600 text-white text-sm text-center'>{error}</p>

          <Button 
            type='submit'
            disabled={submitting} 
            label={submitting ? 'sending...' : 'send email'}
          /> 
        </form>
      </div>
    </div>
  )
}


export default ResetPwd   