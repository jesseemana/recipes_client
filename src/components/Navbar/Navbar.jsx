import TopNav from './TopNav'
import BottomNav from './BottomNav'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const Navbar = () => {
  const { auth } = useAuth()

  const navigate = useNavigate()

  const user = auth?.user
  const token = auth?.access_token

  function handleLogout() {
    // try {
    //   // CLEARS REFRESH TOKEN FROM COOKIE
    //   // const response = await axios.post(/auth/logout, {
    //   //     headers: { Authorization: `Bearer ${token}` },
    //   //     withCredentials: true
    //   //   })
    //   // console.log(response.data.message) // cookie cleared
    //   navigate('/auth')
    // } catch (error) {
    //   console.error(`AN ERROR OCCURED: ${error}`)
    // }
  }

  return(
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