import { TypeOf } from 'zod'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthSchema } from '@/schema/schema'
import { useNavigate, useParams } from 'react-router-dom'

import axios from '@/api/axios'
import ChangePwd from '@/components/Auth/ChangePwd'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export type PasswordFields = Pick<TypeOf<typeof AuthSchema>, 'password' | 'confirm_password'>

const ChangePassword = () => {
  useDocumentTitle('Change Password')
  
  const navigate = useNavigate()
  
  const { id, token } = useParams()

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const resetPwd = async (data: PasswordFields) => {
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
  
  return (
    <ChangePwd 
      error={error}
      resetPwd={resetPwd}
      submitting={submitting}
    />
  )
}

export default ChangePassword    