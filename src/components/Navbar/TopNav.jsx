import MenuItem from './MenuItem'
import { useState, useRef, useEffect } from 'react'
import { Link}from 'react-router-dom'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { BsBookmark } from 'react-icons/bs'
import { BiLogOut, BiLogIn, } from 'react-icons/bi'

const TopNav = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  })

  return (
    <nav className='hidden p-3 w-full px-[4%] bg-white shadow-sm fixed z-10 lg:flex justify-between items-center'>
      <Link 
        to={'/feed'} 
        className='text-lg md:text-xl text-[#38D6C4] font-normal uppercase'
      >
        logoooo.
      </Link>
      <div ref={menuRef} className='relative border rounded-full'>
        <div 
          onClick={() => setIsOpen((prev ) => !prev)} 
          className='cursor-pointer flex items-center gap-1 pr-1'
        >
          <img 
            src='/avatar.jpg' 
            alt='user menu placeholder avatar' 
            className='w-8 h-8 rounded-full'
          />
          <AiOutlineMenu />
        </div>
        {isOpen && (
          <div className='absolute bg-white rounded-md shadow-md md:w-[170px] w-[138px] top-12 right-0 text-sm'>
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
                    onClick={handleLogout}
                    label='logout'
                    icon={<BiLogOut />}
                  />
                </>
                ) : ( 
                <MenuItem 
                  onClick={() => navigate('/auth')}
                  label='login'
                  icon={<BiLogIn />}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  ) 
}

export default TopNav 