import Menu from './Menu'
import Content from '../Content'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { MdOutlineAddBox } from 'react-icons/md'
import { BiLogOut, BiLogIn, } from 'react-icons/bi'

const BottomNav = ({ user, handleLogout }) => {
  return (
    <Content>
      <div className='lg:hidden'>
        <div className='p-4 fixed top-0 left-0 right-0 bg-white shadow-sm'>
          <h1 className='text-md md:text-2xl text-[#38D6C4] text-center font-normal uppercase'>logooo</h1>
        </div>
        <div className='fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border'>
          <div className='flex justify-between'>
            <Menu route={'/feed'} icon={<AiFillHome />} />
            <Menu route={'/bookmarks'} icon={<BsBookmark />} />
            <Menu route={'/addrecipe'} icon={<MdOutlineAddBox />} />
            <Menu route={'/profile/:id'} icon={<AiOutlineUser />} />
            {!user 
              ? (<Menu route={'/auth'} icon={<BiLogIn />} />)
              : (<Menu onClick={handleLogout} icon={<BiLogOut />} />) 
            }
          </div>
        </div>
      </div>
    </Content>
  )
}

export default BottomNav  