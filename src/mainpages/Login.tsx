import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import { LoginFields, LoginForm } from '@/components/LoginForm'


const Login = () => {
  useDocumentTitle('Login')

  const { setAuth } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (data: LoginFields) => {
    setSubmitting(true)
    try {
      const response = await axios.post('/auth/login', 
        JSON.stringify({ email: data.email, password: data.password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (response.data)
        setAuth({ 
          user: response.data.user, 
          access_token: response.data.accessToken 
        })
      // navigate to home or replace here
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
    <LoginForm
      submitting={submitting}
      onSubmit={onSubmit}
    />
  )
}

export default Login 