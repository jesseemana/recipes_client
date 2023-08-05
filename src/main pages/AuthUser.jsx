import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setUsers } from '../state/appSlice'
import axios from '../api/axios'
import Form from '../components/ui/AuthForm'
import useDocumentTitle from '../hooks/useDocumentTitle';

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/register'

const AuthUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [pageType, setPageType] = useState('login')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState('')
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
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({firstName, lastName, email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      const results = response?.data
      if (results) {
        dispatch(setUsers({users: results}))
        navigate('/')
      }
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  const login = async () => {
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
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setErrMsg(`Passwords don't match`)
    } else {
      if (isLogin) login()
      if (isRegister) register() 
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