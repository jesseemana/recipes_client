import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
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

  // console.log(user)
  
  let content
  if(!user) content = <>
      <div className="p-3 max-w-full px-[8%]  bg-white shadow-sm flex justify-between">
        <h1 className="text-2xl text-blue-600 font-bold capitalize">foodiesss.</h1>
      </div>
    </>
  else content = <>
    <div className="max-w-full px-[8%] bg-white shadow-sm ">
      <div className="py-4 flex justify-between">
        <Link to={'/home'}>
          <h1 className="text-2xl text-blue-600 font-bold capitalize">foodiesss.</h1>
        </Link>
        <div className="flex gap-x-1">
          <Link to={`${'/user/'}${user._id}`} className="capitalize">
            profile
          </Link>
          <Link to={`newrecipe`} className="capitalize">
            add recipe
          </Link>
          <button
            onClick={handleLogout}
            className="font-semibold capitalize text-md text-white bg-blue-600 rounded-full px-4"
          >
            log out
          </button>
        </div>
      </div>
    </div>
  </>

  
  return content
}

export default Navbar