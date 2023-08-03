import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setLogout } from '../state/appSlice'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { BsBookmark } from 'react-icons/bs'
import { BiLogOut, BiLogIn, } from 'react-icons/bi'

import axios from '../api/axios'
const LOGOUT_URL = '/auth/logout'


const Navibar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  
  // const user = useSelector(state => state.user)
  const user = false

  function toggleOpen() {
    setOpen((prev )=> !prev)
    console.log(open)
  }

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
  
  if (!user) {
    content = (
      <div className='p-3 w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between items-center'>
        <h1 className='text-lg md:text-2xl text-[#38D6C4] font-bold uppercase'>foodiesss.</h1>
        <div className='relative border px-1 rounded-full'>
          <div 
            onClick={() => setOpen((prev ) => !prev)} 
            className='cursor-pointer flex items-center gap-1'
          >
            <AiOutlineMenu />
            <img src='/avatar.jpg' alt='user profile avatar' className='w-8 h-8 rounded-full'/>
          </div>
          <div className='absolute bg-white rounded-md shadow-md w-[170px] overflow-hidden top-12 right-0 text-sm'>
            <div className='flex flex-col cursor-pointer'>
              <div 
                onClick={() => {}} 
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                <p>user</p>
              </div>
              <div 
                onClick={() => {}} 
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                <p>bookmarks</p>
              </div>
              <div 
                onClick={() => {}} 
                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
              >
                <p>recipes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) 
  }

  else content = (
    <>
      <div className='p-3 max-w-full px-[4%] bg-white border border-l-0 border-r-0 border-t-0 border-gray-300 sticky top-0 left-0 right-0 z-10 flex justify-between'>
        <Link to={'/feed'}>
          <h1 className='text-lg md:text-2xl text-[#38D6C4] font-bold uppercase'>foodiesss.</h1>
        </Link>
        <div className='flex gap-x-1 items-center'>
          <Menu>
            <MenuButton>
              <div className='flex gap-x-1 items-center border border-gray-400 px-2 rounded-full'>
                <span className='text-lg font-medium text-gray-500 pr-2'>{user.firstName}</span>
                <div className='rounded-full border p-1 bg-gray-200 mr-[-6px]'>
                  <AiOutlineUser className='text-2xl text-gray-400' />
                </div>
              </div>
            </MenuButton>
            <MenuList>
              <Link to={`/profile/${user._id}`}>
                <MenuItem>
                  <div className='flex items-center gap-x-2 text-lg capitalize'>
                    <CgProfile className='text-2xl text-gray-700'/>
                    <p className='text-gray-700'>profile</p>
                  </div>
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link to={'/newrecipe'}>
                <MenuItem>
                  <div className='flex items-center gap-x-2 text-lg capitalize'>
                    <MdOutlineAddBox className='text-2xl text-gray-700'/>
                    <p className='text-gray-700'>add recipe</p>
                  </div>
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link to={'/bookmarks'}>
                <MenuItem>
                  <div className='flex items-center gap-x-2 text-lg capitalize'>
                    <BsBookmark className='text-2xl text-gray-700'/>
                    <p className='text-gray-700'>bookmarks</p>
                  </div>
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
          <button onClick={handleLogout}>
            <BiLogOut className='text-3xl text-gray-500'/>
          </button>
        </div>
      </div>
    </>
  )

  return content
}

export default Navibar  