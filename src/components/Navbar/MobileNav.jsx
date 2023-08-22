import Menu from './Menu'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { BsBookmark, BsHouse } from 'react-icons/bs'
import { CgLogOut, CgLogIn  } from 'react-icons/cg'

const MobileNav = ({user, handleLogout}) => {
  return (
    <div className='lg:hidden'>
      <div className='fixed w-full p-4 bg-white z-20 shadow-sm flex justify-center'>
        <Link
          to={'/feed'} 
          className='text-lg md:text-2xl text-[#38D6C4] font-normal uppercase'
        >
          logooo
        </Link>
      </div>
      <div className='fixed w-full p-4 bg-white z-20 bottom-0 border'>
        <div className='flex justify-between'>
          <Menu route={'/feed'} icon={<BsHouse />} />
          <Menu route={'/bookmarks'} icon={<BsBookmark />} />
          <Menu route={'/create'} icon={<MdOutlineAddBox />} />
          <Menu route={'/profile/:id'} icon={<AiOutlineUser />} />
          {!user 
            ? (<Menu route={'/auth'} icon={<CgLogIn />} />)
            : (<Menu onClick={handleLogout} icon={<CgLogOut />} />) 
          }
        </div>
      </div>
    </div>
  )
}

export default MobileNav  