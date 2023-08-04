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
  const errorRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [pageType, setPageType] = useState('login')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errMsg, setErrMsg] = useState('')
    
  const isLogin = (pageType === 'login')
  const isRegister = (pageType === 'register')

  useDocumentTitle(isLogin ? 'Login' : 'Register')

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
      setPassword2('')
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
      password2={password2} 
      setEmail={setEmail}
      setPageType={setPageType}
      setLastName={setLastName}
      setPassword={setPassword}
      setFirstName={setFirstName}
      handleSubmit={handleSubmit} 
      setPassword2={setPassword2}
    />
  )
}

export default AuthUser 