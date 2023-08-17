import TopNav from './TopNav'
import BottomNav from './BottomNav'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const Navbar = () => {
  const { auth } = useAuth()

  const user = auth?.user
  const token = auth?.access_token

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
      console.log(response.data.message) // cookie cleared
      // navigate to auth or refresh page, show toast message
    } catch (error) {
      let errorMessage = 'Somethin went wrong: ';
      if (error instanceof Error) {
        errorMessage += error
      }
      console.error(message)
    }
  }

  return (
    <>
      <TopNav 
        user={user} 
        handleLogout={handleLogout} 
      />
      <BottomNav 
        user={user} 
        handleLogout={handleLogout} 
      />
    </>
  )
}

export default Navbar  