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
    navigate('/auth')
  }
  
 
  if(!user) {
    return (
      <div className="p-3 max-w-full px-[8%]  bg-white shadow-sm flex justify-between">
        <h1 className="text-2xl text-blue-600 font-bold capitalize">foodiesss.</h1>
      </div>
    )
  }

  return (
    <div className="max-w-full px-[8%] bg-white shadow-sm ">
      <div className="py-4 flex justify-between">
        <h1 className="text-2xl text-blue-600 font-bold capitalize">foodiesss.</h1>
        <button
          onClick={handleLogout}
          className="font-semibold capitalize text-md text-white bg-blue-600 rounded-full px-4"
        >
          log out
        </button>
      </div>
    </div>
  )
}

export default Navbar