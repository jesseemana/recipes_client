import MenuItem from './MenuItem'
import { Link}from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { BsBookmark } from 'react-icons/bs'
import { MdOutlineAddBox } from 'react-icons/md'
import { BiLogOut, BiLogIn, } from 'react-icons/bi'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'

const MainNav = ({user, handleLogout}) => {
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
    <nav className='hidden lg:flex fixed p-3 w-full px-[3%] bg-white shadow-sm z-10 justify-between items-center'>
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
                    route={'/profile/:id'}
                    label='my recipes'
                    // icon={<AiOutlineUser />}
                  />
                  <MenuItem
                    route={'/create'}
                    label='add recipe'
                    // icon={<MdOutlineAddBox />}
                  />
                  <MenuItem
                    route={'/bookmarks'}
                    label='bookmarks'
                    // icon={<BsBookmark />}
                  />
                  <hr />
                  <MenuItem
                    onClick={handleLogout}
                    label='logout'
                    icon={<BiLogOut />}
                  />
                </>
                ):(
                <MenuItem
                  route={'/auth'}
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

export default MainNav 