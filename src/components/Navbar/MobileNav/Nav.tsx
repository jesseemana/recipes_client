import NavItem from './NavItem'
import { useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { CgLogOut, CgLogIn  } from 'react-icons/cg'
import { BsBookmark, BsHouse } from 'react-icons/bs'

const Nav = ({ user, handleLogout }: NavProps) => {
  const navigate = useNavigate()

  return (
    <div className='lg:hidden'>
      <div className='fixed w-full p-3 bg-white z-20 shadow-sm flex justify-center'>
        <h1 className='text-lg md:text-2xl text-[#38D6C4] font-normal uppercase'>
          logooo
        </h1>
      </div>
      <div className='fixed w-full p-3 bg-white z-20 bottom-0 border'>
        <div className='flex justify-between -mb-4 px-1 md:px-4'>
          {menuitems.map((item, index) => (
            <NavItem 
              key={index} 
              icon={item.icon} 
              label={item.label}
              onClick={() => navigate(item.route)}
            />
          ))}
          {user ? (
            <NavItem 
              label='logout' 
              icon={<CgLogOut />} 
              onClick={handleLogout} 
            />
            ):(
            <NavItem 
              label='login' 
              icon={<CgLogIn />} 
              onClick={() => navigate('/auth/ogin')} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav 

export const menuitems = [
  {
    route: '/feed',
    label: 'home',
    icon: <BsHouse />
  },
  {
    route: '/bookmarks',
    label: 'bookmarks',
    icon: <BsBookmark />
  },
  {
    route: '/create',
    label: 'create',
    icon: <MdOutlineAddBox />
  },
  {
    route: '/profile/:id',
    label: 'my recipes',
    icon: <AiOutlineUser />
  },
]   