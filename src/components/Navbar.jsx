import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setLogout } from '../state/appSlice'
import './Nav.css'
import DropdownItem from './Dropdown'

import { BiLogOut, BiLogIn, } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import axios from "../api/axios"
const LOGOUT_URL = '/auth/logout'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const user = useSelector(state => state.user)

  const [open, setOpen] = useState(false)

  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if(!menuRef.current.contains(e.target)){
        setOpen(false)
        console.log(menuRef.current)
      }      
    }

    document.addEventListener("mousedown", handler)
    

    return () => {
      document.removeEventListener("mousedown", handler)
    }

  })

  const handleLogout = async () => {
    try {
      // CLEARS REFRESH TOKEN FROM COOKIE
      // const response = await axios.post(LOGOUT_URL, {
      //     headers: { Authorization: `Bearer ${token}` },
      //     withCredentials: true
      //   })
      // console.log(response.data.message) // cookie cleared
      dispatch(setLogout())
      navigate('/auth')
    } catch (error) {
      console.log(`AN ERROR OCCURED: ${error}`)
    }
  }

  const handleLogin = () => {
    navigate('/auth')
  }


  let content
  if(!user) content = (
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <FaUser />
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>The Kiet<br/><span>Website Designer</span></h3>
          <ul>
            <DropdownItem img={BiLogIn} text = {"Login"}/>
            <DropdownItem img={BiLogOut} text = {"Logout"}/>
          </ul>
        </div>
      </div>
  )
  else content = (
    <>
      <div className="p-3 max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between">
        <Link to={'/feed'}>
          <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
        </Link>
        <div className='flex gap-x-4 items-center'>
          <Link to={'/bookmarks'}>
            <h1>saved</h1>
          </Link>
          <button onClick={handleLogout}>
            <BiLogOut className='text-3xl text-[#38D6C4]' />
          </button>
        </div>
      </div>
    </>
  )

  return content
}

export default Navbar

{/* <div className="max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10">
  <div className="py-4 flex justify-between items-center">
    <Link to={'/feed'}>
      <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
    </Link>
    <div className="flex gap-x-4">
      <Link to={`/newrecipe`} className="capitalize">
        <MdOutlineAddBox className="text-2xl text-[#38D6C4]" />
      </Link>
      <Link to={`${'/profile/'}${user._id}`} className="capitalize">
        <FiUser className="text-2xl text-[#38D6C4]" />
      </Link>
      <button onClick={handleLogout}>
        <FiLogOut className="text-2xl text-[#38D6C4]" />
      </button>
    </div>
  </div>
</div> */}