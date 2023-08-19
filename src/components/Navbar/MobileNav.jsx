import Menu from './Menu'
import Content from '../Content'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineAddBox } from 'react-icons/md'
import { BsBookmark, BsHouse } from 'react-icons/bs'
import { CgLogOut, CgLogIn  } from 'react-icons/cg'

const MobileNav = ({user, handleLogout}) => {
  return (
    <Content>
      <nav className='lg:hidden'>
        <div className='fixed left-0 right-0 top-0 bg-white p-4 shadow-sm'>
          <h1 className='text-md md:text-2xl text-[#38D6C4] text-center font-normal uppercase'>logooo</h1>
        </div>
        <div className='fixed left-0 right-0 bottom-0 bg-white p-4 border'>
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
      </nav>
    </Content>
  )
}

export default MobileNav  