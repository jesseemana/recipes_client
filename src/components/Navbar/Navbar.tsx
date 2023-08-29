import MainNav from './MainNav'
import MobileNav from './MobileNav'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { auth } = useAuth()

  const user = auth?.user as User
  const token = auth.access_token as string

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout', {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true
      })
      console.log(response.data.message) // cookie cleared
      // navigate to auth or refresh page, show toast message
      navigate('/auth')
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(errorMessage)
    }
  }

  return (
    <>
      <MainNav 
        user={user} 
        handleLogout={handleLogout} 
      />
      <MobileNav 
        user={user} 
        handleLogout={handleLogout} 
      />
    </>
  )
}

export default Navbar  