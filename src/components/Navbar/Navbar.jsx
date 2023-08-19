import MainNav from './MainNav'
import MobileNav from './MobileNav'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { auth } = useAuth()

  const user = auth?.user
  const token = auth?.access_token

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout', {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true
      })
      console.log(response.data.message) // cookie cleared
      // navigate to auth or refresh page, show toast message
    } catch (error) {
      let errorMessage = 'Something went wrong: '
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(message)
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