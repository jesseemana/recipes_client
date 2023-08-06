import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setUsers } from '../state/appSlice'
import { toast } from 'react-hot-toast'
import Form from '../components/ui/AuthForm'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from '../api/axios'

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/register'

const AuthUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
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

  const register = async () => {
    setSubmitting(true)

    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({firstName, lastName, email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      const results = response?.data
      if (results) {
        dispatch(setUsers({users: results}))
      }
      // refresh page to navigate to go login page
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    } finally {
      setSubmitting(false)
    }
  }

  const login = async () => {
    setSubmitting(true)

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      const results = response?.data
      if (results) {
        dispatch(setLogin({
          user: results.user,
          user_id: results.user._id,
          access_token: results.accessToken
        }))
        navigate('/')
      }
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    } finally {
      setSubmitting(false)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrMsg(`Passwords don't match`)
    } else {
      if (isLogin) {
        toast.promise(login(), {
          loading: 'logging in...',
          success: 'logged in',
          error: `couldn't log in` 
        })
      }
      if (isRegister) {
        toast.promise(register(), {
          loading: 'creating account...',
          success: 'account created',
          error: `couldn't create account` 
        })
      } 
    }
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
      handleChange={handleChange}
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
      setPageType={setPageType}
      setLastName={setLastName}
      setPassword={setPassword}
      setFirstName={setFirstName}
      handleSubmit={handleSubmit} 
      setConfirmPassword={setConfirmPassword}
    />
  )
}

export default AuthUser 