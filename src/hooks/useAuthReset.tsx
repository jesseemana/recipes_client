import axios from '@/api/axios'
import toast from 'react-hot-toast'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailField } from '@/mainpages/ResetPwd'
import { PasswordFields } from '@/mainpages/ChangePassword'

const useAuthReset = (id?: string, token?: string) => {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const sendEmail = async (data: EmailField) => {
    setSubmitting(true)
    try {
      await axios.post(`/reset`, JSON.stringify({ email: data.email }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      toast.success('Email sent')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
        setError(error.message)
      }
      console.error(errorMessage)
      toast.error('Failed to send email')
    } finally {
      setSubmitting(false)
    }
  }  

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
      console.error(errorMessage)
      toast.error(`Couldn't change password`)
    } finally {
      setSubmitting(false)
    }
  }
  
  return { error, submitting, sendEmail, resetPwd }
}

export default useAuthReset   