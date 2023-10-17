import { TypeOf } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthSchema } from '@/schema/schema'
import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import useAuthReset from '@/hooks/useAuthReset'
import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import InputField from '@/components/Inputs/InputField'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export type PasswordFields = Pick<TypeOf<typeof AuthSchema>, 'password' | 'confirm_password'>

const ChangePassword = () => {
  useDocumentTitle('Change Password')
  
  const { id, token } = useParams()

  const { submitting, error, resetPwd } = useAuthReset(id, token)

  const { register, setFocus, handleSubmit, formState: { errors } } = useForm<PasswordFields>({
    resolver: zodResolver(AuthSchema)
  })

  useEffect(() => {
    setFocus('password')
  }, [setFocus])
  
  return (
    <>
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
    </>
  )
}

export default ChangePassword    