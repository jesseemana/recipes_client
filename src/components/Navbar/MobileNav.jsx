import Menu from './Menu'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { BsBookmark, BsHouse } from 'react-icons/bs'
import { CgLogOut, CgLogIn  } from 'react-icons/cg'

const MobileNav = ({user, handleLogout}) => {
  return (
    <div className='lg:hidden'>
      <div className='fixed w-full p-4 bg-white shadow-sm'>
        <h1 className='text-md md:text-2xl text-[#38D6C4] text-center font-normal uppercase'>logooo</h1>
      </div>
      <div className='fixed bottom-0 w-full bg-white p-4 border'>
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