import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoginForm } from '@/components/Auth/LoginForm'
import { AuthFields } from '@/components/Auth/RegisterForm'

import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'

const Login = () => {
  useDocumentTitle('Login')

  const { setAuth } = useAuth()

  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (data: AuthFields) => {
    setSubmitting(true)
    try {
      const response = await axios.post('/auth/login', 
        JSON.stringify({ 
          email: data.email, 
          password: data.password 
        }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      console.log(response.data)
      if (response.data)
        setAuth({ 
          user: response.data.user, 
          access_token: response.data.access_token 
        })
      // navigate to home or replace here
      toast.success('logged in')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(errorMessage)
      toast.error(`Couldn't log in`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      submitting={submitting}
    />
  )
}

export default Login   