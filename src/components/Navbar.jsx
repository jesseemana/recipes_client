import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setLogout } from '../state/appSlice'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import {MdOutlineAddBox} from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { BsBookmark } from 'react-icons/bs'
import { BiLogOut, BiLogIn, } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import axios from "../api/axios"
const LOGOUT_URL = '/auth/logout'


const Navibar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const user = useSelector(state => state.user)

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
      console.error(`AN ERROR OCCURED: ${error}`)
    }
  }


  let content
  if(!user) content = (
    <div className="p-3 max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between">
      <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
      <Menu>
        <MenuButton colorScheme='pink'>
          <div className='rounded-full border p-1 bg-gray-200'>
            <AiOutlineUser className='text-2xl text-gray-400' />
          </div>
        </MenuButton>
        <MenuList>
          <MenuItem as='a' href='/auth'>
            <div className='flex items-center gap-x-3 text-lg text-gray-600'>
              <BiLogIn className='text-2xl text-[#38D6C4]'/>
              <p>Login</p>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  ) 
  else content = (
    <>
      <div className="p-3 max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between">
        <Link to={'/feed'}>
          <h1 className="text-lg md:text-2xl text-[#38D6C4] font-bold uppercase">foodiesss.</h1>
        </Link>
        <div className='flex gap-x-4 items-center'>
          <Menu>
            <MenuButton colorScheme='pink'>
              <div className='rounded-full border p-1 bg-gray-200'>
                <AiOutlineUser className='text-2xl text-gray-400' />
              </div>
            </MenuButton>
            <MenuList className='capitalize'>
              <MenuItem as='a' href={`/profile/${user._id}`}>
                <div className='flex items-center gap-x-2 text-lg text-gray-600'>
                  <CgProfile className='text-2xl text-gray-400'/>
                  <p>profile</p>
                </div>
              </MenuItem>
              <MenuDivider />
              <MenuItem as='a' href='/bookmarks'>
                <div className='flex items-center gap-x-2 text-lg text-gray-600'>
                  <BsBookmark className='text-2xl text-gray-400'/>
                  <p>bookmarks</p>
                </div>
              </MenuItem>
              <MenuDivider />
              <MenuItem as='a' href='/newrecipe'>
                <div className='flex items-center gap-x-2 text-lg text-gray-600'>
                  <MdOutlineAddBox className='text-2xl text-gray-400'/>
                  <p>add recipe</p>
                </div>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <button 
                  className='flex items-center gap-x-2 text-lg text-gray-600' 
                  // onClick={alert('Button clicked')}
                >
                  <BiLogOut className='text-2xl text-gray-400'/>
                  <p>Logout</p>
                </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  )

  return content
}

export default Navibar  