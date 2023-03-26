import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogout } from "../state/appSlice"

import axios from "../api/axios"
const LOGOUT_URL = '/auth/logout'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.user)
  
  const handleLogout = async () => {
    dispatch(setLogout())
    await axios.post(LOGOUT_URL)
    navigate('/')
  }
  
 
  if(!user) {
    return (
      <div className="p-3 bg-white shadow-sm flex justify-between">
        <h1 className="text-2xl font-bold capitalize">foodiesss.</h1>
      </div>
    )
  }

  return (
    <div className="p-3 bg-white shadow-sm flex justify-between">
        <h1 className="text-2xl font-bold capitalize">foodiesss.</h1>
        <button
          className="font-semibold capitalize"
          onClick={handleLogout}
        >
          log out
        </button>
    </div>
  )
}

export default Navbar