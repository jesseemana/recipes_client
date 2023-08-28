import Menu from './Menu'
import { useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { CgLogOut, CgLogIn  } from 'react-icons/cg'
import { BsBookmark, BsHouse } from 'react-icons/bs'

const MobileNav = ({user, handleLogout}: NavProps) => {
  const navigate = useNavigate()

  return (
    <div className='lg:hidden'>
      <div className='fixed w-full p-4 bg-white z-20 shadow-sm flex justify-center'>
        <div
          onClick={() => navigate('/feed')}
          className='text-lg md:text-2xl text-[#38D6C4] font-normal uppercase'
        >
          logooo
        </div>
      </div>
      <div className='fixed w-full p-4 bg-white z-20 bottom-0 border'>
        <div className='flex justify-between'>
          {menuitems.map((item, index) => (
            <Menu 
              key={index} 
              icon={item.icon} 
              onClick={() => navigate(item.route)}
            />
          ))}
          {user 
            ? (<Menu onClick={handleLogout} icon={<CgLogOut />} />)
            : (<Menu onClick={() => navigate('/auth')} icon={<CgLogIn />} />)
          }
        </div>
      </div>
    </div>
  )
}

export default MobileNav  

export const menuitems = [
  {
    route: '/feed',
    icon: <BsHouse />
  },
  {
    route: '/bookmarks',
    icon: <BsBookmark />
  },
  {
    route: '/create',
    icon: <MdOutlineAddBox />
  },
  {
    route: '/profile/:id',
    icon: <AiOutlineUser />
  },
] 