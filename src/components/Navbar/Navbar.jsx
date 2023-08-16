import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import TopNav from './TopNav'

const Navbar = () => {
  const { auth } = useAuth()  
  const navigate = useNavigate()
  const user = auth?.user
  const token = auth?.access_token

  function handleLogout() {
    try {
      // CLEARS REFRESH TOKEN FROM COOKIE
      // const response = await axios.post(/auth/logout, {
      //     headers: { Authorization: `Bearer ${token}` },
      //     withCredentials: true
      //   })
      // console.log(response.data.message) // cookie cleared
      navigate('/auth')
    } catch (error) {
      console.error(`AN ERROR OCCURED: ${error}`)
    }
  }

  return(
    <>
      <TopNav user={user} handleLogout={handleLogout} />
    </>
  )
}

export default Navbar  