import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Form from '../components/AuthForm'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/register'

const AuthUser = () => {
  const navigate = useNavigate()

  const { setAuth } = useAuth()
  
  const [pageType, setPageType] = useState('login')
  const [submitting, setSubmitting] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const isLogin = (pageType === 'login')
  const isRegister = (pageType === 'register')
  
  useDocumentTitle(isLogin ? 'Login' : 'Register')
  
  // const formRef = useRef()
  // useEffect(() => {
  //   formRef.current.focus()
  // }, [pageType])

  const register = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(REGISTER_URL, 
        JSON.stringify({first_name: firstName, last_name: lastName, email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      // refresh page to navigate to go login page
      toast.success('user created')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const login = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      const results = await response?.data
      setAuth({user: results.user, access_token: results.accessToken})
      navigate('/')
      // console.log(results.user)
      // console.log(results.accessToken)
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

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLogin)
      login(e)
    if (isRegister)
      register(e) 
  }

  const handleChange = () => {
    setPageType(isLogin ? 'register' : 'login')
    if (pageType === 'login') {
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <Form 
      // formRef={formRef}
      email={email}
      isLogin={isLogin}
      password={password}
      lastName={lastName} 
      firstName={firstName} 
      submitting={submitting}
      confirmPassword={confirmPassword} 
      setEmail={setEmail}
      setPassword={setPassword}
      handleChange={handleChange}
      setFirstName={setFirstName}
      setLastName={setLastName}
      handleSubmit={handleSubmit} 
      setConfirmPassword={setConfirmPassword}
    />
  )
}

export default AuthUser 