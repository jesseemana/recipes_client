import { TypeOf } from 'zod'
import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { AuthSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import axios from '@/api/axios'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import InputField from '@/components/Inputs/InputField'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export type PasswordFields = Pick<TypeOf<typeof AuthSchema>, 'password' | 'confirm_password'>

const ChangePassword = () => {
  useDocumentTitle('Change Password')
  
  const { id, token } = useParams()

  const navigate = useNavigate()
  
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const resetPwd: SubmitHandler<PasswordFields> = async (data) => {
    setSubmitting(true)
    try {
      await axios.patch(`reset/:${id}/:${token}`, 
        JSON.stringify({ password: data.password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      toast.success('Password updated')
      navigate('/auth/login')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
        setError(error.message)
      }
      console.log(errorMessage)
      toast.error(`Couldn't change password`)
    } finally {
      setSubmitting(false)
    }
  }

  const { register, setFocus, handleSubmit, formState: { errors } } = useForm<PasswordFields>({
    resolver: zodResolver(AuthSchema)
  })

  useEffect(() => {
    setFocus('password')
  }, [setFocus])
  
  return (
    <div className='max-w-full px-[4%] bg-gray-50 flex items-center justify-center h-[100vh]'>
      <div className='bg-white p-4 shadow-md rounded-md'>
        <Heading label='enter new password' />
        <form
          onSubmit={handleSubmit(resetPwd)}
          className='flex flex-col w-[280px] md:w-[320px] gap-y-2 py-2 px-1'
        >
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

          <p className='bg-red-600 text-white text-sm text-center'>{error}</p>

          <Button
            type='submit'
            disabled={submitting}
            label={submitting ? 'updating password...' : 'change password'}
          />
        </form>
      </div>
    </div>
  )
}

export default ChangePassword    