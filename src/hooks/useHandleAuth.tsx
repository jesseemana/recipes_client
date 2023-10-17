import axios from '@/api/axios'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginFields } from '@/mainpages/Login'
import { RegisterFields } from '@/mainpages/Register'

const useHandleAuth = () => {
  const { setAuth } = useAuth()
  
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)
  
  const onLogin = async (data: LoginFields) => {
    console.log(data)
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

  const onRegister = async (data: RegisterFields) => {
    setSubmitting(true)
    try {
      await axios.post('/auth/register', 
        JSON.stringify({
          first_name: data.first_name, 
          last_name: data.last_name, 
          email: data.email, 
          password: data.password
        }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      navigate('/login')
      toast.success('User created, please login')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(errorMessage)
      toast.error('Error creating user')
    } finally {
      setSubmitting(false)
    }
  }

  return { submitting, navigate, onLogin, onRegister }
}

export default useHandleAuth    