import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Form from '../components/ui/AuthForm'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/register'

const AuthUser = () => {
  const navigate = useNavigate()

  const { setAuth } = useAuth()
  
  const [errMsg, setErrMsg] = useState('')
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
  
  const errorRef = useRef()

  // const formRef = useRef()
  // useEffect(() => {
  //   formRef.current.focus()
  // }, [pageType])

  useEffect(() => {
    setErrMsg('')
  }, [email, password, confirmPassword,])

  const register = async () => {
    setSubmitting(true)
    try {
      await axios.post(REGISTER_URL, 
        JSON.stringify({first_name: firstName, last_name: lastName, email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      // refresh page to navigate to go login page
      toast.success('user created')
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No server response.')
      } else if (error.response?.status === 400) {
        setErrMsg('Provide valid input data.')
      } else if (error.response?.status === 409) {
        setErrMsg('Email address already in use.')
      } else {
        setErrMsg(`User registration failed.`)
      }
      toast.error('failed to create user')
      errorRef.current.focus()
    } finally {
      setSubmitting(false)
    }
  }

  const login = async () => {
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
      if (!error?.response) {
        setErrMsg('No server response.')
      } else if (error.response?.status === 401 ) {
        setErrMsg('Unauthorized.')
      } else {
        setErrMsg(`Login failed.`)
      }
      toast.error(`couldn't log in`)
      errorRef.current.focus()
    } finally {
      setSubmitting(false)
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin)
      login()
    if (isRegister)
      register() 
  }

  function handleChange() {
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
      errorRef={errorRef}
      pageType={pageType}
      email={email}
      errMsg={errMsg}
      isLogin={isLogin}
      password={password}
      lastName={lastName} 
      firstName={firstName} 
      confirmPassword={confirmPassword} 
      submitting={submitting}
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