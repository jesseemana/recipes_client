import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordFields } from '@/mainpages/ChangePassword'

import Button from '@/components/Buttons/Button'
import Heading from '@/components/Inputs/Heading'
import InputField from '@/components/Inputs/InputField'

const ChangePwd = ({ submitting, resetPwd, error }: { 
  error: string 
  submitting:boolean, 
  resetPwd: (data: PasswordFields) => Promise<void>, 
}) => {

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

export default ChangePwd    