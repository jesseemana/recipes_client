import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setLogout } from '../../state/appSlice'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { BsBookmark } from 'react-icons/bs'
import { BiLogOut, BiLogIn, } from 'react-icons/bi'
import MenuItem from './MenuItem'
import axios from '../../api/axios'

const LOGOUT_URL = '/auth/logout'

const Navibar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  // const user = useSelector(state => state.user)
  const user = true

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

  return(
    <div className='p-3 w-full px-[4%] bg-white shadow-sm fixed z-10 flex justify-between items-center'>
      <Link 
        to={'/feed'} 
        className='text-lg md:text-2xl text-[#38D6C4] font-bold uppercase'
      >
        foodiesss.
      </Link>
      <div className='relative border px-1 rounded-full'>
        <div 
          onClick={() => setIsOpen((prev ) => !prev)} 
          className='cursor-pointer flex items-center gap-1'
        >
          <AiOutlineMenu />
          <img src='/avatar.jpg' alt='user profile avatar' className='w-8 h-8 rounded-full'/>
        </div>
        {isOpen && (
          <div className='absolute bg-white rounded-md shadow-md md:w-[170px] w-[138px] overflow-hidden top-12 right-0 text-sm'>
            <div className='flex flex-col cursor-pointer capitalize'>
              {user ? (
                <>
                  <MenuItem
                    onClick={() => {}}
                    label='profile'
                    icon={<AiOutlineUser />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label='add recipe'
                    icon={<MdOutlineAddBox />}
                  />
                  <MenuItem 
                    onClick={() => {}}
                    label='bookmarks'
                    icon={<BsBookmark />}
                  />
                  <hr />
                  <MenuItem 
                    onClick={() => {}}
                    label='logout'
                    icon={<BiLogOut />}
                  />
                </>
                ) : ( 
                <MenuItem 
                  onClick={() => {}}
                  label='login / signup'
                  icon={<BiLogIn />}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  ) 
}

export default Navibar  